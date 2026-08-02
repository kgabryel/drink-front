/**
 * eslint-plugin-vue-setup-order
 *
 * Wymusza kolejność i komentarze w <script setup> i composables.
 *
 * DLA PLIKÓW .vue:
 *   // interfaces
 *   // composables
 *   // setup
 *   // state
 *   // computed
 *   // watch
 *   // lifecycle
 *   // actions
 *
 * DLA PLIKÓW .ts (composables):
 *   interfaces przed funkcją
 *   wewnątrz funkcji: // interfaces → // setup → // state → // composables → // computed → // watch → // lifecycle → // actions
 */

const VUE_GROUP_ORDER = ['interfaces', 'setup', 'state', 'composables', 'computed', 'watch', 'lifecycle', 'actions'];
const TS_GROUP_ORDER = ['setup', 'state', 'composables', 'computed', 'watch', 'lifecycle', 'actions'];

// Grupy które nie wymagają komentarza (interfaces są poza funkcją w .ts, composables mogą być bez)
const GROUPS_REQUIRING_COMMENT = new Set([
  'interfaces',
  'composables',
  'setup',
  'state',
  'computed',
  'watch',
  'lifecycle',
  'actions',
]);

const GROUPS_REQUIRING_INNER_BLANK_LINE = new Set(['actions', 'computed']);

const LIFECYCLE_HOOKS = [
  'onMounted',
  'onUnmounted',
  'onBeforeMount',
  'onBeforeUnmount',
  'onUpdated',
  'onBeforeUpdate',
  'onActivated',
  'onDeactivated',
  'onErrorCaptured',
  'onRenderTracked',
  'onRenderTriggered',
];

const WATCH_CALLS = ['watch', 'watchEffect', 'watchPostEffect', 'watchSyncEffect'];

const INTERFACE_SUBORDER = ['State', 'Props', 'Emits'];
const SETUP_SUBORDER = ['defineProps', 'withDefaults', 'defineEmits', 'use', 'const'];
const STATE_SUBORDER = ['reactive', 'ref'];
const DEFINE_SUBS = new Set(['defineProps', 'withDefaults', 'defineEmits']);

function getCallName(init) {
  if (!init || init.type !== 'CallExpression') return null;
  if (init.callee.type === 'Identifier') return init.callee.name;
  return null;
}

function getInterfaceSub(name) {
  if (INTERFACE_SUBORDER.includes(name)) return name;
  return name;
}

function isDefineSub(sub) {
  return DEFINE_SUBS.has(sub);
}

function isComposableDestructure(node) {
  if (node.type !== 'VariableDeclaration') return false;
  const decl = node.declarations[0];
  if (!decl) return false;
  if (decl.id.type !== 'ObjectPattern') return false;
  const callName = getCallName(decl.init);
  return callName && callName.startsWith('use');
}

