import Vue from 'vue';
import App from '@/App.vue';
import router from '@router';
// import store from '@store';

import '@static/style/index.scss';
import '@plugins/element-ui.js';
import '@plugins/fontawesome.js';

Vue.config.productionTip = false;

export default new Vue({
    router,
    // store,
    render: (h) => h(App)
}).$mount('#app');
