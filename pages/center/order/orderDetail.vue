<template>

	<div v-if="initialization" class="page-container">
		<div class="order-detail-container">
			<div class="header-container" :class="orderDetail.final_flag == 7 ? 'refund':''">
				<div>
					<span>{{orderHeader.title}}</span>
					<span :style="{fontSize:orderDetail.final_flag == 8?'29rpx' : ''}" v-if="orderHeader.subTitle !== null">{{orderHeader.subTitle}}</span>
				</div>
				<div class="orderHImg">
					<img :src="orderHeader.img">
				</div>
			</div>
			<div class="address-info-container">
				<view class="area-box" >
					<view class="user"><text >张小飞</text><text>19888883213</text></view>
					<view class="area-info">
						<image class="a-icon" src="@/static/images/icon/area_icon.png" mode=""></image>
						<text class="area">广东省广州市天河区华观路1993万科广场 A栋407A</text>
					</view>
				</view>
				<div class="logistics" @click.stop="getLogistics" v-if="logistics && logistics.nu">
					<!-- <p class="title-text">物流信息</p> -->
					<div class="logis-box">
						<div class="left-box">
							<img class="logis-img" src="/static/images/icon/logistics-icon.png" alt="">
							<p></p>
						</div>
						<div class="info-box" v-if="logistics.data.length>0">
							<p class="logText">{{logistics.data[0].context}}</p>
							<p class='time'>{{logistics.data[0].time}}</p>
						</div>
						<div class="info-box" style="text-align:center;" v-else>
							暂无物流信息
						</div>
						<img class="rigth-arrow" src="/static/images/center/icon_arrow-right-grey.png" alt="">

					</div>
				</div>
			</div>
			<div class="setBg">
				<view class="brand-box">
					<view class="b-item">
						<view class="brand-info flex-align-center">
							<image class="b-img" src="@/static/images/center/icon_avatar.png" mode=""></image>
							<text class="brand-name">芭芭拉</text>
							<text class="icon-arrow iconfont iconyoujiantou"></text>
						</view>
						<view class="b-good">
							<cartItem type="order" :item="item"></cartItem>
							<cartItem type="order" :item="item"></cartItem>
						</view>
					</view>
				</view>
				<!-- <order-goods-items :goodsItems="orderGoodsList"></order-goods-items> -->
				<div class="price-discount-box">
					<p>
						<span>商品总额</span>
						<span>¥{{goodTotalPrice}}</span>
					</p>
					<p v-if="orderDetail.final_flag == 8">
						<span>已付定金</span>
						<span>¥{{(Number(orderDetail?orderDetail.admin_account_money_1:0)+Number(orderDetail?orderDetail.admin_account_money_2:0)+Number(orderDetail?orderDetail.admin_account_money_3:0)).toFixed(2)}}</span>
					</p>
					<p>
						<span>运费</span>
						<span>到付</span>
					</p>
					<p v-if="orderDetail.redpack && orderDetail.redpack>0">
						<span>优惠券抵扣</span>
						<span>¥{{orderDetail.redpack}}</span>
					</p>

				</div>
				<div class="total-price">

					<p class="" v-if="orderDetail.final_flag != 8">
						<span class="flex flex-align-center">订单金额
						<!-- <img class="icon" src="@/static/images/icon/arrow_down.png" alt=""> -->
						</span>
						<span>¥{{orderDetail.redpack>0 && orderDetail.redpack ? (orderDetail.price_sum - orderDetail.redpack) : orderDetail.price_sum}}</span>
					</p>
					<p class="" v-if="orderDetail.final_flag == 8">
						<span class="flex flex-align-center">未付尾款
						<!-- <img class="icon" src="@/static/images/icon/arrow_down.png" alt=""> -->
						</span>
						<span>¥{{orderDetail.last_money?orderDetail.last_money:0.00}}</span>
					</p>
			</div>
			</div>
			<div class="order-info-container">
				<span>订单号：{{orderDetail.order_sn_id}}</span>
				<span v-if="orderDetail.final_flag == 1 && orderDetail.pay_type !=4">支付状态：未支付</span>

				<span v-if="orderDetail.final_flag == 8 && orderDetail.pay_type ==4">支付状态：未支付尾款</span>

				<!-- 0，未付款；1，付款中；2，已付款 3, 已付预付款 -->
				<span v-if="orderDetail.pay_type ==4 && orderDetail.final_flag != 8" :class="orderDetail.underline_pay == 0 ? 'no-pay':''">
					线下支付 ：￥{{orderDetail.last_money+' ('+ (orderDetail.pay_status < 2 ? '待支付' : ' 已支付')+')'}}</span>
				<!-- {{orderDetail.underline_pay == 0 ? "德邦代付需支付":"德邦代付"}} -->
				<span v-if="orderDetail.pay_type ==8" :class="orderDetail.underline_pay == 0 ? 'no-pay':''">物流代收：￥{{orderDetail.last_money}}</span>

				<span v-if="orderDetail.pay_type == 1">微信支付：￥{{orderDetail.last_money}}</span>
				<span v-if="orderDetail.balance > 0">UU币：￥{{orderDetail.balance}}</span>
				<span v-if="orderDetail.balance_2 > 0">余额：￥{{orderDetail.balance_2}}</span>
				<span v-if="orderDetail.final_flag != 8">创建时间：{{orderDetail.create_time}}</span>
				<span v-if="orderDetail.final_flag == 8 && orderDetail.pay_type ==4">留货截止时间：{{orderDetail.preorder_deadline}}</span>
				<span v-if="orderDetail.final_flag == 8 && orderDetail.pay_type ==4">付定金时间：{{orderDetail.preorder_pay_time}}</span>
				<span>付款{{orderDetail.final_flag ==8?'尾款':''}}时间：<span :class="orderDetail.pay_status < 2 ? 'no-pay':''">{{orderDetail.pay_status < 2 ? '-' : orderDetail.pay_time}}
					</span></span>
				<!-- <span v-html="'配送方式：'+orderDetail.shipping_name.info"></span> -->
			</div>
		</div>
		<div class="order-detail-bottom-container">
			<block v-if="type != 'generalize'">
				<span class="redBg" v-if="orderDetail.final_flag == 1 && orderDetail.pay_type !=4" @click.stop="toPay(orderDetail.id)">付款</span>
				<span v-if="orderDetail.final_flag == 2 && orderDetail.ship_status != 3 &&orderDetail.pay_type!=8" @click.stop="changeStatus(orderDetail.id,4)">申请退款</span>
				<span v-if="orderDetail.final_flag == 3" @click.stop="getLogistics">物流详情</span>
				<span class="redBg" v-if="orderDetail.final_flag == 3 && orderDetail.receipt == 1" @click.stop="changeStatus(orderDetail.id,3)">确认收货</span>
				<span class="redBg" v-if="orderDetail.final_flag == 8 " @click.stop="toPay(orderDetail.id)">支付尾款</span>
				<span class="redBg" @click="">加入购物车</span>
			</block>
			<span @click.stop="goIndex">返回</span>
		</div>
	
	</div>

