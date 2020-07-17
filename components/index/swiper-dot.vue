<template>
	<view class="dots"  style="background: url(https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200717/7c03ba2b5f42bc732fe31c15863dc40a.png) no-repeat;background-size: 100% 100%;">
		<text>{{current + 1}}</text>
		<text>/</text>
		<text>{{length}}</text>
	</view>
</template>

<script>
	export default {
		props:['current','length'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.dots{
	position: absolute;
	width:83rpx;
	height:38rpx;
	padding:0 5rpx;
	right: 20rpx;
	bottom: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	text{
		height:22rpx;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height: 22rpx;
		&:nth-child(2){
			font-size: 14rpx;
		}
	}
}
</style>
