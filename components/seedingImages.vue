<template>
	<view class="seeding_images">
		<view v-if="info.product_info.video" class="images_video">
			<video :src="info.product_info.video" controls></video>
		</view>
		<view v-else-if="imagesType=='swiper'" class="images_swiper">
			<swiper class="swiper" @change="swiperChange" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration">
				<swiper-item v-for="(s,n) in info.product_info.images" :key="n">
					<image @click="previewImage(n)" :src="s" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="dots" style="background: url(../../static/images/seeding/swiper_point.png) no-repeat;background-size: 100% 100%;">
				<text>{{current + 1}}</text>
				<text>/</text>
				<text>{{info.product_info.images.length}}</text>
			</view>
		</view>
		<view v-else-if="info.product_info.images.length<=1" class="images_once">
			<image @click="previewImage(0)" :src="info.product_info.images[0]" mode="aspectFill"></image>
		</view>
		<view v-else-if="info.product_info.images.length<=2" class="images_double">
			<image @click="previewImage(num)" v-for="(image,num) in info.product_info.images" :key="num" :src="image" mode="aspectFill"></image>
		</view>
		<view v-else class="images_more">
			<view class="left">
				<image @click="previewImage(0)" :src="info.product_info.images[0]" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<image @click="previewImage(1)" :src="info.product_info.images[1]" mode="aspectFill"></image>
				</view>
				<view class="bottom">
					<image @click="previewImage(2)" :src="info.product_info.images[2]" mode="aspectFill"></image>
					<view @click="previewImage(2)" v-if="info.product_info.images.length>3" class="num">
						<text>+{{info.product_info.images.length - 3}}</text>
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
			imagesType: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				autoplay: false,
				interval: 3000,
				duration: 500,
				current: 0
			}
		},
		methods: {
			previewImage(index) {
				this.$emit('previewImage', this.info, index)
			},
			swiperChange(e){
				this.current = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	.seeding_images {
		.images_video {
			width: 710rpx;
			height: 710rpx;

			video {
				width: 100%;
				height: 100%;
			}
		}

		.images_swiper {
			width: 710rpx;
			height: 710rpx;
			position: relative;

			.swiper {
				width: 710rpx;
				height: 710rpx;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.dots{
				position: absolute;
				width:83rpx;
				height:38rpx;
				padding:0 5rpx;
				right: 20rpx;
				bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				text{
					height:22rpx;
					font-size:22rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					line-height: 22rpx;
					&:nth-child(2){
						font-size: 14rpx;
					}
				}
			}
		}

		.images_once {
			width: 710rpx;
			height: 702rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.images_double {
			width: 710rpx;
			height: 702rpx;
			display: flex;
			justify-content: space-between;

			image {
				flex-basis: 350rpx;
				height: 100%;
			}
		}

		.images_more {
			position: relative;
			width: 710rpx;
			height: 702rpx;
			display: flex;
			justify-content: space-between;

			.left {
				flex-basis: 468rpx;
				height: 702rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				flex-basis: 234rpx;
				height: 702rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.top {
					width: 100%;
					height: 347rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.bottom {
					width: 100%;
					height: 347rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
					}

					.num {
						position: absolute;
						width: 100%;
						height: 100%;
						left: 0;
						top: 0;
						background: rgba(0, 0, 0, .4);
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							font-size: 48rpx;
							font-family: DINPro;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
			}
		}
	}
</style>
