import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pl from 'vuetify/es5/locale/pl';

import 'font-awesome/css/font-awesome.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: {pl},
        current: 'pl'
    }
});
