<template>
	<!-- 秒杀楼层 -->
	<view class="seckill-section-components" @click.stop="navToSeckill()" v-if="list.length>0">
		<view class="s-header">
			<image :class="'s-img-'+type" :src="'/static/images/secskill-img-'+type+'.png'" mode="widthFix"></image>
			<view class="s-timer">
				<view v-for="(item,index) in time" :key="item.timestr" v-if="index<3" :class="item.isdoing == 1?'s-timer-now-'+type:''">
					<text>{{item.time_slot}}</text>
					<text>{{item.isdoing == 0?'即将开抢':'抢购中'}}</text>
				</view>
			</view>
			<image class="right-img" :src="'/static/images/icon/icon_right_'+type+'.png'" mode=""></image>
		</view>
		<view class="floor-list">
			<view v-for="(item, index) in list" :key="index" class="floor-item">
				<image :src="item.pic_urls[0]" mode="aspectFill"></image>
				<text class="title ellipsis">{{item.title}}</text>
				<view class="s-price">
					<text class="s-price-tag" :class="'s-price-tag-'+type">秒杀价</text>
					<view class="price">
						<text class="price-symbol">￥</text>
						<text class="price-integer">{{item.price | numForm(item)}}</text>
						<!-- <text class="price-decimal">{{item.price | priceDeal('decimal')}}</text> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
			numForm(price, item) {
				if (price) {
					if (item.goods_type == 1) {
						return (price / item.sku_num).toFixed(2)
					} else {
						return price
					}
				}
			}
		},
		props: {
			seckillId: {
				type: String,
				default: '',
			},
			type: {
				type: String,
				default: 'common', //common/普通用户 ,member/会员
			},
			time: {
				type: Array,
				default () {
					return []
				}
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {}
		},
		methods: {
			navToSeckill() {
				uni.navigateTo({
					url: `/pages/shopkeeper/seckill-page/seckill-page?id=${this.seckillId}&type=${this.type}`,
				})
			}
		},
	}
</script>

<style lang="scss">
	.seckill-section-components {
		padding: 4upx 0 24upx;
		background: #fff;
		border-top: 20rpx solid #F3F3F3;

		.s-header {
			display: flex;
			align-items: center;
			height: 110rpx;
			line-height: 1;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #eee;
			padding: 0 30rpx;

			.s-timer {
				display: flex;
				flex-shrink: 1;
				justify-content: flex-end;
				flex-grow: 1;
				padding: 0 10rpx;

				view {
					display: flex;
					width: 126rpx;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #666666;
					font-size: 22rpx;

					text:first-child {
						font-weight: bold;
						font-size: 30rpx;
						line-height: 42rpx;
					}
				}

				.s-timer-now-common {
					color: #F23030;
					background: linear-gradient(90deg, rgba(251, 9, 9, 1) 0%, rgba(255, 103, 73, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.s-timer-now-member {
					color: #F23030;
					background: linear-gradient(90deg, rgba(174, 103, 230, 1) 0%, rgba(100, 129, 232, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.s-img-common {
				width: 190upx;
				height: 34upx;
			}

			.s-img-member {
				width: 250upx;
				height: 34upx;
			}

			.right-img {
				width: 38rpx;
				height: 38rpx;
			}
		}


		.floor-list {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			padding: 0 30rpx;
		}

		.floor-item {
			width: 220rpx;
			margin-right: 20upx;
			font-size: 26rpx;
			color: #333333;
			font-weight: 400;
			line-height: 1.8;

			image {
				width: 220upx;
				height: 220upx;
				border-radius: 16upx;
			}

			.s-price {
				display: flex;
				align-items: center;
			}

			.s-price-tag {
				font-size: 16rpx;
				height: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;

				&-common {
					background: linear-gradient(90deg, rgba(255, 103, 72, 1) 0%, rgba(253, 29, 23, 1) 100%);
					;
				}

				&-member {
					background: linear-gradient(90deg, rgba(174, 103, 230, 1), rgba(100, 129, 232, 1));
				}

				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 6rpx;
				border-radius: 4rpx;
				color: #fff;
				margin-right: 6rpx;
			}

			.price {
				font-weight: 500;
				color: #F23030;

				&-symbol {
					font-size: 25rpx;
				}

				&-integer {
					font-size: 30rpx;
					font-weight: bold;
				}

				&-decimal {
					font-size: 22rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>
