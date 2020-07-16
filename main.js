import Vue from 'vue'
import App from './App'
import store from './store'
import fly from './api/fly.js'
import tools from './utils/tools.js'
import systemInfo from './utils/systemInfo.js'
import tip from './utils/tip.js'
import api from './api/api.js'
import utils from './utils/index.js'
import help from './utils/help.js'
import user from './utils/userInfo.js'
import share from './utils/share.js'
import uniPopup from './components/uni-popup/uni-popup.vue'
import loginIntercept from './utils/loginIntercept.js'
import './utils/eventChannel.js'
import MescrollBody from "mescroll-uni/mescroll-body.vue"
import MescrollUni from "mescroll-uni/mescroll-uni.vue"

Vue.config.productionTip = false

App.mpType = 'app'
Vue.component('MescrollBody',MescrollBody)
Vue.component('MescrollUni',MescrollUni)
Vue.component('popup',uniPopup);
Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$fly = fly;
Vue.prototype.$tools = tools;
Vue.prototype.$help = help;
Vue.prototype.$tip = tip;
Vue.prototype.$user = user
Vue.prototype.$utils = utils;
Vue.prototype.$loginIntercept = loginIntercept
Vue.prototype.$share = share;
// Vue.prototype.$intercept = logicIntercept;

const app = new Vue({
    ...App
})
app.$mount()
