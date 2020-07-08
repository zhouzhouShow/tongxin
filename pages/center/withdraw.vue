<template>
	<view class="withdraw">
		<view class="total">
			<text>当前金额</text>
			<text>{{total}}</text>
		</view>
		<view class="cash">
			<view class="title">
				<text>提现金额</text>
			</view>
			<view class="form">
				<input type="digit" placeholder="请输入提现金额" v-model="withdrawNum" />
			</view>
		</view>
		<view @click="handleWithdraw" class="btn">
			<button type="default">提现</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "withdraw",
		data() {
			return {
				total: 99.99,
				withdrawNum: ''
			};
		},
		methods: {
			handleWithdraw() {
				if (!this.withdrawNum) {
					uni.showToast({
						title: '请输入要提现的金额',
						icon: 'none',
						duration: 1500
					})
				} else if (this.withdrawNum > this.total) {
					uni.showToast({
						title: '提现金额不能超过余额',
						icon: 'none',
						duration: 1500
					})
				} else {

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdraw {
		min-height: 100%;
		background-color: #F3F3F3;
		overflow: hidden;
		view {
			box-sizing: border-box;
		}

		.total {
			margin-top: 20rpx;
			background-color: #fff;
			height: 85rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;

			text {
				height: 26rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 26rpx;

				&:nth-child(2) {
					margin-left: 40rpx;
					color: #FFB44F;
				}
			}
		}

		.cash {
			margin-top: 20rpx;
			padding: 30rpx 30rpx 35rpx 30rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				height: 26rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 26rpx;
			}

			.form {
				height: 76rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				padding-top: 50rpx;
			}
		}

		.btn {
			position: fixed;
			bottom: 0;
			padding: 30rpx;

			button {
				width: 690rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(254, 254, 254, 1);
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
</style>
