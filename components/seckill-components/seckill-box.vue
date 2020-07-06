<template>
	<view class="seckill-box-components">
		<view class="s-com-img-box">
			<image class="s-com-img" :src="item.pic_urls[0]" mode="widthFix"></image>
			<image class="sale-over" v-if="item.stocksnum<=0" src="/static/images/sale-over.png" mode="widthFix"></image>
		</view>
		<view class="s-com-content ellipsis" :class="{'s-com-content-sole-over':item.stocksnum<=0 && this.isStart != 0}">
			<view class="s-com-title ellipsis">
				<image :src="'/static/images/icon/icon_seckill_sign_'+type+'.png'" mode="widthFix"></image>
				<text class="ellipsis">{{item.title}}</text>
			</view>
			<view class="s-com-progress-box">
				<block v-if="this.isStart != 0">
					<progressView :status="item.stocksnum<=0?'soldout':'nomal'" :height="26" :percent="(item.limit_sale_num/item.limit_total_num).toFixed(2)*100"
					 soldOutText="已售罄" :nomalText="'已售'+item.limit_sale_num+(Number(item.goods_type) == 1? '手' :'件')" :nomalBackground="type == 'common'?'#FFCBCE':'#D7DCFD'" :percentColor="type == 'common'?'linear-gradient(right,#FF7D80 0%,#FF0A2C 100%)':'linear-gradient(90deg,rgba(174,103,230,1),rgba(100,129,232,1));'"></progressView>
				</block>
			</view>
			<view class="s-shop-total">仅限{{item.limit_total_num}}{{Number(item.goods_type) == 1? '手' :'件'}}</view>
			<view class="s-com-bot">
				<view class="s-com-price">
					<view class="s-com-price-light">
						<text>¥</text>
						<text>{{item.price | numForm(item)}}</text>
						<!-- <text>{{item.price | numForm('decimal')}}</text> -->
					</view>
					<text class="s-com-price-through">¥{{item.price_market | numForm(item)}}</text>
				</view>
				<block v-if="isStart != 0">
					<view class="s-com-btn s-com-btn-sole-over" v-if="item.stocksnum<=0">
						马上抢购
					</view>
					<view class="s-com-btn" v-else @click.stop="navToDetailPage(item)">
						马上抢购
					</view>
				</block>
				<view v-if="isStart == 0" class="s-com-btn s-com-btn-will-sold">
					即将开抢
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import progressView from '@/components/seckill-components/progress-view.vue'
	export default {
		filters: {
			priceDeal(price, type) {
				var arr = price.split('.');
				//integer  整数部分  decimal 小数部分
				if (type == 'integer') {
					return arr[0];
				} else {
					return '.' + arr[1];
				}
			},
			numForm(price,item){
				if(price){
					if(item.goods_type == 1){
						return (price/item.sku_num).toFixed(2)
					}else{
						return price
					}
				}
			}
		},
		components: {
			progressView
		},
		props: {
			item: {
				type: Object
			},
			type: {
				type: String,
				default: 'common', //common/普通用户 ,member/会员
			},
			isStart:{
				type: [Number,String],
				default:0
			}
		},
		data() {
			return {

			};
		},
		methods: {
			navToDetailPage(item) {
				var id=item.goods_id||"";
				var sku=item.sku||"";
				uni.navigateTo({
				  url:'/pages/good/goodDetail?id='+id+'&sku='+sku+'&type='+this.type,
				})
			},
		}
	}
</script>

<style lang="scss">
	.seckill-box-components {
		display: flex;
		align-items: center;
		height: 230rpx;
		overflow: hidden;
		background: #fff;
		box-shadow: 0px 0px 20rpx 0rpx rgba(59, 68, 87, 0.1);
		border-radius: 16rpx;
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
		color: #666666;
		font-size: 28rpx;

		image {
			width: 56rpx;
			height: 28rpx;
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
		color: #F23030;
		margin-bottom: 12rpx;
	}

	.s-com-bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.s-com-price {
		color: #F23030;
		display: flex;
		align-items: center;
	}

	.s-com-price-light {
		margin-right: 16rpx;

		text:first-child {
			font-size: 22rpx;
		}

		text:nth-child(2) {
			font-size: 34rpx;
			font-weight: bold;
		}

		text:last-child {
			font-size: 30rpx;
			font-weight: bold;
		}
	}

	.s-com-price-through {
		font-size: 24rpx;
		color: #999999;
		text-decoration: line-through;
	}

	.s-com-btn {
		width: 135rpx;
		height: 54rpx;
		background: linear-gradient(right, #FF0528 0%, #FF7D80 100%);
		;
		box-shadow: 0 5rpx 10rpx 0 rgba(255, 9, 44, 0.2);
		;
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
			color: #CBCCD0;
		}

		.s-com-btn {
			background: #CBCCD0;
			box-shadow: 0 5rpx 10rpx 0 transparent;
		}
	}
</style>
