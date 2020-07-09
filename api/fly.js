import store from '../store'
import config from '../api/config'

const Fly = require('flyio/dist/npm/wx');
const fly = new Fly;
//设置超时
fly.config.timeout = 20000;
fly.config.baseURL = config.baseUrl;

fly.interceptors.request.use((request) => {
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmbGFuIiwiaWF0IjoxNTc0NjUxNDcwLCJleHAiOjE1NzU5NDc0NzAsImRhdGEiOnsidWlkIjoiNTc5OTIifX0.474kuALHWlQ8rGgghP381oC24Sv7dkkL7Ul14MNb3IQ';
  const token = wx.getStorageSync('token') || '';

  if (request.body) {
    request.body.token = token;
  } else {
    request.body = {};
    request.body.token = token;
  }
  // 延迟发请求 等 getStorageSync 存储
  request.timeout = 30000;
  request.headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };
  return request;
}, (error, promise) => {
  // Do something with request error
  console.log(error); // for debug
  promise.reject(error)
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    //只将请求结果的data字段返回
    if (response.data.code == 1) {
      return response.data
    } else if(response.data.code == 401 || response.data.code == 403){
      // wx.removeStorageSync('token');
      // 用户未登录的跳转授权页面
      // wx.reLaunch({
      //   url: '/pages/auth/auth'
      // })
      // store.commit('setIsAuth',false)
    }else{
      wx.showToast({
        title: response.data.msg,
        icon: 'none',
        duration: 2000
      });
      return promise.reject(response.data)
    }
  },
  (err, promise) => {
    wx.hideLoading();
    let msg = '';
    if (err.code === 0) {
      msg = '网络连接异常'
    } else if (err.code === 1) {
      msg = '网络连接超时'
    } else if (err.code === 401) {
      msg = '用户未登录'
      // wx.removeStorageSync('token');
      // 用户未登录的跳转授权页面
      // wx.reLaunch({
      //   url: '/pages/auth/auth'
      // })
    } else {
      if (err.response.data.message) {
        msg = err.response.data.message
      } else {
        msg = '请求数据失败,请稍后再试'
      }
    }
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    });
    return promise.reject(err.response.data)
  }
);

// Vue.prototype.$http=fly //将fly实例挂在vue原型上

export default fly

