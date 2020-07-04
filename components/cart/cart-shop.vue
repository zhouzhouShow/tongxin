<template>
	<view class="cart-shop-container">
		<view class="cart-shop-left">
			<slot></slot>
		</view>
		<view class="cart-shop-right clamp-two" @click.stop="navToDetailPage(item.goods_id)">
			<view class="c-s-img">
				<image :src="item.goodsitemimg" mode="aspectFill"></image>
			</view>
			<view class="c-s-content clamp-two">
				<text class="c-s-title clamp-two">{{item.title}}</text>
				<view class="c-s-code">
					<text>款号：{{item.code}}</text>
					<view class="c-s-price" v-if="status == 'onSale'">
						<text>¥{{Number(item.price)}}</text>
						<text>.00/件</text>
					</view>
				</view>
				<!-- //有货显示标签  无货显示尺码和颜色 -->
				<view class="c-s-tip" v-if="status == 'onSale'">
					<view>
						<text v-if="item.activity!=''">{{item.activity}}</text>
					</view>
					<text>¥{{item.price_market}}/件</text>
				</view>
				<text class="c-s-spec" v-if="status == 'soleOut'">{{item.color}}  {{item.size}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			status:{
				type:String,
				default:'onSale'  //onSale   soleOut
			},
			item:Object
		},
		data() {
			return {

			};
		},
		methods:{
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/shopkeeper/product/product?id=${id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.cart-shop-container {
		height: 248rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.cart-shop-left{
		flex: none;
		width: 88rpx;
		height: 242rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
	}
	.cart-shop-right{
		flex: auto;
		height: 100%;
		display: flex;
		padding-right: 30rpx;
		box-sizing: border-box;
		align-items: center;
		.c-s-img{
			flex: none;
			width: 138rpx;
			height: 184rpx;
			overflow:hidden;
			background:#eee;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.c-s-content{
			flex: auto;
			padding-left: 20rpx;
			padding-top: 22rpx;
			height: 100%;
			box-sizing: border-box;
			.c-s-title{
				font-size: 28rpx;
				color: $font-color-base;
				font-weight:500;
				line-height: 38rpx;
				height: 76rpx;
			}
			.c-s-code{
				 display: flex;
				 align-items: center;
				 justify-content: space-between;
				 margin-top: 16rpx;
			}
			.c-s-code>text{
				font-size: 26rpx;
				color: $font-color-disabled;
			}
			.c-s-price{
				color: $font-color-light;
				font-size:24rpx;
				font-weight:bold;
				text:first-child{
					font-size: 30rpx;
				}
			}
			.c-s-tip{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24rpx;
				margin-top: 28rpx;
				color: $font-color-disabled;
				view{
					text{
						font-size:22rpx;
						line-height: 22rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:$font-color-light;
						height: 34rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 12rpx;
						border:1px solid $base-color;
						border-radius: 2rpx;
					}
				}
				&>text{
					text-decoration:line-through
				}
			}
			.c-s-spec{
				font-size: 24rpx;
				margin-top: 16rpx;
				color: $font-color-disabled;
			}
		}
	}
</style>
