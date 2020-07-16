<template>
	<div v-if="item">
		<!-- 秒杀抢购item -->
		<block v-if="itemtype=='timeLimite'">
			<view class="item2">
				<view class="g-img-box">
					<image class="g-img" :src="item.goods_images[0]"
					 mode=""></image>
					<view class="time">剩余:{{formateDeadline}}</view>
				</view>
				<view class="g-info">
					<p class="g-name">{{item.goods_title}}</p>
					<p class="tips-text">抢购价</p>
					<p class="pirce-box" style="margin-top:0;">
						<span class="n-price">
							<span class="p-icon">¥</span>{{item.price_last}}
						</span>
						<span class="o-pirce">¥{{item.price_market}}</span>
						<view class="buy" @clickl.stop="buy">去购买</view>
					</p>
				</view>
			</view>
		</block>
		<!-- 会场item -->
		<block v-else-if="itemtype=='sessionItem'">
			<view class="item" style="margin-bottom: 0;">
				<view class="g-img-box">
					<image class="g-img" :src="item.goods_images[0]"
					 mode=""></image>
				</view>
				<view class="g-info">
					<p class="g-name">{{item.goods_title}}</p>
					<p class="discount">{{item.discount}}折</p>
					<p class="pirce-box">
						<span class="n-price">
							<span class="p-icon">¥</span>{{item.price_last}}
						</span>
						<span class="o-pirce">¥{{item.price_market}}</span>
					
					</p>
					<p class="sold-num flex-align-center">
						<span>已售: {{item.salenum}}</span>
							<view class="buy" @clickl.stop="buy">立即抢购</view>
					</p>
				</view>
			</view>
		</block>
		<!-- 其他默认item -->
		<block v-else>
			<view class="item">
				<view class="g-img-box">
					<image class="g-img" :src="item.goods_images[0]"
					 mode="aspectFill"></image>
				</view>
				<view class="g-info">
					<p class="g-name">{{item.brandinfo.brand_name}}</p>
					<p class="g-desc"> {{item.goods_title}}</p>
					<p class="pirce-box">
						<span class="n-price">
							<span class="p-icon">¥</span>{{item.price_sale}}
						</span>
						<span class="o-pirce">¥{{item.price_market}}</span>
						<view class="buy" @clickl.stop="buy">立即抢购</view>
					</p>
				</view>
			</view>
		</block>
	</div>
</template>

<script>
	export default {
		name: "goodsItem",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				},
			},

			itemtype: {
				type: String,
				default: 'default',
			},
			myIndex: {
				type: Number,
				default: 0,
			}
		},
		computed: {
			formateDeadline() {
			  let leftTime = this.deadline * 1000; //计算剩余的毫秒数
			  let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
			  let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
			  let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
			  let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
			  days = this.checkTime(days);
			  hours = this.checkTime(hours);
			  minutes = this.checkTime(minutes);
			  seconds = this.checkTime(seconds);
			  return days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
			},
		},
		data() {
			return {
				detail: {},
				timer:null,
				deadline: this.$props.item.limitgoods.deadline,
			}
		},
		methods: {
			
			ellipsis() {
				this.$emit('fhChangeEllipsis', this.myIndex)
			},
			changColor(index2, item, num) {
				this.$emit('fhChangeColor', this.myIndex, index2, item, num)
			},
			// 份货方法
			getOnePrice(val, v) {
				return (val * v).toFixed(2)
			},
			// 挑款方法
			checkTime(number) { //将0-9的数字前面加上0，例1变为01
				if (number < 10) {
					number = "0" + number;
				}
				return number;
			},
			/* 抢购事件 */
			qianggouEvent() {
				// this.$emit('qianggouEvent')
				console.log('qianggouEvent')
			},
			/* 商品详情跳转 */
			toGoodsDetail(item) {
				var id = item.id || "";
				var sku = item.sku || "";
				wx.navigateTo({
					url: '/pages/good/goodDetail?id=' + id + '&sku=' + sku,
				})
			},

		},
		mounted() {
			/* 倒计时 */
			if (this.itemtype=="timeLimite" && this.deadline) {
				this.timer = setInterval(() => {
					this.deadline = this.deadline - 1
					if (this.deadline <= 0) {
						clearInterval(this.timer)
						this.timer = null
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.item {
		background: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		display: flex;
		margin-bottom: 10rpx;

		.g-img-box {
			position: relative;
			width: 219rpx;
			height: 219rpx;
			margin-right: 20rpx;

			.g-img {
				width: 100%;
				height: 100%;
			}

			.time {
				position: absolute;
				left: 0;
				bottom:0;
				width: 100%;
				text-align: center;
				height: 32rpx;
				line-height: 32rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				background: linear-gradient(90deg, rgba(247, 45, 126, 0.8) 0%, rgba(247, 45, 126, 0.8) 60%, rgba(255, 255, 255, 0) 100%);
			}
		}


		.g-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: left;

			.g-name {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.g-desc {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 42rpx;
			}

			.tips-text {
				margin-top: auto;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(242, 39, 50, 1);
			}
			.discount {
				margin-top: 10rpx;
				width: 70rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				background: rgba(255, 180, 79, 1);
				border-radius: 4rpx;
				font-size: 24rpx;
				color: #fff;
				font-weight: 400;
			}
			.pirce-box {
				margin-top: auto;
				display: flex;
				align-items: center;

				.n-price {
					font-size: 40rpx;
					font-weight: 500;
					color: rgba(242, 39, 50, 1);
					margin-right: 20rpx;

					.p-icon {
						font-size: 24rpx;
					}
				}

				.o-pirce {
					font-size: 24rpx;
					font-weight: 400;
					text-decoration: line-through;
					color: rgba(153, 153, 153, 1);
				}

				.buy {
					margin-left: auto;
					text-align: center;
					width: 150rpx;
					height: 50rpx;
					line-height: 50rpx;
					background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
					border-radius: 25rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}
	
			.sold-num{
				font-size:26rpx;
				font-weight:400;
				color:rgba(153,153,153,1);
				.buy {
					margin-left: auto;
					text-align: center;
					width: 150rpx;
					height: 50rpx;
					line-height: 50rpx;
					background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
					border-radius: 25rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
	.item2{
		@extend .item;
		border-radius: 0;
		border-bottom: 1rpx solid #eee;
		margin-bottom: 0rpx;
		padding: 30rpx 20rpx;
		
	}
</style>
