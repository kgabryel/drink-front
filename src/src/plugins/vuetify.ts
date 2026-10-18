import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { VStepperVertical, VStepperVerticalItem } from 'vuetify/components';
import { pl } from 'vuetify/locale';

export default createVuetify({
  components: {
    VStepperVertical,
    VStepperVerticalItem,
  },
  defaults: {
    VAutocomplete: {
      density: 'compact',
      variant: 'underlined',
    },
    VBtn: {
      color: 'black',
      variant: 'text',
    },
    VCard: {
      elevation: 0,
    },
    VChip: {
      label: true,
    },
    VCombobox: {
      chips: true,
      density: 'compact',
      hideSelected: true,
      menuProps: {
        closeOnContentClick: true,
      },
      multiple: true,
      variant: 'underlined',
    },
    VDialog: {
      maxWidth: 600,
    },
    VField: {
      color: 'indigo-darken-4',
      density: 'compact',
    },
    VList: {
      bgColor: 'transparent',
    },
    VMenu: {
      contentClass: 'glass-background',
    },
    VSelect: {
      density: 'compact',
      variant: 'underlined',
    },
    VStepperVertical: {
      elevation: 0,
    },
    VSwitch: {
      color: 'white',
      hideDetails: true,
    },
    VTextarea: {
      density: 'compact',
      variant: 'underlined',
    },
    VTextField: {
      density: 'compact',
      variant: 'underlined',
    },
    VToolbar: {
      color: 'transparent',
      flat: true,
    },
    VTooltip: {
      location: 'bottom',
    },
  },
  locale: {
    locale: 'pl',
    messages: { pl },
  },
  theme: {
    defaultTheme: 'light',
  },
});
