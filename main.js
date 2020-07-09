import Vue from 'vue'
import App from './App'
import store from './store'
import fly from './utils/fly.js'
import tools from './utils/tools.js'
import systemInfo from './utils/systemInfo.js'
import tips from './utils/tip.js'
import api from './api/api.js'
import utils from './utils/index.js'
import tags from './utils/tags.js'
import shakeScroll from './utils/shake.js'
import swiperLink from './utils/swiperLink.js'
import './utils/eventChannel.js'
Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$fly = fly;
Vue.prototype.$tools = tools;
// Vue.prototype.$system = systemInfo;
Vue.prototype.$tips = tips;
Vue.prototype.$utils = utils;
// Vue.prototype.$share = shareConfig;
// Vue.prototype.$intercept = logicIntercept;
Vue.prototype.$tags = tags;
Vue.prototype.$shake = shakeScroll;
Vue.prototype.$swiper = swiperLink;

const app = new Vue({
    ...App
})
app.$mount()
