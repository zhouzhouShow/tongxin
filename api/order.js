const order = {
	addressDefault : '/api/user_address/addressDefault',//默认地址详情
	orderdetail : '/api/order/orderdetail',//订单详情
	orderBegin : '/api/order/orderBegin',//生成订单
	orderPay : '/api/order/pay',//去支付
	goBuy : '/api/order/goBuy',//去结算
	myOrder : '/api/order/myOrder',//我的订单
	changeOrderStatus : '/api/order/changeOrderStatus',// 订单操作
	getJsApiData : '/api/order/getJsApiData',//微信支付
  getMySubOrder: '/api/order/mySubOrder', //店铺订单
  getLogistics: '/api/order/getLogistics', //获取物流
	
}
export default order;