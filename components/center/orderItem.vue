<template>
	<view class="order-item" >
		<view class="order-title flex-align-center">
			<image class="u-img" src="@/static/images/center/icon_avatar.png" mode=""></image>
			<view class="u-name">
				<text>妮子大姨</text>
				<text>订单号: 234324123123</text>
			</view>
			<block>
				<text class="state" v-if="detail.final_flag==1 || true">待付款</text>
				<text  class="state" v-if="detail.final_flag==2">
					{{ detail.ship_status == 3? '备货中' : '待发货' }}
				</text>
				<text class="state" v-if="detail.final_flag==3">
					待收货
				</text>
				<text class="state" v-if="detail.final_flag==4">已完成</text>
				<text class="state" v-if="detail.final_flag==5">已取消</text>
				<!-- <text v-if="detail.final_flag==6">已退货</text> -->
				<text class="state" v-if="detail.final_flag==6">
					{{detail.refund_status == 0 ? '退款审核中' : detail.refund_status == 1 ? '已退款' : '退款失败'  }}
				</text>
				<text class="state" v-if="detail.final_flag==8">待付尾款</text>
			</block>
		
		</view>
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
		<view class="total-box">
			<text>总价 ¥88</text>
			<text>应付款 ¥88</text>
		</view>
		<view class="btn-box">
		<!-- 	<div v-if="detail.final_flag==1" @click.stop="changeOrderStatus(detail.id,2)">
					<span>取消订单</span>
				</div>
				
				<div @click.stop="toDetail(detail.id)">
					<span>查看详情</span>
				</div>
				<div v-if="detail.final_flag == 2 && detail.ship_status != 3" @click.stop="changeOrderStatus(detail.id,4)">
					<span>退款</span>
				</div>
				<div v-if="detail.final_flag==3 && detail.receipt==1" @click.stop.prevent="changeOrderStatus(detail.id,3)" class="orderLightBtn">
					<span>确认收货</span>
				</div>
				<div class="orderLightBtn" v-if="detail.final_flag==1 && detail.pay_type!=4" @click.stop="toPay(detail.id)">
					<span>付款</span>
				</div>
				<div class="orderLightBtn" v-if="detail.final_flag==8 && detail.pay_type==4" @click.stop="toPay(detail.id)">
					<span>付尾款</span>
				</div> -->
			<text>查看详情</text>
			<text class="redB">去付款</text>
		</view>
	</view>
</template>

<script>
	import cartItem from '@/components/shopCart/cartItem'
	export default {
		components:{
			cartItem
		},
		props:['detail'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		padding: 30rpx 20rpx 20rpx;
		border-radius: 10rpx;
		margin-bottom: 16rpx;
		background: #fff;

		.order-title {
			font-size: 26rpx;
			font-weight: 400;
			margin-bottom: 30rpx;
			color: rgba(102, 102, 102, 1);

			.u-img {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
			}

			.u-name {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}

			.state {
				margin-left: auto;
				font-size: 28rpx;
				color: #FFB44F;
			}
		}

		.brand-box {
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

		.total-box {
			font-size: 28rpx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			text-align: right;
			margin-bottom: 50rpx;

			text:nth-child(1) {
				margin-right: 30rpx;
			}

			text:nth-child(2) {
				color: #333;
			}
		}

		.btn-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			text {
				display: inline-block;
				width: 150rpx;
				height: 50rpx;
				color: #666666;
				font-size: 28rpx;
				font-weight: 400;
				text-align: center;
				line-height: 50rpx;
				border: 1rpx solid rgba(221, 221, 221, 1);
				border-radius: 25rpx;
				margin-left: 20rpx;
			}

			.redB {
				background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
				color: #fff;
			}
		}
	}
</style>
