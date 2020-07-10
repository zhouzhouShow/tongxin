import index from './index'
import good from './good'
import seedingApi from './seedingApi'
import centerApi from './centerApi'

const api = {
  /* 登录 */
  login: `/api/user/xcxlogin`,                   //小程序登录
  updateUserInfo: `/api/WeChat/updateUserInfo`,    // 更新用户信息
  uploadImage: `/api/common/upload`,         // 上传图片
  hotSearch: `/api/index/hot_search`,         // 热词
  historySearch: `/api/index/history_search`,         // 最近搜索
  deleteHistorySearch: `/api/index/delete_history_search`,         // 最近搜索
	
}

Object.assign(api,index)
Object.assign(api,good)
Object.assign(api, seedingApi);
Object.assign(api, centerApi);
export default api;