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
					<view class="user"><text>{{orderDetail.address.realname}}</text><text>{{orderDetail.address.mobile}}</text></view>
					<view class="area-info">
						<image class="a-icon" src="@/static/images/icon/area_icon.png" mode=""></image>
						<text class="area">{{orderDetail.address.prov_name+orderDetail.address.city_name+orderDetail.address.dist_name+orderDetail.address.address}}</text>
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
					<view class="b-item" v-for="(item,index) in orderGoodsList" :key="index">
						<view class="brand-info flex-align-center" @click="toBrandDetail(item.brandinfo.id)">
							<image class="b-img" :src="item.brandinfo.brand_logo[0]" mode=""></image>
							<text class="brand-name">{{item.brandinfo.brand_name}}</text>
							<text class="iconfont icon-arrow  iconyoujiantou"></text>
						</view>
						<view class="b-good">
							<block v-for="(itemC,indexC) in item.goodlist" :key="indexC">
								<cartItem @handleToRefund="handleToRefund(itemC)" :reFoundBtn="orderDetail.final_flag==4" type="order" :item="itemC"></cartItem>
							</block>
						</view>
					</view>
				</view>
				<!-- <order-goods-items :goodsItems="orderGoodsList"></order-goods-items> -->
				<div class="price-discount-box">
					<p>
						<span>商品总额</span>
						<span>¥{{goodTotalPrice}}</span>
					</p>
					<p>
						<span>运费</span>
						<span>{{orderDetail.shipping_monery == 0 ? '包邮': orderDetail.shipping_monery}}</span>
					</p>
					<p v-if="orderDetail.redpack && orderDetail.redpack>0">
						<span>优惠券抵扣</span>
						<span>¥{{orderDetail.redpack}}</span>
					</p>

				</div>
				<div class="total-price">

					<p class="" v-if="orderDetail.final_flag != 8">
						<span class="flex flex-align-center gray">订单金额
						<!-- <img class="icon" src="@/static/images/icon/arrow_down.png" alt=""> -->
						</span>
						<span>¥{{orderDetail.redpack>0 && orderDetail.redpack ? (orderDetail.price_sum - orderDetail.redpack) : orderDetail.price_sum}}</span>
					</p>
			</div>
			</div>
			<div class="order-info-container">
				<span>订单号：<span>{{orderDetail.order_code}}</span></span>
				<span >支付状态：<span>{{(orderDetail.pay_state < 2 ? '未支付' : ' 支付成功')}}</span></span>

		<!-- 		0，未付款；1，付款中；2，已付款 3, 已付预付款
				<span v-if="orderDetail.pay_type ==4 && orderDetail.final_flag != 8" :class="orderDetail.underline_pay == 0 ? 'no-pay':''">
					线下支付 ：<span>￥{{orderDetail.last_money+' ('+ (orderDetail.pay_state < 2 ? '待支付' : ' 已支付')+')'}} </span></span> -->

				<!-- <span v-if="orderDetail.pay_type == 1">微信支付：￥{{orderDetail.last_money}}</span> -->
			<!-- 	<span v-if="orderDetail.balance > 0">UU币：￥{{orderDetail.balance}}</span>
				<span v-if="orderDetail.balance_2 > 0">余额：￥{{orderDetail.balance_2}}</span> -->
				<span v-if="orderDetail.final_flag != 8">创建时间：<span>{{orderDetail.createtime}}</span></span>
		
			<span>付款{{orderDetail.final_flag ==8?'尾款':''}}时间：<span :class="orderDetail.pay_state < 2 ? 'no-pay':''">{{orderDetail.pay_state < 2 ? '-' : orderDetail.paytime}}
				</span></span>
				<span v-if="orderDetail.final_flag ==4 ">成交时间：<span>{{orderDetail.overtime}}</span></span>
				<!-- <span v-html="'配送方式：'+orderDetail.shipping_name.info"></span> -->
			</div>
		</div>
		<div class="order-detail-bottom-container">
			<block v-if="type != 'generalize'">
				<span class="" v-if="orderDetail.final_flag == 1" @click.stop="changeStatus(orderDetail.id,2)">取消订单</span>
				<span class="redBg" v-if="orderDetail.final_flag == 1" @click.stop="toPay(orderDetail.id)">立即付款</span>
				<span class="" v-if="orderDetail.final_flag == 2" @click.stop="goIndex">返回</span>
				<!-- <span v-if="orderDetail.final_flag == 2 && orderDetail.ship_status != 3 " @click.stop="changeStatus(orderDetail.id,4)">申请退款</span> -->
				<span v-if="orderDetail.final_flag == 4 || orderDetail.final_flag == 5" @click="changeStatus(orderDetail.id,1)">删除订单</span>
				<span v-if="orderDetail.final_flag == 3" @click.stop="getLogistics">查看物流</span>
				<span class="redBg" v-if="orderDetail.final_flag == 3 && orderDetail.receipt == 1" @click.stop="changeStatus(orderDetail.id,3)">确认收货</span>
				<span class="redBg" v-if="orderDetail.final_flag == 4 || orderDetail.final_flag == 5"  @click.stop="addCart(orderGoodsList)">加入购物车</span>
			</block>
			<!-- <span @click.stop="goIndex">返回</span> -->
		</div>
	
	</div>