</template>

<script>
	import utils from "../../../utils/index";
	import goodsItem from "@/components/goodsItem";
	import cartItem from '@/components/shopCart/cartItem'
	export default {

		name: "orderDetail",

		components: {
			cartItem
		},

		data() {
			return {
				initialization: false,
				statusIndex: 2,
				orderId: "",
				orderDetail: null,
				orderHeader: {
					title: "",
					subTitle: "",
					img: ""
				},
				loadMore: 1,
				page: 0,
				pageSize: 6,
				orderGoodsList: [],
				bottomButton: [],
				goodList: [], //推荐商品,
				logistics: {},
				type: '', //generalize : 推广进来的订单详情,只能看
			};
		},
		computed: {
			goodTotalPrice() {
				let price = 0
				if (this.orderGoodsList.length > 0) {
					this.orderGoodsList.map((item) => {
						for (let items of item) {
							price += items.goods_num * items.goods_price
						}
					})
				}
				return price.toFixed(2)
			}
		},
		methods: {
			// changeStatus({id, status}) {
			//   this.$tip.loading('正在处理')
			//   this.$fly.post(this.$api.changeOrderStatus, {
			//     id: this.orderId,
			//     status: status
			//   }).then(res => {
			//     this.$tip.loaded();
			//     // this.
			//     this.$tip.toast(res.msg)
			//   })
			// },
			ellipsis(index) {
				this.goodList[index].descShow = !this.goodList[index].descShow
			},
			changColor(index, index2, item, num) {
				this.goodList[index].colorChooseIndex = index2
				let price = 0
				item.stockarr.wholesale_price_arr.forEach(items => {
					if (num <= items.max && num >= items.min) {
						price = items.price
					}
				})
				if (price == 0) { //没有区间,就区最大的数量的价格
					let maxArr = item.stockarr.wholesale_price_arr.slice(0)
					maxArr.reverse((a, b) => {
						console.log(a.max)
						return a.max > b.max
					})
					this.goodList[index].preferPrice = maxArr[0].price
				} else {
					this.goodList[index].preferPrice = price
				}
				this.$forceUpdate()
			},
			priceFixed(price) {

				return price ? price.toFixed(2) : 0.00
			},
			//获取推荐更多
			getMore() {
				this.loadMore = 2;
				this.$fly.post(this.$api.collection, {
					page: this.page,
					pageSize: this.pageSize,
					type: this.orderDetail.products_list[0][0].goods_type == 3 ? 3 : 2
				}).then(res => {
					console.log(res)
					// 判断第一个商品类型
					if (this.orderDetail.products_list[0][0].goods_type == 3) {
						res.data.list.filter(item => {
							item.descShow = false
							item.colorChooseIndex = 0
							// let keyStr = item.stockarr.colorarr[0].color_id+'-'+item.stockarr.sizearr[0].size_id
							item.stockarr.colorarr.reverse((a, b) => {
								return a.color > b.color
							})
							// item.keyStr = keyStr
							let num = item.stockarr.colorarr[0].color
							let price = 0
							item.stockarr.wholesale_price_arr.forEach(item => {
								if (num <= Number(item.max) && num >= Number(item.min)) {
									price = item.price
								}
							})
							if (price == 0) { //没有区间,就区最大的数量的价格
								let maxArr = item.stockarr.wholesale_price_arr.slice(0)
								maxArr.reverse((a, b) => {
									console.log(a.max)
									return a.max > b.max
								})
								item.preferPrice = maxArr[0].price
							} else {
								item.preferPrice = price
							}
						})
					}
					if (this.page == 1) {
						this.goodList = res.data.list
					} else {
						if (res.data.list.length > 0) {
							this.goodList = this.goodList.concat(res.data.list)
						} else {
							this.loadMore = 3;
						}
					}
					if (res.data.list.length < this.pageSize) {
						this.loadMore = 3;
					} else {
						this.page++
						this.loadMore = 1;
					}
				})

			},
			getLogistics() {
				wx.navigateTo({
					url: '/pages/center/order/logistics?order_id=' + this.orderId
				})
			},

			goIndex() {
				wx.navigateBack({})
			},

			toPay(id) {
				wx.navigateTo({
					url: '/pages/shopAndOrder/settlement/submitOrder?orderId=' + id
				})
			},

			navigatorTo(path, name) {
				wx.navigateTo({
					path: path,
					name: name
				});
			},

			async loadOrderDetail() {
				var result = await this.$fly.post(this.$api.orderDetail, {
					order_id: this.orderId,
					type: 0
				});
				// result.data.last_money = 
				result.data.create_time = utils.formatTime(result.data.create_time * 1000);
				result.data.pay_time = result.data.pay_time == 0 ? "--" : utils.formatTime(result.data.pay_time * 1000);
				return result.data;
			},

			initOrderHeader() {
				const status = this.orderDetail.final_flag;
				switch (Number(status)) {
					case 1:
						this.orderHeader.title = "待付款";
						this.orderHeader.subTitle = "尽快完成付款，才能发货哦~~";
						this.orderHeader.img = require("@/static/images/order-status-wallet.png");
						break;
					case 2:
						if (this.orderDetail.ship_status == 3) {
							this.orderHeader.title = "备货中";
							this.orderHeader.subTitle = "商品正在打包准备发货~~";

						} else {
							this.orderHeader.title = "待发货";
							this.orderHeader.subTitle = "商品正在打包准备发货~~";
						}
						if (this.orderDetail.pay_type == 8) {
							this.orderHeader.subTitle = "您的订单已完成尾款支付，我们将第一时间安排发货，请您注意查收~~";
						}
						this.orderHeader.img = require("@/static/images/order-status-truck.png");
						break;
					case 3:
						this.orderHeader.title = "待收货";
						this.orderHeader.subTitle = "商品运输中，请耐心等待~~";
						this.orderHeader.img = require("@/static/images/order-status-box.png");
						break;
					case 4:
						this.orderHeader.title = "已完成";
						this.orderHeader.subTitle = "交易达成，祝您购物愉快~~";
						this.orderHeader.img = require("@/static/images/order-status-finished.png");
						break;
					case 5:
						this.orderHeader.title = "已取消";
						this.orderHeader.subTitle = "您取消了订单~~";
						this.orderHeader.img = require("@/static/images/order-status-box.png");
						break;
					case 6:
						if (this.orderDetail.refund_status == 0) {
							this.orderHeader.title = "申请退款";
							this.orderHeader.subTitle = "申请退款中~~";

						} else if (this.orderDetail.refund_status == 2) {
							this.orderHeader.title = "退款失败";
							this.orderHeader.subTitle = "退款失败~~";

						} else {
							this.orderHeader.title = "已退款";
							this.orderHeader.subTitle = "退款成功~~";
						}
						this.orderHeader.img = require("@/static/images/order-status-refund.png");
						break;
					case 8:
						this.orderHeader.title = "待付尾款";
						this.orderHeader.subTitle = "请尽快完成尾款支付，留货时间内未完成付款，定金将会自动转换为等额UU币~~";
						this.orderHeader.img = require("@/static/images/order-status-wallet.png");
						break;
					default:
						break;
				}
			},

			changeStatus(id, status) {
				if (status == 4) {
					Dialog.confirm({
						title: '退款确认',
						message: '确认真的不要宝贝了吗？'
					}).then(() => {
						// on confirm
						this.submitChangeStatus(id, status);
					}).catch(() => {
						// on cancel
					});
				} else {
					this.submitChangeStatus(id, status);
				}
			},
			submitChangeStatus(id, status) {
				this.$tip.loading('正在处理')
				this.$fly.post(this.$api.changeOrderStatus, {
					id: id,
					status: status
				}).then(async res => {
					this.orderDetail = await this.loadOrderDetail();
					this.initOrderHeader();
					this.orderGoodsList = this.orderDetail.products_list;
					this.initialization = true;
					this.getOrderLog()
					this.$tip.toast(res.msg);
				})
			},
			//获取订单物流信息
			getOrderLog() {
				this.loadMore = 2;
				let  data = {"status":1,"msg":"\u6682\u65e0\u7269\u6d41\u4fe1\u606f","data":{"status":"polling","lastResult":{"nu":"12321","com":"\u56fd\u5185\u4e13\u7ebf","state":0,"data":[]},"img":""}}
				this.logistics = data.data.lastResult
				this.$fly.post(this.$api.getLogistics, {
					order_id: this.orderId
				}).then(res => {
					this.logistics = res.data.lastResult
				})
			},

		},
		async onReachBottom() {
			// this.page++;
			// this.getMore()
		},
		async onLoad(option) {
			this.orderId = option.order_id;
			// this.orderDetail = await this.loadOrderDetail();
			let data  = {
				"status": 1,
				"msg": "\u83b7\u53d6\u6210\u529f",
				"data": {
					"underline_pay": "0",
					"id": "121211",
					"order_total_coupon_total": "78.40",
					"order_total_coupon_1": "78.40",
					"address_id": "0",
					"order_total_coupon_3": "0.00",
					"order_sn_id": "2020061301982",
					"user_id": "60805",
					"pay_type": "3",
					"order_type": "0",
					"is_self_get": "0",
					"order_status": "1",
					"pay_status": "2",
					"ship_status": "1",
					"discount_price": "0.00",
					"price_sum": "78.40",
					"shipping_monery": "0.00",
					"price": "78.40",
					"balance": "78.40",
					"redpack": "0.00",
					"balance_2": "0.00",
					"last_money": 78.4,
					"shipping": "50",
					"create_time": "1592020622",
					"delivery_time": "1592022985",
					"pay_time": "1592020622",
					"over_time": "0",
					"refund_status": "0",
					"admin_account_money_1": "0.00",
					"admin_account_money_2": "0.00",
					"admin_account_money_3": "0.00",
					"is_preorder": "0",
					"preorder_deadline": "",
					"preorder_pay_time": "",
					"products_list": [
						[{
							"id": "837190",
							"order_id": "121211",
							"code": "YX-PACK-30119",
							"goods_id": "30119",
							"goods_num": "1",
							"price_sale": "80.00",
							"goods_price": "78.40",
							"sku": "YX-PACK-30119_1",
							"user_id": "60805",
							"comment": "0",
							"over": "0",
							"color": "\u767d\u8272",
							"size": "110\/120\/130\/140\/150",
							"weight": "1.00",
							"title": "\u6cb3\u9a6c\u5c9b\u4e28\u4f11\u95f2\u7b80\u7ea6\u649e\u8272\u5b57\u6bcd\u5370\u82b1\u7eaf\u68c9T\u6064",
							"color_id": "0",
							"size_id": "0",
							"true_num": "1",
							"delay": "0",
							"goods_type": "1",
							"is_seckill": "0",
							"price": "78.40",
							"wholesale_num": "5",
							"goods_img": [
								"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200110\/df37282ff85dce9122f410e6002542dc.jpg",
								"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200110\/3c6fce367dd9083e347bb9ccb732668f.jpg",
								"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200110\/c0d8b24d6554e83edd18114f90ed5d35.jpg",
								"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200110\/3b84264047a789fa3406bc7312e74730.jpg",
								"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200110\/2a7be5ef853136387cf4b7e936d05b25.jpg"
							],
							"stokcnum": "3",
							"pack_stock_num": 15,
							"sku_num": "5"
						}]
					],
					"address": {
						"id": "145887",
						"realname": "21321",
						"mobile": "13312345678",
						"prov": "\u6cb3\u5317\u7701",
						"prov_name": "\u6cb3\u5317\u7701",
						"city": "\u77f3\u5bb6\u5e84\u5e02",
						"city_name": "\u77f3\u5bb6\u5e84\u5e02",
						"dist": "\u957f\u5b89\u533a",
						"dist_name": "\u957f\u5b89\u533a",
						"address": "\u5e08\u8303\u5927\u5b66",
						"status": "1"
					},
					"userinfo": {
						"id": "60805",
						"group_id": "1",
						"username": "yx60805",
						"nickname": "\u4e00\u9505\u7096\u4e0d\u4e0b",
						"alias": "",
						"truename": "lalsl",
						"email": "",
						"mobile": "1331234567",
						"avatar": "https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.comhttps:\/\/wx.qlogo.cn\/mmopen\/vi_32\/JFRlib4SA0OPeCjsw9TZ1kORR1iaAPHSzXaoSbsxAiaeERRBVCvJ666Bk6SbkGz9fUvYThPRPHic6BabXYlHvibV5dA\/132",
						"level": "10",
						"gender": "1",
						"birthday": "2016-04-11",
						"bio": "",
						"score": "0",
						"successions": "1",
						"maxsuccessions": "1",
						"prevtime": "1594278081",
						"logintime": "1594278221",
						"loginip": "119.129.113.132",
						"loginfailure": "0",
						"joinip": "61.140.163.221",
						"jointime": "1582886233",
						"createtime": "1582886233",
						"updatetime": "1588664743",
						"levelup_time": "0",
						"deadline_time": "1622264390",
						"token": "",
						"id_card": "",
						"recommendcode": "",
						"status": "normal",
						"verification": "",
						"validate_email": "0",
						"member_status": "0",
						"member_discount": "100.00",
						"p_id": "0",
						"first_order_time": "1584410451",
						"last_order_time": "1592020659",
						"order_num": "7",
						"charge_num": "0",
						"froms": "",
						"refreeid": "0",
						"qr_code": "https:\/\/api.yoyoxp.com\/salesecode\/shareuser\/60805.png",
						"user_type": "0",
						"commission_status": "0",
						"admin_id": "0",
						"is_can_change": "0",
						"prov": "",
						"city": "",
						"dist": "",
						"prov_name": "",
						"city_name": "",
						"dist_name": "",
						"beizhu": "",
						"is_self_in": "0",
						"is_bind": "1",
						"session_key": "mWrEdw\/9si1ZI54CVP651w==",
						"sign": "0"
					},
					"total_num": 1,
					"final_flag": 3,
					"coupon": [],
					"flancoin": "315.00",
					"totalflancoin": 315,
					"balancemoney": "19.00",
					"paytype": [{
						"id": "1",
						"type_name": "\u5fae\u4fe1\u652f\u4ed8",
						"desc": "\u5fae\u4fe1\u652f\u4ed8",
						"create_time": "1478882254",
						"update_time": "1478882254",
						"status": "1",
						"is_default": "1",
						"rate": "0",
						"is_special": "0",
						"sort": "1"
					}, {
						"id": "4",
						"type_name": "\u7ebf\u4e0b\u652f\u4ed8",
						"desc": "\u7ebf\u4e0b\u652f\u4ed8",
						"create_time": "1478882254",
						"update_time": "1478882254",
						"status": "1",
						"is_default": "0",
						"rate": "0",
						"is_special": "0",
						"sort": "6"
					}, {
						"id": "8",
						"type_name": "\u7269\u6d41\u4ee3\u6536",
						"desc": "\u7269\u6d41\u4ee3\u6536",
						"create_time": "1478882254",
						"update_time": "1478882254",
						"status": "1",
						"is_default": "0",
						"rate": "0",
						"is_special": "0",
						"sort": "8"
					}],
					"receipt": 1,
					"shippings": [{
						"title": "\u7269\u6d41\u914d\u9001",
						"id": 50,
						"info": "\u7269\u6d41\u914d\u9001\uff1a\u7531\u5546\u5bb6\u9009\u62e9\u5408\u4f5c\u5feb\u9012\u4e3a\u60a8\u914d\u9001\uff0c\u6e29\u99a8\u63d0\u793a\uff1a\u5feb\u9012\u914d\u9001\u662f\u5230\u4ed8\u90ae\u8d39",
						"fee": 0,
						"worker": ""
					}, {
						"title": "\u95e8\u5e97\u81ea\u63d0",
						"id": 49,
						"info": "\u4f18\u9009\u4f18\u54c1\u5c55\u5385",
						"fee": "\u53d6\u8d27\u81ea\u4ed8",
						"worker": ""
					}],
					"total_discount_price": 0
				}
			};
			this.orderDetail = data.data
			this.type = option.type || ''
			console.log(this.orderDetail)
			this.initOrderHeader();
			this.orderGoodsList = this.orderDetail.products_list;
			this.initialization = true;
			this.getOrderLog()
		}

	};
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.page-container {

		min-height: 100%;
		display: flex;
		flex-direction: column;
		background: #f3f3f3;
		padding-bottom: 100rpx;
		.order-detail-container {
			padding: 20rpx;
			// display: flex;
			// flex-direction: column;
			// overflow: scroll;
			// flex-grow: 1;


			.refund {
				background: linear-gradient(90deg, rgba(175, 97, 255, 1) 0%, rgba(88, 147, 255, 1) 100%) !important;
			}

			.header-container {
				display: flex;
				flex-direction: row;
				flex-shrink: 0;
				height:195rpx;
				background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
				border-radius:10rpx;

				.orderHImg {
					width: 146upx;
					height: 112upx;
				}

				>div:nth-child(1) {
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					padding-left: rpx(19);
					flex-grow: 1;
					font-weight:400;
					color:rgba(255,255,255,1);
					>span {
						color: #fff;
						font-weight: 500;
					}

					>span:nth-child(1) {
						font-size:30rpx;
						
					}

					>span:nth-child(2) {
						font-size: rpx(24);
					}
				}

				>div:nth-child(2) {
					display: flex;
					height: 100%;
					width: 33.33%;
					flex-shrink: 0;
					align-items: center;
					justify-content: flex-start;

					>img {
						height: rpx(112);
						max-width: rpx(146);
					}
				}

			}

			.address-info-container {
				// height: rpx(200);
				flex-shrink: 0;
				border-bottom: rpx(20) solid #F3F3F3;

				.area-box{
					margin-top:20rpx;
					background: #fff;
					padding: 40rpx 30rpx;
					background:rgba(255,255,255,1);
					border-radius:10rpx;
					font-size:28rpx;
					font-weight:400;
					color:rgba(102,102,102,1);
					// margin-bottom: 20rpx;
					.user{
						font-size:30rpx;
						color:rgba(51,51,51,1);
						margin:0 0 30rpx;
						text:nth-child(1){
							margin-right:32rpx;
							font-weight:500;
						}
						text:nth-child(2){
							font-weight:400;
						}
					}
					.area-info{
						display: flex;
						.a-icon{
							width: 24rpx;
							height: 27rpx;
							margin-right: 10rpx;
							margin-top: 10rpx;
						}
						.area{
							font-size:28rpx;
							width:513rpx;
							font-weight:400;
							color:rgba(102,102,102,1);
							line-height:42rpx;
						}
						.iconyoujiantou{
							margin-left:auto;
							font-size: 40rpx;
							color: #D6D6D6;
						}
					}
					
				}

				.logistics {
					padding-bottom: 33rpx;
					margin-top: 20rpx;
					border-radius: 10rpx;
					background: #fff;
					.title-text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
						margin: 40rpx 0;
					}

					.logis-box {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 30rpx 0;
						.left-box {
							overflow: hidden;
							display: flex;
							flex-direction: column;
							align-items: center;

							.logis-img {
								width: 27rpx;
								height: 27rpx;
							}

							>p {
								width: 1rpx;
								height: 100rpx;
								background: #eee
							}
						}

						.info-box {
							width: 586rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);

							.logText {
								line-clamp: 2;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								margin-bottom: 27rpx;
							}

							.time {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
							}
						}

						.rigth-arrow {
							width: 13rpx;
							height: 23rpx;
						}
					}

				}


			}
			.setBg{
				background: #fff;
				border-radius: 10rpx;
			}
			.brand-box {
				padding: 30rpx 30rpx 0;
				.b-item {
					.brand-info {
						margin-left: 10rpx;
						margin-bottom: 10rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
			
						.b-img {
							width: 40rpx;
							height: 40rpx;
							margin-right: 6rpx;
						}
			
						.icon-arrow {
							color: #d9d9d9;
							font-size: 40rpx;
						}
					}
			
					.b-good {}
			
				}
			}
			.price-discount-box {
				font-size: 26rpx;
				color: #333;
				padding: 30rpx 20rpx 0;
				background: #fff;
				>p {
					display: flex;
					justify-content: space-between;
					margin-bottom: 30rpx;
				}
			}

			.total-price {
				font-size: 30rpx;
				font-weight: 500;
				padding: 0 20rpx 30rpx;

				>p {
					display: flex;
					justify-content: space-between;
					align-items: center;

					// margin-bottom:30rpx;
					.icon {
						width: 23rpx;
						height: 13rpx;
						margin-left: 15rpx;
					}
				}
			}

			.order-info-container {
				background: #fff;
				border-radius:10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				flex-shrink: 0;
				min-height: rpx(270);
				border-top: rpx(20) solid #F3F3F3;
				padding-top: rpx(7);
				padding-bottom: rpx(35);
				padding-right: rpx(42);
				padding-left: rpx(27);

				>span {
					font-size: rpx(26);
					font-weight: 400;
					color: #666666;
					margin-top: rpx(20);
					line-height: rpx(37);
				}

				.no-pay {
					color: #ff0000 !important;
				}

			}
		}

		.order-detail-bottom-container {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: rpx(98);
			background-color: #fff;
			box-shadow: 0 0 rpx(7) 0 rgba(207, 207, 207, 0.39);
			;
			flex-shrink: 0;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			z-index: 999;

			>span {
				font-size: rpx(28);
				font-weight: 400;
				color: #666666;
				border: rpx(1) solid #C8C8C8;
				border-radius: rpx(25);
				margin-right: rpx(20);
				width: 150rpx;
				line-height: 50rpx;
				text-align: center;
				height: 50rpx;
				// padding: rpx(10) rpx(33);
			}
			.redBg{
				background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
				color: #fff;
				border: none;
			}
			.pay {
				background: #FF0000 !important;
				color: #fff;
				border-color: #FF0000 !important;
			}
		}

	}



</style>
