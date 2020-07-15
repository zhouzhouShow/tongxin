import index from './index'
import good from './good'
import seedingApi from './seedingApi'
import centerApi from './centerApi'
import order from './order'

const api = {
  /* 登录 */
  login: `/api/user/xcxlogin`,                   //小程序登录
  updateUserInfo: `/api/user/updateUserInfo`,    // 更新用户信息
  uploadImage: `/api/common/upload`,         // 上传图片
  hotSearch: `/api/index/hot_search`,         // 热词
  historySearch: `/api/index/history_search`,         // 最近搜索
  deleteHistorySearch: `/api/index/delete_history_search`,         // 最近搜索
  shareWXCode: `/api/goods/wxCode`,         // 生成图片
	

}

Object.assign(api, index)
Object.assign(api, good)
Object.assign(api, seedingApi);
Object.assign(api, centerApi);
Object.assign(api, order)
export default api;