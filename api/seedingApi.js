const seedingApi = {

	personalCenterData: '/api/topic/center', // 1.个人中心数据

	publishSeeding: '/api/topic/publish', // 2.发布种草

	seedingHandleLike: '/api/topic/like', // 3.点赞

	seedingHandleFollow: '/api/topic/follow', // 4.关注

	getSeedingCenterSeeding: '/api/topic/mylist', // 5.我的种草

	getSeedingCenterLike: '/api/topic/likelist', // 6.我的喜欢

	seedingShare: '/api/topic/share', // 7.分享

	getTitleList: '/api/topic/titleList', // 8.话题列表

	getSeedingDetail: '/api/topic/info', // 9.详情

	deleteSeeding: '/api/topic/del', // 10.删除

	getSeedingCarList: '/api/topic/cartList', // 11.关联购物车内的商品

	getSeedingBoughtList: '/api/topic/orderGoodsList', // 12.关联已买到的商品

	getFeaturedList: '/api/topic/articlelist', // 13.精选
	
	updateCenterPageDesc: '/api/topic/editMyword', // 14.更新留言

}

export default seedingApi;
