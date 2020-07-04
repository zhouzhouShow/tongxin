<template>
	<view class="seckill-box-components">
		<view class="s-com-img-box">
			<image class="s-com-img" :src="item.pic_urls[0]" mode="widthFix"></image>
			<image class="sale-over" v-if="item.stocksnum<=0" src="/static/sale-over.png" mode="widthFix"></image>
		</view>
		<view class="s-com-content clamp" :class="{'s-com-content-sole-over':item.stocksnum<=0 && item.limit_is_start ==1 && item.limit_is_end == 0}">
			<view class="s-com-title clamp">
				<image src="/static/icon/icon_seckill_sign.png" mode="widthFix"></image>
				<text class="clamp">{{item.title}}</text>
			</view>
			<view class="s-com-progress-box">
				<block v-if="item.limit_is_start ==1 && item.limit_is_end == 0">
					<progressView :status="item.stocksnum<=0?'soldout':'nomal'" :height="26" :percent="(item.limit_sale_num/item.limit_total_num).toFixed(2)*100"
					 soldOutText="已售罄" :nomalText="'已售'+item.limit_sale_num+'件'" percentColor="linear-gradient(right,#FF7D80 0%,#FF0A2C 100%)"></progressView>
				</block>
			</view>
			<view class="s-shop-total">仅限{{item.limit_total_num}}件</view>
			<view class="s-com-bot">
				<view class="s-com-price">
					<view class="s-com-price-light">
						<text>¥</text>
						<text>{{item.price_limit}}</text>
					</view>
					<text class="s-com-price-through">¥{{item.price_market}}</text>
				</view>
				<block v-if="item.limit_is_start ==1 && item.limit_is_end == 0">
					<view class="s-com-btn s-com-btn-sole-over" v-if="item.stocksnum<=0">
						马上抢
					</view>
					<view class="s-com-btn" v-else @click.stop="navToDetailPage(item.id)">
						马上抢
					</view>
				</block>
				<view v-if="item.limit_is_start == 0" class="s-com-btn s-com-btn-will-sold">
					即将开抢
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import progressView from '@/components/seckill-components/progress-view.vue'
	export default {
		components: {
			progressView
		},
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {

			};
		},
		methods: {
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/shopkeeper/product/product?id=${id}`
				});
			},
		}
	}
</script>

<style lang="scss">
	.seckill-box-components {
		display: flex;
		align-items: center;
		height: 230rpx;
		border-radius: 8rpx;
		overflow: hidden;
		background: #fff;
	}

	.s-com-img-box {
		width: 230rpx;
		height: 230rpx;
		flex-grow: 0;
		flex-shrink: 0;
		background: #eee;
		position: relative;
		overflow: hidden;

		.s-com-img {
			width: 230rpx;
			height: 230rpx;
		}
	}

	.s-com-content {
		flex-grow: 1;
		flex-shrink: 1;
		padding: 0 20rpx;
		height: 100%;
	}

	.s-com-title {
		height: 70rpx;
		display: flex;
		width: 100%;
		align-items: center;
		margin-bottom: 10rpx;
		color: $font-color-base;
		font-size: 28rpx;

		image {
			width: 37rpx;
			height: 37rpx;
			flex-grow: 0;
			flex-shrink: 0;
		}

		text {
			width: 100%;
			flex-grow: 1;
			flex-shrink: 1;
			padding-left: 8rpx;
		}
	}

	.s-com-progress-box {
		width: 200rpx;
		height: 26rpx;
		margin-bottom: 6rpx;
	}

	.s-shop-total {
		font-size: 24rpx;
		font-weight: 500;
		color: $font-color-light;
		margin-bottom: 12rpx;
	}

	.s-com-bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.s-com-price {
		color: $font-color-light;
		display: flex;
		align-items: center;
	}

	.s-com-price-light {
		margin-right: 6rpx;

		text:first-child {
			font-size: 26rpx;
		}

		text:last-child {
			font-size: 34rpx;
		}
	}

	.s-com-price-through {
		font-size: 24rpx;
		color: $font-color-disabled;
		text-decoration: line-through;
	}

	.s-com-btn {
		width: 135rpx;
		height: 54rpx;
		background: $gradient-dark-light;
		box-shadow: 0 5rpx 10rpx 0 $shadow-color-light;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #fff;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.s-com-btn-sole-over {
		background: #CBCCD0;
		box-shadow: none;
	}

	.s-com-btn-will-sold {
		background: #4EBA4B;
		font-size: 28rpx;
		color: #fff;
		box-shadow: 0 5rpx 10rpx 0 rgba(78, 186, 75, 0.2);
	}

	.s-com-content-sole-over {

		.s-shop-total,
		.s-com-price-light,
		.s-com-price-through {
			color: $font-clolr-ignore;
		}

		.s-com-btn {
			background: $font-clolr-ignore;
			box-shadow: 0 5rpx 10rpx 0 transparent;
		}
	}
</style>
