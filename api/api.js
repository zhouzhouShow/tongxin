import baseHost from './config'
import xApi from './xApi.js'
import yApi from './yApi.js'

let host = baseHost.baseUrl;

const api = {
  uploadImg: `${host}/Api/Common/upload_image`, //上传图片接口
  getCenterIndex: `${host}/Api/User/index`, // 个人中心首页
  myAssets: `${host}/api/User/capital`, // 我的资产
  myCommission: `${host}/Api/user/myCommission`, // 我的佣金
  commissionAccount: `${host}/Api/user/commissionAccount`, // 订单佣金流水
  userComssion: `${host}/Api/user/userComssion`, // 用户佣金统计
  couponlist: `${host}/Api/User/couponlist`, // 优惠券列表
  withdraw: `${host}/Api/User/withdraw`, // 提现
  recharge: `${host}/Api/WxJsApi/recharge`, // 充值
  rechargeVip: `${host}/Api/WxJsApi/rechargeVip`, // 充值vip
  editInfo: `${host}/Api/User/edit`, // 修改个人信息
  getAccountLogList: `${host}/Api/User/accountLogList`, // 流水记录
  getAccountTypeList: `${host}/Api/User/accountTypeList`, // 流水分类
  addressList: `${host}/api/order/addressList`, // 用户地址
  addressDetai: `${host}/Api/Order/addressDetai`, // 地址详情
  addressDel: `${host}/Api/Order/addressDel`, // 删除地址
  addressDefault: `${host}/Api/Order/addressDefault`, // 默认地址
  addressEdit: `${host}/Api/Order/addressEdit`, // 地址编辑
  addressSetDefault: `${host}/Api/Order/addressSetDefault`, // 设置默认地址
  wechatPay: `${host}/Api/WxJsPay/getJsApiData`, // 调起微信支付
  collection: `${host}/Api/User/collection`, // 我的收藏
  comment: `${host}/Api/User/comment`, // 我的评论
  addDebunk: `${host}/Api/user/addDebunk`, // 我要吐槽
  problem: `${host}/Api/User/problem`, // 留言页面数据获取
  myOrder: `${host}/Api/Order/xcxMyOrder`, // 我的订单
  getRegionData: `${host}/api/index/area`, // 获取省市区联动数据
  orderdetail: `${host}/Api/Order/xcxOrderdetail`, // 订单详情
  keyWordSearch: `${host}/Api/index/keyWordSearch`, // 关键词搜索
  getLogistics: `${host}/Api/Order/getLogistics`, // 获取物流信息
  goods_comment: `${host}/Api/Order/goods_comment`, // 商品评论
  look_goods_comment: `${host}/Api/Order/look_goods_comment`, // 查看口碑
  getUserDetailInfo: `${host}/Api/user/detail`, // 获取用户信息
  getOrderList: `${host}/Api/XcxReturnGood/orderlist`, // 订单列表
  getRetCartNum: `${host}/Api/XcxReturnGood/retCartnum`, // 退货框总数
  getRetOrderList: `${host}/Api/XcxReturnGood/retOrderlist`, // 退货列表
  getRetGoodInfo: `${host}/Api/XcxReturnGood/retGoodinfo`, // 退货商品详情
  addRetCart: `${host}/Api/XcxReturnGood/addRetCart`, // 保存需要退货的
  cancelApplyRet: `${host}/Api/XcxReturnGood/del_cart`, //  删除选中商品/取消申请
  addRetOrder: `${host}/Api/XcxReturnGood/addRetOrder`, //  确认提交申请退货
  preferential: `${host}/Api/user/preferential`, //  会员节省详情
  retOrderdetail: `${host}/Api/XcxReturnGood/retOrderdetail`, //  退货详情
  changeOrderStatus: `${host}/Api/Order/changeOrderStatus`, // 修改订单状态
  add_cart: `${host}/api/cart/add_cart`, // 2.4 添加进货车
  getJsApiData: `${host}/Api/WxJsApi/getJsApiData`, // 调起微信支付
  pay: `${host}/Api/Order/pay_xcx`, // 去支付
  orderBegin: `${host}/Api/Order/orderBegin_xcx`, // 支付开始
  getVipList: `${host}/Api/user/getVipList`, // 会员等级信息
  cancelRetOrder: `${host}/Api/XcxReturnGood/cancelRetOrder`, // 取消退货（不是取消申请退货）
  getSalesmanInfo: `${host}/Api/user/customerService`, // 专属业务员
  getUserinfo: `${host}/Api/user/getUserinfo`, // 用户信息
  userSalseCode: `${host}/Api/WeChat/userSalseCode`, // 用户分销二维码
  saveRetExpress: `${host}/Api/XcxReturnGood/retExpress`, // 保存快递单号
  add_collection_pp: `${host}/api/brand/add_collection`, // 收藏品牌
  add_collection_sp: `${host}/api/cart/add_collection`, // 收藏商品
  delMyfeet: `${host}/Api/user/delMyfeet`, // 删除我的足迹
  refundRate: `${host}/Api/user/refundRate`, // 退货率
  
  
  getTestToken: `${host}/api/WeChat/getTestToken`, // 用户user_id换取token
  
}

Object.assign(api, xApi);
Object.assign(api, yApi);

export default api;