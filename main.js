import Vue from 'vue'
import App from './App'
import store from './store'
import fly from './api/fly.js'
import tools from './utils/tools.js'
import systemInfo from './utils/systemInfo.js'
import tip from './utils/tip.js'
import api from './api/api.js'
import utils from './utils/index.js'
import user from './utils/userInfo.js'
import uniPopup from './components/uni-popup/uni-popup.vue'
import './utils/eventChannel.js'
Vue.config.productionTip = false

App.mpType = 'app'

Vue.component('popup',uniPopup);
Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$fly = fly;
Vue.prototype.$tools = tools;
// Vue.prototype.$system = systemInfo;
Vue.prototype.$tip = tip;
Vue.prototype.$user = user
Vue.prototype.$utils = utils;
// Vue.prototype.$share = shareConfig;
// Vue.prototype.$intercept = logicIntercept;

const app = new Vue({
    ...App
})
app.$mount()
