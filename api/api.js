import baseHost from './config'

let host = baseHost.baseUrl;

const api = {
  /* 登录 */
  login: `${host}/api/user/xcxlogin`,                   //小程序登录
  updateUserInfo: `${host}/api/WeChat/updateUserInfo`,    // 更新用户信息
  
  uploadImage: `${host}/Api/Common/upload_image`,         // 上传图片
  
}

// Object.assign(api, xApi);

export default api;