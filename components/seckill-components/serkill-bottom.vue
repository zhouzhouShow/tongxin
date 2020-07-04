<template>
	<!-- 底部导航 -->
	<view class="seckill-bottom-btn">
		<view :class="{'s-bottom-btn-ac':tabIdx == 0}" @click.stop="navToLastSeckill">
			<image v-if="tabIdx == 0" src="/static/icon/icon_seckill_light.png" mode="widthFix"></image>
			<image v-else src="/static/icon/icon_seckill_dark.png" mode="widthFix"></image>
			<text>限时秒杀</text>
		</view>
		<view :class="{'s-bottom-btn-ac':tabIdx == 1}" @click.stop="navToLastRob">
			<image v-if="tabIdx == 1" src="/static/icon/icon_lastrob_light.png" mode="widthFix"></image>
			<image v-else src="/static/icon/icon_lastrob_dark.png" mode="widthFix"></image>
			<text>最后疯抢</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabIdx: {
				type: Number
			}
		},
		data() {
			return {

			};
		},
		methods:{
			navToLastSeckill(){
				if(this.tabIdx != 0){
					var page = getCurrentPages();
					var perpage = page[page.length - 2];
					if(perpage.route == 'pages/shopkeeper/seckill-page/seckill-page'){
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.navigateTo({
							url:`/pages/shopkeeper/seckill-page/seckill-page`
						})
					}
				}
			},
			navToLastRob(){
				if(this.tabIdx != 1){
					var page = getCurrentPages();
					var perpage = page[page.length - 2];
					if(perpage.route == 'pages/shopkeeper/seckill-page/last-rob'){
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.navigateTo({
							url:`/pages/shopkeeper/seckill-page/last-rob`
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.seckill-bottom-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 98rpx;
		box-shadow:0 -2rpx 8rpx 0 rgba(27,29,28,0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		background:#fff;
		view{
			width: 50%;
			height: 100%;
			font-size: 30rpx;
			font-weight:500;
			color: $font-color-disabled;
			font-family:PingFang SC;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 12rpx;
			}
		}
		.s-bottom-btn-ac{
			color: $font-color-light;
			font-weight:bold;
		}
	}
</style>
