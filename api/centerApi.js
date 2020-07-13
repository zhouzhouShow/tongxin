const centerApi = {
  getCenterIndex: '/api/user/index', // 用户中心
	getMyAssets: '/api/market/capital', // 我的资产
	handleWithdraw: '/api/market/withdraw', // 提现
	getMyIncomeLog: '/api/market/myAccountLog', // 我的收益
	getMyMemberNumLog: '/api/market/userNum', // 我邀请的会员统计
	getMyMemberList: '/api/market/mySubordinate', // 我邀请的会员列表
	getMyStoreInfo: '/api/market/storeInfo', // 店铺数据
	getVisitInfo: '/api/market/visitList', // 今日访客
	
	
  areaList: '/api/index/areaList', //  地址信息
  addressList: '/api/user_address/addressList', // 我的地址列表
  addressDetail: '/api/user_address/addressDetail', // 地址详情
  addressDel: '/api/user_address/addressDel', // 删除地址
  addressEdit: '/api/user_address/addressEdit', //  编辑地址
  addressSetDefault: '/api/user_address/addressSetDefault', // 设置默认地址
}

export default centerApi;