</template>

<script>
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
						for (let items of item.goodlist) {
							price += items.goods_num * items.goods_price
						}
					})
				}
				return price.toFixed(2)
			}
		},
		methods: {
			toBrandDetail(id){
				wx.navigateTo({
					url:'/pages/index/brandDetail?id='+id
				})
			},
			handleToRefund(info){
				wx.navigateTo({
					url:'../refund/applyRefund?info='+info
				})
			},
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
					url: '/pages/shopCart/submitOrder?orderId=' + id
				})
			},

			navigatorTo(path, name) {
				wx.navigateTo({
					path: path,
					name: name
				});
			},

			async loadOrderDetail() {
				var result = await this.$fly.post(this.$api.orderdetail, {
					order_id: this.orderId,
					type: 0
				});
				// result.data.last_money = 
				result.data.createtime = this.$utils.formatTime(result.data.createtime * 1000);
				result.data.paytime = (result.data.paytime == 0 || !result.data.paytime) ? "--" : this.$utils.formatTime(result.data.paytime * 1000);
				if(result.data.final_flag == 4){
					result.data.overtime = this.$utils.formatTime(result.data.overtime*1000)
				}
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
						this.orderHeader.img = require("@/static/images/cancel_icon.png");
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
				if (status == 1) {
					this.$tip.modal('确认删除订单吗？','删除确认').then(() => {
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
					order_id: id,
					status: status
				}).then(async res => {
					this.orderDetail = await this.loadOrderDetail();
					this.initOrderHeader();
					this.orderGoodsList = this.orderDetail.products_list;
					this.initialization = true;
					this.getOrderLog()
					if(status == 1){
						uni.navigateBack({})
					}
					this.$tip.toast(res.msg);
				})
			},
			addCart(item){
				let data = []
				item.forEach(item=>{
					let goods = item.goodlist
					goods.forEach(el=>{
						data.push({
							goods_id:el.goods_id,
							goods_num:el.goods_num,
							product_id:el.product_id
						})
					})
				})
				uni.showLoading({
					title:'请稍后'
				})
				this.$fly.post(this.$api.addCart,{
					jsonstr:JSON.stringify(data),
					type:1
				}).then(res=>{
					uni.showToast({
						title:res.msg || '加入成功',
						duration:1500
					})
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
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
			let data  = await this.loadOrderDetail();
			this.orderDetail = data
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
					padding-left: rpx(50);
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
						margin-top:20rpx;
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
				padding: 30rpx 30rpx 0;
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
				padding: 0 30rpx 30rpx;
				.gray{
					color: #999999;
				}
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
				justify-content: space-between;
				flex-shrink: 0;
				border-top: rpx(20) solid #F3F3F3;
				padding:0 30rpx 30rpx;

				>span {
					font-size: rpx(26);
					font-weight: 400;
					color: #666666;
					margin-top: rpx(30);
					line-height: 1;
					display: flex;
					justify-content: space-between;
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
