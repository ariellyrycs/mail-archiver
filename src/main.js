/**
 * @author ariel robles
 * @license MIT
 */

import Vue from 'vue';
import App from './app.vue';
import store from './store';
import './assets/scripts/mainUtils';

import 'normalize.css';
import 'splitpanes/dist/splitpanes.css';
import './assets/styles/main.css';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
