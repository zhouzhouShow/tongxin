<template>
	<view class="backTop" @click="backTop" v-show="isBackTop">
		<image src="../static/images/icon/backTop.png" class="backBtn"></image>
	</view>
</template>

<script>
	export default {
		props:['isBackTop'],
		data() {
			return {
				
			};
		},
		methods:{
			backTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:600
				})
			},
		}
	}
</script>

<style lang="scss">
.backTop{
		position: fixed;
		bottom:150rpx;
		right:20rpx;
		width:72rpx;
		height:72rpx;
		z-index: 9999;
		background: #fff;
		border-radius: 50%;
		line-height: 80rpx;
		text-align: center;
		>image{
			width:100%;
			height: 100%;
		}
	}
</style>
