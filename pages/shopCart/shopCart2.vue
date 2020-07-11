<template>
	<view class="cart">
		<view class="good-list">
			<view class="good-brand-item">
				<view class="title-state-box flex-align-center">
					<checkbox color="#17B948" :checked="isAll" />
					<view class="brand-info flex-align-center">
						<image class="b-img" src="../../static/images/good/d-like.png" mode=""></image>
						<text class="brand-name">芭芭拉</text>
						<text class="icon-arrow iconfont iconyoujiantou"></text>
					</view>
					<image class="delete" src="../../static/images/icon/icon_delete.png" mode=""></image>
				</view>
				<view class="good-box">
					<cartItem :item="item"></cartItem>
					<cartItem :item="item"></cartItem>
				</view>
			</view>

		</view>
		<view class="fixed-bottom">
			<label class="radio">
				<checkbox color="#17B948" :checked="isAll" />
				<text>全选</text>
			</label>
			<view class="total">
				<text>不含运费</text>
				<text>合计:</text>
				<text class="p-box"><text class="p-icon">¥</text>8899</text>
			</view>
			<view class="submit">
				结算
			</view>
		</view>
		<comfooter :tabIdx="2" :centerAngle="payAngle"></comfooter>
	</view>
</template>

<script>
	import comfooter from '@/components/com-footer.vue'
	import cartItem from '@/components/shopCart/cartItem'
	export default {
		components: {
			comfooter,
			cartItem
		},
		data() {
			return {
				isAll: false,
				item:{
					
				}
			};
		}
	}
</script>

<style lang="scss" scoped>

	.good-list {
		padding: 0 20rpx;

		.good-brand-item {
			background: #fff;
			padding:30rpx 20rpx 0;
			border-radius:10rpx;
			margin-bottom: 20rpx;
			.title-state-box {
				// padding: 0 20rpx;
				margin-bottom: 30rpx;
				.brand-info {
					margin-left: 10rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

					.b-img {
						width: 40rpx;
						height: 40rpx;
						margin-right:6rpx;
					}

					.icon-arrow {
						color: #d9d9d9;
						font-size: 40rpx;
					}
				}
				.delete{
					margin-left: auto;
					width: 29rpx;
					height: 32rpx;
				}
			}
			.good-box{
				.item:not(:last-of-type){
				
				}
				
			}
		}
	}


	.cart {
		background: #f3f3f3;
		min-height: 100vh;
	}

	.fixed-bottom {
		position: fixed;
		width: 100%;
		bottom: 100rpx;
		height: 98rpx;
		left: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);

		.radio {
			margin-left: 40rpx;

			text {
				margin-left: 10rpx;
			}
		}

		.total {
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 42px;
			margin-left: auto;

			text:nth-child(1) {
				font-size: 24rpx;
			}

			text:nth-child(2) {
				font-size: 28rpx;
				margin-left: 10rpx;
			}

			.p-box {
				margin-left: 20rpx;
				color: #F22732;
				font-size: 40rpx;

				.p-icon {
					font-size: 24rpx;
				}
			}
		}

		.submit {
			margin-right: 20rpx;
			margin-left: 30rpx;
			width: 210rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
			border-radius: 40rpx;
		}
	}
</style>