function getGroup(node, isVue) {
  if (node.type === 'TSInterfaceDeclaration' || node.type === 'TSTypeAliasDeclaration') {
    return { group: 'interfaces', sub: getInterfaceSub(node.id?.name) };
  }

  if (node.type === 'ExpressionStatement') {
    const expr = node.expression;
    if (expr && expr.type === 'CallExpression' && expr.callee.type === 'Identifier') {
      const name = expr.callee.name;

      if (WATCH_CALLS.includes(name)) return { group: 'watch', sub: name };
      if (LIFECYCLE_HOOKS.includes(name)) return { group: 'lifecycle', sub: name };

      if (name === 'defineProps') return { group: 'setup', sub: 'defineProps' };
      if (name === 'defineEmits') return { group: 'setup', sub: 'defineEmits' };
    }
    return null;
  }

  if (node.type === 'FunctionDeclaration') {
    return { group: 'actions', sub: 'function' };
  }

  if (node.type !== 'VariableDeclaration') return null;

  const decl = node.declarations[0];
  if (!decl) return null;
  const init = decl.init;
  if (!init) return { group: 'setup', sub: 'const' };

  const callName = getCallName(init);

  if (isVue && isComposableDestructure({ type: 'VariableDeclaration', declarations: [decl] })) {
    return { group: 'composables', sub: 'composable' };
  }

  if (
    callName === 'withDefaults' ||
    (init.type === 'CallExpression' &&
      init.arguments?.[0]?.type === 'CallExpression' &&
      init.arguments[0].callee?.name === 'defineProps')
  ) {
    return { group: 'setup', sub: 'defineProps' };
  }
  if (callName === 'defineProps') return { group: 'setup', sub: 'defineProps' };
  if (callName === 'defineEmits') return { group: 'setup', sub: 'defineEmits' };
  if (callName === 'computed') return { group: 'computed', sub: 'computed' };

  if (callName && ['reactive', 'shallowReactive'].includes(callName)) {
    return { group: 'state', sub: 'reactive' };
  }
  if (callName && ['ref', 'shallowRef'].includes(callName)) {
    return { group: 'state', sub: 'ref' };
  }
  if (init.type === 'ArrowFunctionExpression') {
    return { group: 'actions', sub: 'arrow' };
  }
  if (callName && callName.startsWith('use')) {
    if (isVue) {
      return { group: 'setup', sub: 'use' };
    }
    // w .ts composable tylko gdy destrukturyzacja: const { x } = useX()
    if (decl.id.type === 'ObjectPattern') {
      return { group: 'composables', sub: 'use' };
    }
    return { group: 'setup', sub: 'use' };
  }

  return { group: 'setup', sub: 'const' };
}

function getSubIndex(group, sub) {
  if (group === 'interfaces') {
    const idx = INTERFACE_SUBORDER.indexOf(sub);
    return idx === -1 ? -1 : idx; // nieznane = przed wszystkimi
  }
  if (group === 'setup') {
    const idx = SETUP_SUBORDER.indexOf(sub);
    return idx === -1 ? SETUP_SUBORDER.length : idx;
  }
  if (group === 'state') {
    const idx = STATE_SUBORDER.indexOf(sub);
    return idx === -1 ? STATE_SUBORDER.length : idx;
  }
  return 0;
}

/**
 * Pobiera komentarze które są bezpośrednio przed danym nodem (na linii tuż przed nim).
 */
function getCommentsBefore(node, sourceCode) {
  return sourceCode.getCommentsBefore(node);
}

/**
 * Sprawdza czy przed nodem jest komentarz "// groupName"
 */
function hasGroupComment(node, groupName, sourceCode) {
  const comments = sourceCode.getCommentsBefore(node);
  const nodeStartLine = node.loc.start.line;

  return comments.some((c) => {
    const isCorrectText = c.type === 'Line' && c.value.trim() === groupName;
    const isDirectlyAbove = c.loc.end.line === nodeStartLine - 1;

    return isCorrectText && isDirectlyAbove;
  });
}

