import { vueOrderConfig as baseConfig } from '@kgabryel-dev/code-quality/eslint/plugins/vue-order/example.config';
import { and, isFile, isInDirectory, isTsFile, not } from '@kgabryel-dev/code-quality/eslint/plugins/vue-order/helpers';
import { BlankLine } from '@kgabryel-dev/code-quality/eslint/plugins/vue-order/types/blank-line';
import { NodeType } from '@kgabryel-dev/code-quality/eslint/plugins/vue-order/types/node-types';

const serviceObjectRecognizer = {
  priority: 50,
  test: (node) =>
    node.type === 'ExportNamedDeclaration' && node.declaration.declarations[0]?.init?.type === 'ObjectExpression',
  type: 'ServiceObject',
};

const storeRecognizer = {
  priority: 50,
  test: (node, programConfig) => {
    const { storeFactory } = programConfig.getParams();
    const inner = node.type === 'ExportNamedDeclaration' ? node.declaration : node;

    if (inner?.type !== 'VariableDeclaration') {
      return false;
    }

    const init = inner.declarations[0]?.init;

    return init?.type === 'CallExpression' && init.callee?.name === storeFactory;
  },
  type: 'StoreDefinition',
};

function getStoreBody(node) {
  const inner = node.type === 'ExportNamedDeclaration' ? node.declaration : node;
  const setup = inner?.declarations?.[0]?.init?.arguments?.[1];

  if (setup?.type === 'ArrowFunctionExpression' || setup?.type === 'FunctionExpression') {
    return setup.body.type === 'BlockStatement' ? setup.body.body : [];
  }

  return [];
}

const utils = {
  groups: [
    {
      blankLine: BlankLine.NO,
      comment: null,
      name: 'import',
      types: [{ blankLine: BlankLine.NO, type: NodeType.Import }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'interfaces',
      types: [{ blankLine: BlankLine.ALL, type: NodeType.Interface }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'arrowFunctions',
      types: [{ blankLine: BlankLine.ALL, type: NodeType.ArrowFunction }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'functions',
      types: [{ blankLine: BlankLine.ALL, type: NodeType.Function }],
    },
  ],
  identifier: 'utils',
  recognizeFile: and(isTsFile, isInDirectory('utils')),
  registeredRecognizers: [
    NodeType.Import,
    NodeType.Interface,
    NodeType.Const,
    NodeType.Function,
    NodeType.ArrowFunction,
  ],
};

const services = {
  groups: [
    {
      blankLine: BlankLine.NO,
      comment: null,
      name: 'import',
      types: [{ blankLine: BlankLine.NO, type: NodeType.Import }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'consts',
      types: [{ blankLine: BlankLine.ONCE, type: NodeType.Const }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'interfaces',
      types: [{ blankLine: BlankLine.ALL, type: NodeType.Interface }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'service',
      types: [{ blankLine: BlankLine.NO, type: 'ServiceObject' }],
    },
  ],
  identifier: 'services',
  recognizeFile: and(isTsFile, isInDirectory('services'), not(isFile('axios.interceptor.ts'))),
  registeredRecognizers: [NodeType.Import, NodeType.Interface, NodeType.Const, 'ServiceObject'],
};

const stores = {
  groups: [
    {
      blankLine: BlankLine.NO,
      comment: null,
      name: 'import',
      types: [{ blankLine: BlankLine.NO, type: NodeType.Import }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'consts',
      types: [{ blankLine: BlankLine.ONCE, type: NodeType.Const }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'helpers',
      types: [{ blankLine: BlankLine.ONCE, type: NodeType.Function }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'store',
      types: [{ blankLine: BlankLine.NO, type: 'StoreDefinition' }],
    },
    {
      blankLine: BlankLine.YES,
      comment: null,
      name: 'storeType',
      types: [{ blankLine: BlankLine.NO, type: NodeType.TypeAlias }],
    },
  ],
  identifier: 'stores',
  recognizeFile: and(isTsFile, isInDirectory('store')),
  registeredRecognizers: [
    NodeType.Import,
    'StoreDefinition',
    NodeType.TypeAlias,
    NodeType.Ref,
    NodeType.Reactive,
    NodeType.Computed,
    NodeType.Function,
    NodeType.ArrowFunction,
    NodeType.ComposableInstance,
    NodeType.Const,
  ],
  subGroups: {
    storeBody: {
      groups: [
        {
          blankLine: BlankLine.YES,
          comment: 'setup',
          name: 'setup',
          types: [{ blankLine: BlankLine.NO, type: NodeType.ComposableInstance }],
        },
        {
          blankLine: BlankLine.YES,
          comment: 'state',
          name: 'state',
          types: [
            { blankLine: BlankLine.NO, type: NodeType.Ref },
            { blankLine: BlankLine.NO, type: NodeType.Reactive },
          ],
        },
        {
          blankLine: BlankLine.YES,
          comment: 'getters',
          name: 'getters',
          types: [{ blankLine: BlankLine.ALL, type: NodeType.Computed }],
        },
        {
          blankLine: BlankLine.YES,
          comment: 'actions',
          name: 'actions',
          types: [
            { blankLine: BlankLine.ALL, type: NodeType.Function },
            { blankLine: BlankLine.ONCE, type: NodeType.ArrowFunction },
          ],
        },
      ],
    },
  },
  subGroupsTriggers: [
    {
      getBody: getStoreBody,
      nodeType: 'StoreDefinition',
      subGroup: 'storeBody',
    },
  ],
};

export const vueOrderConfig = {
  ...baseConfig,
  configs: [...baseConfig.configs, utils, services, stores],
  customRecognizers: [...baseConfig.customRecognizers, serviceObjectRecognizer, storeRecognizer],
  ignoredTypes: [...baseConfig.ignoredTypes, NodeType.Expression],
  params: { ...baseConfig.params, storeFactory: 'defineStore' },
};
