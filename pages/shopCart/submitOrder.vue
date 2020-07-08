<template>
	<view class="submitOrder">
		<view class="top-bg"></view>
		<view class="content">
			<view class="area-box">
				<view class="user"><text >张小飞</text><text>19888883213</text></view>
				<view class="area-info">
					<image class="a-icon" src="../../static/images/center/icon_address.png" mode=""></image>
					<text class="area">广东省广州市天河区华观路1993万科广场 A栋407A</text>
					<text class="iconfont iconyoujiantou"></text>
				</view>
			</view>
			<view class="good-box">
				<view class="brand-box">
					<view class="brand-info flex-align-center">
						<image class="b-img" src="../../static/images/good/d-like.png" mode=""></image>
						<text class="brand-name">芭芭拉</text>
						<text class="icon-arrow iconfont iconyoujiantou"></text>
					</view>
					<view class="good-box">
						<cartItem type='order' :item="item"></cartItem>
						<cartItem type='order' :item="item"></cartItem>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cartItem from '@/components/shopCart/cartItem.vue'
	export default {
		components:{
			cartItem
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>

	.submitOrder{
		padding-top: 20rpx;
		.top-bg{
			position: absolute;
			left:0;
			top: 0;
			z-index: -1;
			width:100%;
			height:478rpx;
			background:linear-gradient(0deg,rgba(255,255,255,0) 0%, rgba(223,70,78,1) 100%);
		}
		.content{
			padding: 0 20rpx ;
			.good-box{
				padding: 35rpx 0 40rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
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
				
					
				}
			}
			.area-box{
				background: #fff;
				padding: 40rpx 30rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				font-size:28rpx;
				font-weight:400;
				color:rgba(102,102,102,1);
				margin-bottom: 20rpx;
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
		}
	}
</style>
