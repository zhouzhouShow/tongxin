<template>
	<view class="item flex-align-center">
		<checkbox color="#17B948" :checked="isAll" v-if="type=='cart'" />
		<image class="g-img" src="https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg"
		 mode=""></image>
		<view class="g-info">
			<p class="g-name clamp-two">{{'2020新款木马短袖女童连衣裙宝宝夏装纯棉 '}}</p>
			<p class="g-spec flex-justify-center">
				<text>粉色;120cm</text>
				<text class="iconfont iconarrow"></text>
			</p>
			<p class="discount">9.2折</p>
			<p class="pirce-box">
				<span class="n-price">
					<span class="p-icon">¥</span>{{213}}
				</span>
				<span class="num" v-if="type=='order'">x1</span>
				<uni-number-box v-if="type=='cart'" :value='1' :max="10" @change="getNumberValue" :onlyKey="123"></uni-number-box>
			</p>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		props:{
			item:{
				type:Object,
				default:null
			},
			type:{
				type:String,
				default:'cart'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding-bottom: 30rpx;
		.g-img {
			width: 219rpx;
			height: 219rpx;
			margin: 0 20rpx;
		}

		.g-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			text-align: left;
			height: 220rpx;

			.g-name {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.g-spec {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 36rpx;
				margin-top: 18rpx;
				// padding:0 13rpx;
				width: 194rpx;
				height: 46rpx;
				line-height: 46rpx;
				background: rgba(248, 248, 248, 1);
				border-radius: 4rpx;

			}

			.discount {
				margin-top: 10rpx;
				width: 80rpx;
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
				justify-content: space-between;

				.n-price {
					font-size: 40rpx;
					font-weight: 500;
					color: rgba(242, 39, 50, 1);
					margin-right: 20rpx;

					.p-icon {
						font-size: 24rpx;
					}
				}
				.num{
					font-size:24rpx;
					font-weight:400;
					color:rgba(153,153,153,1);
				}

			}
		}
	}
</style>