function checkOrder(nodes, groupOrder, context, isVue, sourceCode) {
  let lastGroup = null;
  let lastSub = null;
  let lastNode = null;

  for (const node of nodes) {
    const result = getGroup(node, isVue);
    if (!result) continue;

    const { group, sub } = result;
    const groupIndex = groupOrder.indexOf(group);
    const lastGroupIndex = lastGroup ? groupOrder.indexOf(lastGroup) : -1;

    // Sprawdź kolejność grup
    if (groupIndex !== -1 && lastGroupIndex !== -1 && groupIndex < lastGroupIndex) {
      context.report({
        node,
        messageId: 'wrongOrder',
        data: { current: group, previous: lastGroup },
      });
    }

    // Sprawdź kolejność wewnątrz tej samej grupy
    if (group === lastGroup && lastSub !== null) {
      const subIndex = getSubIndex(group, sub);
      const lastSubIndex = getSubIndex(group, lastSub);
      if (subIndex < lastSubIndex) {
        context.report({
          node,
          messageId: 'wrongSubOrder',
          data: { group, current: sub, previous: lastSub },
        });
      }
    }

    // Sprawdź pustą linię między elementami tej samej grupy
    if (lastNode && group === lastGroup && GROUPS_REQUIRING_INNER_BLANK_LINE.has(group)) {
      const currentLine = node.loc.start.line;
      const lastLine = lastNode.loc.end.line;
      if (currentLine - lastLine < 2) {
        context.report({
          node,
          messageId: 'missingBlankLineInGroup',
          data: { group },
        });
      }
    }

    // Sprawdź pustą linię między różnymi grupami
    if (lastNode && lastGroup && group !== lastGroup) {
      const currentLine = node.loc.start.line;
      const lastLine = lastNode.loc.end.line;
      if (currentLine - lastLine < 2) {
        context.report({
          node,
          messageId: 'missingBlankLine',
          data: { prev: lastGroup, next: group },
        });
      }
    }

    // Sprawdź pustą linię po defineProps/defineEmits
    if (group === 'setup' && lastGroup === 'setup' && lastSub !== null && isDefineSub(lastSub) && !isDefineSub(sub)) {
      const currentLine = node.loc.start.line;
      const lastLine = lastNode.loc.end.line;
      if (currentLine - lastLine < 2) {
        context.report({ node, messageId: 'missingBlankLineAfterDefine' });
      }
    }

    // Sprawdź komentarz przed pierwszym elementem grupy
    if (group !== lastGroup && GROUPS_REQUIRING_COMMENT.has(group)) {
      if (!hasGroupComment(node, group, sourceCode)) {
        context.report({
          node,
          messageId: 'missingGroupComment',
          data: { group },
        });
      }
    }

    if (group === 'actions' && sub === 'arrow') {
      context.report({
        node,
        messageId: 'noArrowInActions',
      });
    }

    lastGroup = group;
    lastSub = sub;
    lastNode = node;
  }
}

module.exports = {
  rules: {
    'script-setup-order': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Wymusza kolejność i komentarze: composables → setup → state → computed → watch → lifecycle → actions',
        },
        schema: [],
        messages: {
          wrongOrder: '"{{current}}" powinno być przed "{{previous}}"',
          wrongSubOrder: 'W grupie "{{group}}": "{{current}}" powinno być przed "{{previous}}"',
          missingBlankLine: 'Wymagana pusta linia między grupą "{{prev}}" a grupą "{{next}}"',
          missingBlankLineAfterDefine: 'Wymagana pusta linia po defineProps/defineEmits przed resztą setup',
          interfaceAfterFunction: 'Interface/type powinien być zadeklarowany przed funkcją composable',
          missingGroupComment: 'Brakuje komentarza "// {{group}}" przed grupą',
          noArrowInActions: 'W grupie "actions" nie są dozwolone arrow functions, użyj standardowej funkcji',
          missingBlankLineInGroup: 'Wymagana pusta linia między elementami w grupie "{{group}}"',
        },
      },
      create(context) {
        const filename = context.filename ?? context.getFilename?.() ?? '';
        const isVue = filename.endsWith('.vue');
        const isTs = filename.endsWith('.ts');

        if (!isVue && !isTs) return {};

        const sourceCode = context.getSourceCode?.() ?? context.sourceCode;

        return {
          Program(program) {
            if (isVue) {
              checkOrder(program.body, VUE_GROUP_ORDER, context, true, sourceCode);
            } else if (isTs) {
              let functionSeen = false;

              for (const node of program.body) {
                const isInterface = node.type === 'TSInterfaceDeclaration' || node.type === 'TSTypeAliasDeclaration';

                const innerNode = node.type === 'ExportNamedDeclaration' ? node.declaration : node;

                const isFunctionExport =
                  innerNode &&
                  (innerNode.type === 'FunctionDeclaration' ||
                    (innerNode.type === 'VariableDeclaration' &&
                      innerNode.declarations[0]?.init?.type === 'ArrowFunctionExpression'));

                if (isFunctionExport) functionSeen = true;

                if (isInterface && functionSeen) {
                  context.report({ node, messageId: 'interfaceAfterFunction' });
                }

                if (isFunctionExport) {
                  const funcNode =
                    innerNode.type === 'FunctionDeclaration' ? innerNode : innerNode.declarations[0].init;

                  const body = funcNode.body?.body ?? [];
                  checkOrder(body, TS_GROUP_ORDER, context, false, sourceCode);
                }
              }
            }
          },
        };
      },
    },
  },
};
