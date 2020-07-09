<template>
	<view class="submitOrder">
		<!-- <view class="top-bg"></view> -->
		<view class="content">
			<view class="area-box" @click="modifyAddress">
				<view class="user"><text >张小飞</text><text>19888883213</text></view>
				<view class="area-info">
					<image class="a-icon" src="../../static/images/icon/area_icon.png" mode=""></image>
					<text class="area">广东省广州市天河区华观路1993万科广场 A栋407A</text>
					<text class="iconfont iconyoujiantou"></text>
				</view>
			</view>
			<view class="good-box">
				<view class="brand-box">
					<view class="brand-info flex-align-center">
						<image class="b-img" src="../../static/images/good/d-like.png" mode=""></image>
						<text class="brand-name">芭芭拉</text>
					</view>
					<view class="good-box-list">
						<cartItem type='order' :item="item"></cartItem>
						<cartItem type='order' :item="item"></cartItem>
					</view>
				</view>
				<view class="expressage flex-align-center">
					<text class="label">配送方式</text>
					<text >普通配送</text>
					<text class="e-money">快递 ￥6.00</text>
					<image class="arrow" src="../../static/images/seeding/icon_arrow-right-grey.png" mode=""></image>
				</view>
				<view class="tips1">工作日/节假日均可送货</view>
				<view class="expressage flex-align-center">
					<text class="label">优惠券</text>
					<text >省5元：69-5</text>
					<text class="r-money">- ￥6.00</text>
					<image class="arrow" src="../../static/images/seeding/icon_arrow-right-grey.png" mode=""></image>
				</view>
				<view class="desc flex-align-center">
					<text class="label">订单备注</text>
					<input type="text" v-model="desc"  placeholder="选填，请先和商家协商一致">
				</view>
			</view>
			<view class="price-detail-box">
				<view class="item">
					<span>商品金额：</span>
			
					<span>￥{{totalPrice}}</span>
				</view>
				<view class="item">
					<span>运费：</span>
					<span>¥6</span>
				</view>
				<!-- <view class="item" v-if="choosedCoupon">
					<span>优惠券抵扣：</span>
					<span>-￥{{choosedCoupon.money}}</span>
				</view> -->
			</view>
		</view>
		<view class="fixed-bottom">
			
			<view class="total">
				<text>共2件</text>
				<text>合计:</text>
				<text class="p-box"><text class="p-icon">¥</text>8899</text>
			</view>
			<view class="submit">
				提交订单
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
				desc:'',
				totalPrice:1123213,
			};
		},
		methods:{
			modifyAddress() {
				uni.navigateTo({
					url: "/pages/center/address/address?isShop=1&cart_ids=" + this.shopCarIds
				});
			},
		}
	}
</script>

<style lang="scss" scoped>

	.submitOrder{
		min-height: 100vh;
		background: #f3f3f3;
		padding-bottom: 118rpx;
		background: linear-gradient(to bottom, #DF464E 0%, #df464e 5% ,#f3f3f3 30%, #f3f3f3 100%);
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
			padding-top: 20rpx;
			.price-detail-box {
				padding: 30rpx;
				font-size:26rpx;
				font-weight:400;
				color:rgba(51,51,51,1);
				border-radius:10rpx;
				background: #fff;
				.item:not(:last-of-type){
					margin-bottom: 30rpx;
				}
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					span:nth-child(2) {
						color: #333;
					}
				}
			}
			.good-box{
				padding: 35rpx 30rpx 40rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				margin-bottom: 20rpx;
				.brand-info {
					margin-left: 10rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 30rpx;
					.b-img {
						width: 40rpx;
						height: 40rpx;
						margin-right:6rpx;
					}
				}
				.desc{
					font-weight:400;
					font-size:26rpx;
					margin-top: 40rpx;
					.label{
						color:#333333;
					}
					input{
						flex: 1;
						 margin-left:40rpx;
						 font-size:26rpx;
					}
				}
				.expressage{
					font-weight:400;
					font-size:26rpx;
					.label{
						color:#333333;
					}
					text:nth-child(2){
						color: #999999;
						margin-left:40rpx;
					}
					.e-money{
						color: #333;
						margin-left:auto;
					}
					.r-money{
						color: #F22732;
						margin-left:auto;
					}
					.arrow{
						margin-left: 15rpx;
						width:14rpx;
						height:23rpx;
					}
				}
				.tips1{
					text-align: right;
					padding-right: 30rpx;
					font-size:26rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin:10rpx 0 38rpx ;
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
	.fixed-bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
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
