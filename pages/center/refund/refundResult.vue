<template>
	<view class="refund_result">
		<view class="icon">
			<image src="../../../static/images/center/icon_success.png" mode="scaleToFill"></image>
		</view>
		<view class="type">
			<text>退款申请成功</text>
		</view>
		<view class="tip">
			<text>预计<text class="time">23小时59分</text>内为您审核，请耐心等待，保持手机畅通</text>
		</view>
		<view class="btn">
			<button @click="handleSure" type="default">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "refundResult",
		data() {
			return {

			};
		},
		methods:{
			handleSure(){
				wx.redirectTo({
					url:'./refundOrder'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.refund_result {
		min-height: 100%;
		background-color: #F3F3F3;
		overflow: hidden;
		padding-top: 142rpx;

		.icon {
			width: 95rpx;
			height: 85rpx;
			margin: 0 auto;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.type {
			height: 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 30rpx;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;
		}

		.tip {
			height: 26rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 40rpx;
			display: flex;
			justify-content: center;

			text {
				text {
					color: #333333;
				}
			}
		}
		.btn{
			margin: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			button{
				width:210rpx;
				height:80rpx;
				background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
				border-radius:40rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height:80rpx;
				text-align: center;
			}
		}
	}
</style>
