<template>
	<!-- 头部轮播 -->
	<view class="carousel-section">
		<video id="myVideo" ref="video" class="myVideo" v-if="video && isPlay" autoplay :src="video" @pause="videoPause"></video>
		<swiper class="carousel" circular @change="swiperChange" :style="{'height':height}" autoplay>
			<swiper-item class="carousel-item" v-if="video" @click.stop="playVideo">
				<image class="carousel-img" :src="itemKey == 'Number'?list[0]:list[0][itemKey]" mode=""></image>
				<image class="carousel-video-btn" src="/static/play-btn.png" mode="widthFix"></image>
			</swiper-item>
			<swiper-item v-for="(item, index) in list" :key="index" class="carousel-item" @click="navToDetailPage(item.ad_link)">
			<!-- <swiper-item v-for="(item, index) in list" :key="index" class="carousel-item" 
			@click="navToDetailPage('/pages/center/collect/collect?from=2')"> -->
				<image class="carousel-img" :src="itemKey == 'Number'?item:item[itemKey]" @click="handleView(list, index)" />
			</swiper-item>
		</swiper>
		<!-- 自定义swiper指示器 -->
		<view class="swiper-dots">
			<text :class="{'swiper-dots-ac':swiperCurrent == index}" v-for="(item,index) in list" :key="item.id"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			video: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: '300rpx'
			},
			itemKey: {
				type: String,
				default: 'image'
			}
		},
		data() {
			return {
				swiperCurrent: 0,
				swiperLength: 0,
				isPlay: false,
				videoContext: null,
			};
		},
		methods: {
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			navToDetailPage(link) {
				if(link){
					this.$swiper.linkTo(link);
				}
			},
			playVideo() {
				this.isPlay = true;
				if (!this.videoContext) {
					this.videoContext = uni.createVideoContext('myVideo')
				}
				this.videoContext.play();
				this.videoContext.play();
			},
			videoPause() {
				this.isPlay = false;
			},
			/*
			 * 预览图片
			 */
			handleView(picture, index) {
				// console.log(picture)
				console.log(index)
				// 详细文档请查阅：https://uniapp.dcloud.io/api/media/image?id=unipreviewimageobject
				uni.previewImage({
					current: picture[index],
					urls: picture,
					indicator: "number",
					loop: false,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					success: function() {},
					fail: function() {},
					complete: function() {}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
	}

	.myVideo {
		width: 100%;
		height: 726rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.carousel {
		width: 100%;
		height: 300upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: relative;
		}

		video {
			width: 100%;
			height: 100%;
		}

		.carousel-img {
			width: 100%;
			height: 100%;
		}

		.carousel-video-btn {
			width: 118rpx;
			height: 118rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 10;
		}
	}

	.swiper-dots {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		bottom: 15upx;
		width: 100%;

		text {
			width: 8rpx;
			height: 8rpx;
			border-radius: 4rpx;
			background: #fff;
			margin: 0 6rpx;
		}

		.swiper-dots-ac {
			width: 26rpx;
		}
	}
</style>
