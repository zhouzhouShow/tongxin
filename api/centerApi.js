const centerApi = {
  getCenterIndex: '/api/user/index',
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