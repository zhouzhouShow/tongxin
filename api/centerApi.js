const centerApi = {
  getCenterIndex: '/api/user/index', // 用户中心
	getMyAssets: '/api/market/capital', // 我的资产
	handleWithdraw: '/api/market/withdraw', // 提现
	getMyIncomeLog: '/api/market/myAccountLog', // 我的收益
	getMyMemberNumLog: '/api/market/userNum', // 我邀请的会员统计
	getMyMemberList: '/api/market/mySubordinate', // 我邀请的会员列表
	getMyStoreInfo: '/api/market/storeInfo', // 店铺数据
	getVisitInfo: '/api/market/visitList', // 今日访客
	
	getRefundGoodInfo: '/api/return_goods/goodsInfo', // 退货的商品
	applyRefund: '/api/return_goods/begin', // 提交申请
	getRefundList: '/api/return_goods/returnOrderlist', // 列表
	getRefundOrderInfo: '/api/return_goods/returnOrderInfo', // 退货详情
	submitExpressInfo: '/api/return_goods/submitExpress', // 提交物流信息
	getRefundConfig: '/api/return_goods/conf', // 获取配置信息
	
  areaList: '/api/index/areaList', //  地址信息
  addressList: '/api/user_address/addressList', // 我的地址列表
  addressDetail: '/api/user_address/addressDetail', // 地址详情
  addressDel: '/api/user_address/addressDel', // 删除地址
  addressEdit: '/api/user_address/addressEdit', //  编辑地址
  addressSetDefault: '/api/user_address/addressSetDefault', //  设置默认地址
  couponList: '/api/market/coupon_list', // 优惠卷列表
  mycoupon: '/api/market/mycoupon', //  我的优惠券
  mycouponnum: '/api/market/mycouponnum', // 优惠券数量
  getCoupon: '/api/market/get_coupon', // 领取优惠券
	
}

export default centerApi;