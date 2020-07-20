<template>
	<view class="c_product_item" v-if="info">
		<view class="cover">
			<image :src="info.goods_img[0]" mode="aspectFill"></image>
		</view>
		<view class="detail">
			<view>
				<view class="name">
					<text>{{info.goods_name}}</text>
				</view>
			</view>
			<view>
				<view class="spec">
					<view class="left">
						<text>{{info.spec_item_title | split}}</text>
					</view>
					<view v-if="showRefundBtn" class="right">
						<button @click="handleToRefund" type="default">退货</button>
					</view>
				</view>
				<view v-if="info.discount<100" class="discount">
					<text>{{(info.discount).toFixed(2)}}折</text>
				</view>
				<view class="price">
					<view class="left">
						<text>¥</text>
						<text>{{info.goods_price}}</text>
					</view>
					<view v-if="showNumber" class="right">
						<view v-if="!showRefundInfo" class="number">
							<text>x</text>
							<text>{{info.goods_num}}</text>
						</view>
						<view v-else class="refund">
							<text>购买数量：{{info.goods_num}}</text>
							<text>已退数量：{{refundNumber}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			},
			showRefundBtn: {
				type: Boolean,
				default: false
			},
			showNumber: {
				type: Boolean,
				default: true
			},
			showRefundInfo: {
				type: Boolean,
				default: false
			},
			refundNumber: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			};
		},
		filters:{
			split(str){
				if(str){
					return str.replace('_',' ; ');
				}
			},
		},
		methods:{
			handleToRefund(){
				this.$emit('handleToRefund',this.info)
			}
		}
	}
</script>

<style lang="scss">
	.c_product_item {
		view {
			box-sizing: border-box;
		}

		display: flex;

		.cover {
			flex-basis: 218rpx;
			width: 218rpx;
			height: 218rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail {
			flex: 1;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 32rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				margin-top: 0rpx;
			}

			.spec {
				// margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					background: rgba(248, 248, 248, 1);
					border-radius: 4px;
					padding: 10rpx 24rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						height: 24rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 24rpx;
					}
				}

				.right {
					button {
						width: 150rpx;
						height: 50rpx;
						border: 1rpx solid rgba(221, 221, 221, 1);
						border-radius: 25rpx;
						line-height: 50rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						background-color: #fff;
					}
				}
			}

			.discount {
				margin-top: 10rpx;
				height: 30rpx;
				overflow: hidden;
				display: flex;
				align-items: center;

				text {
					width: 80rpx;
					height: 30rpx;
					font-size: 24rpx;
					text-align: center;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 30rpx;
					background: rgba(255, 180, 79, 1);
					border-radius: 4rpx;
				}
			}

			.price {
				margin-top: 15rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					height: 32rpx;
					font-size: 40rpx;
					font-family: DINPro;
					font-weight: 500;
					color: rgba(242, 39, 50, 1);
					line-height: 36rpx;

					text:nth-child(1) {
						font-size: 24rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.number {
						height: 24rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);

						text:nth-child(2) {
							font-size: 25rpx;
						}
					}

					.refund {
						height: 24rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);

						text:nth-child(1) {
							margin-right: auto;
							// margin-right: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
