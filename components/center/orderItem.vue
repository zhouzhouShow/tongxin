<template>
	<view class="order-item" >
		<view class="order-title flex-align-center">
			<image class="u-img" :src="detail.userinfo.avatar" mode=""></image>
			<view class="u-name">
				<text>{{detail.userinfo.nickname}}</text>
				<text>订单号: {{detail.order_code}}</text>
			</view>
			<block>
				<text class="state" v-if="detail.final_flag==1">待付款</text>
				<text  class="state" v-if="detail.final_flag==2">
					{{ detail.ship_status == 3? '备货中' : '待发货' }}
				</text>
				<text class="state" v-if="detail.final_flag==3">
					待收货
				</text>
				<text class="state" v-if="detail.final_flag==4">已完成</text>
				<text class="state" v-if="detail.final_flag==5">已取消</text>
				<text class="state" v-if="detail.final_flag==6">
					{{detail.refund_status == 0 ? '退款审核中' : detail.refund_status == 1 ? '已退款' : '退款失败'  }}
				</text>
				<text class="state" v-if="detail.final_flag==8">待付尾款</text>
			</block>
		
		</view>
		<view class="brand-box">
			<view class="b-item" v-for="(el,num) in detail.products_list" :key="el.id">
				<view class="brand-info flex-align-center">
					<image class="b-img" :src="el.brandinfo.brand_logo[0]" mode="scaleToFill"></image>
					<text class="brand-name">{{el.brandinfo.brand_name}}</text>
					<text class="icon-arrow iconfont iconyoujiantou"></text>
				</view>
				<view v-for="(e,n) in el.goodlist" :key="n" class="b-good">
					<productItem @handleToRefund="handleToRefund" :showRefundBtn="detail.final_flag==4?true:false" :info="e"></productItem>
				</view>
			</view>
		</view>
		<view class="total-box">
			<text>总价 ¥{{detail.price_sum}}</text>
			<text>应付款 ¥{{detail.last_money}}</text>
		</view>
		<view class="btn-box">
			<text @click="toDetail">查看详情</text>
			<text @click="toExpress" v-if="detail.final_flag==3 || detail.final_flag==4">查看物流</text>
			<text @click="toPay" v-if="detail.final_flag==1" class="redB">去付款</text>
			<text @click="toReceipt" v-if="detail.final_flag==3" class="redB">确认收货</text>
			<text @click="addToCar" v-if="detail.final_flag==5" class="redB">加入购物车</text>
			<text @click="toDelete" v-if="detail.final_flag==4 || detail.final_flag==5">删除订单</text>
		</view>
	</view>
</template>

<script>
	import productItem from '@/components/productItem'
	export default {
		components:{
			productItem
		},
		props:['detail'],
		data() {
			return {

			};
		},
		methods:{
			toDetail() {
				this.$emit('toDetail', this.detail.id)
			},
			toExpress(){
				this.$emit('toExpress',this.detail.id)
			},
			toPay(){
				this.$emit('toPay',this.detail.id)
			},
			toReceipt(){
				this.$emit('toReceipt',this.detail.id)
			},
			addToCar(){
				this.$emit('addToCar',this.detail.id)
			},
			toDelete(){
				this.$emit('toDelete',this.detail.id)
			},
			handleToRefund(info){
				this.$emit('handleToRefund',info)
			}
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

				.b-good {
					margin-bottom: 30rpx;
				}

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
				line-height: 50rpx;
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
				border: none;
			}
		}
	}
</style>
