<template>
	<view class="order_detail">
		<view class="status">
			<view class="left">
				<view class="top">
					<text>{{statusText[orderDetail.final_flag]}}</text>
				</view>
				<view class="bottom">
					<text>{{orderDetail.userinfo.nickname}}</text>
					<text>{{orderDetail.address.mobile}}</text>
				</view>
			</view>
			<view class="right">
				<image :src="statusIcon[orderDetail.final_flag]" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="address">
			<view class="top">
				<text>{{orderDetail.address.realname}}</text>
				<text>{{orderDetail.address.mobile}}</text>
			</view>
			<view class="bottom">
				<view class="left">
					<image src="../../../static/images/center/icon_address_red.png" mode="scaleToFill"></image>
				</view>
				<view class="right">
					<text>{{orderDetail.address.prov_name}}{{orderDetail.address.city_name}}{{orderDetail.address.dist_name}}{{orderDetail.address.address}}</text>
				</view>
			</view>
		</view>
		<view class="product">
			<view v-for="(el,num) in orderDetail.products_list" :key="num">
				<view class="store">
					<view class="info">
						<image class="logo" :src="el.brandinfo.brand_logo" mode="scaleToFill"></image>
						<text>{{el.brandinfo.brand_name}}</text>
						<image class="arrow" src="../../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
				</view>
				<view class="product_list">
					<view v-for="(e,s) in el.goodlist" :key="s" class="product_item">
						<productItem :info="e"></productItem>
					</view>
				</view>
			</view>
			<view class="cell">
				<view class="cell_item">
					<view class="left">
						<text>商品总额</text>
					</view>
					<view class="right">
						<text>¥</text>
						<text>{{orderDetail.price_sum || 0}}</text>
					</view>
				</view>
				<view class="cell_item">
					<view class="left">
						<text>运费</text>
					</view>
					<view class="right">
						<text>¥</text>
						<text>{{orderDetail.shipping_monery || 0}}</text>
					</view>
				</view>
				<view class="cell_item">
					<view class="left">
						<text>优惠券抵扣</text>
					</view>
					<view class="right red">
						<text>¥</text>
						<text>-{{orderDetail.redpack || 0}}</text>
					</view>
				</view>
				<view class="cell_item">
					<view class="left">
						<text>订单金额</text>
					</view>
					<view class="right">
						<text>¥</text>
						<text>{{orderDetail.last_money || 0}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="infos">
			<view class="infos_item">
				<view class="left">
					<text>订单号</text>
				</view>
				<view class="right">
					<text>{{orderDetail.order_code}}</text>
				</view>
			</view>
			<view class="infos_item">
				<view class="left">
					<text>支付状态</text>
				</view>
				<view class="right">
					<text>{{orderDetail.pay_state==0?'未支付':orderDetail.pay_state==20?'已支付':'支付中'}}</text>
				</view>
			</view>
			<view class="infos_item">
				<view class="left">
					<text>创建时间</text>
				</view>
				<view class="right">
					<text>{{$utils.formatTime(orderDetail.createtime*1000,'yyyy-MM-dd hh:mm:ss')}}</text>
				</view>
			</view>
			<view v-if="orderDetail && orderDetail.paytime" class="infos_item">
				<view class="left">
					<text>支付时间</text>
				</view>
				<view class="right">
					<text>{{$utils.formatTime(orderDetail.paytime*1000,'yyyy-MM-dd hh:mm:ss')}}</text>
				</view>
			</view>
			<view v-if="orderDetail && orderDetail.deliverytime" class="infos_item">
				<view class="left">
					<text>发货时间</text>
				</view>
				<view class="right">
					<text>{{$utils.formatTime(orderDetail.deliverytime*1000,'yyyy-MM-dd hh:mm:ss')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import productItem from "@/components/productItem.vue"
	export default {
		name: "storeOrderDetail",
		components: {
			productItem
		},
		data() {
			return {
				orderId:0,
				statusText:['','待付款','待发货','待收货','已收货','已取消'],
				statusIcon: [
					'',
					require('../../../static/images/center/order_status_waitpay.png'),
					require('../../../static/images/center/order_status_shipped.png'),
					require('../../../static/images/center/order_status_waitrecive.png'),
					require('../../../static/images/center/order_status_finish.png'),
					require('../../../static/images/center/order_status_cancel.png'),
				],
				orderDetail: {}
			};
		},
		onLoad(options) {
			this.orderId = options.id
			if(!this.orderId){
				uni.showToast({
					title:'订单号错误',
					duration:1500
				})
				wx.navigateBack()
				return
			}
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail() {
				this.$fly.post(this.$api.orderdetail, {
					order_id: this.orderId
				}).then(res => {
					this.orderDetail = res.data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.order_detail {
		min-height: 100%;
		overflow: hidden;
		background-color: #F3F3F3;

		.status {
			width: 710rpx;
			height: 195rpx;
			background: linear-gradient(90deg, rgba(255, 180, 79, 1) 0%, rgba(255, 105, 76, 1) 100%);
			border-radius: 10rpx;
			margin: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 40rpx 60rpx 40rpx 50rpx;

			.left {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 30rpx;

				.top {
					height: 30rpx;
				}

				.bottom {
					height: 30rpx;
					margin-top: 18rpx;

					text:nth-child(2) {
						margin-left: 30rpx;
					}
				}
			}

			.right {
				width: 146rpx;
				height: 112rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.address {
			width: 710rpx;
			margin: 20rpx;
			padding: 40rpx 30rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;

			.top {
				height: 22rpx;
				font-size: 30rpx;
				line-height: 22rpx;
				font-family: DINPro;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);

				text:nth-child(2) {
					margin-left: 30rpx;
				}
			}

			.bottom {
				margin-top: 30rpx;
				display: flex;

				.left {
					width: 24rpx;
					height: 27rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					max-width: 515rpx;
					margin-left: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 42rpx;
				}
			}
		}

		.product {
			margin: 20rpx;
			width: 710rpx;
			padding: 35rpx 30rpx;
			background-color: #fff;
			border-radius: 10rpx;

			.store {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info {
					display: flex;
					align-items: center;

					.logo {
						width: 36rpx;
						height: 34rpx;
					}

					text {
						height: 30rpx;
						font-size: 32rpx;
						line-height: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						padding: 0 7rpx;
					}

					.arrow {
						width: 14rpx;
						height: 23rpx;
					}
				}
			}

			.product_list {
				padding: 30rpx 0 0 0;
				.product_item{
					margin-bottom: 30rpx;
				}
			}
		
			.cell{
				&_item{
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						height:25rpx;
						font-size:26rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height: 26rpx;
					}
					.right{
						height:20rpx;
						font-size:26rpx;
						line-height: 20rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						text:nth-child(2){
							margin-left: 10rpx;
						}
						&.red{
							color: #F22732;
						}
					}
				}
			}
		}
	
		.infos{
			width:710rpx;
			margin: 20rpx;
			background:rgba(255,255,255,1);
			padding: 30rpx;
			border-radius:10rpx;
			&_item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				.left{
					height:25rpx;
					font-size:26rpx;
					line-height: 25rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
				.right{
					height:20rpx;
					font-size:26rpx;
					line-height: 20rpx;
					font-family:DINPro;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
				&:nth-last-child(1){
					margin-bottom: 0;
				}
			}
		}
	}
</style>
