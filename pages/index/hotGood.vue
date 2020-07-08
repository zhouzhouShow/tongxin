<template>
	<view class="recommend">
		<!-- <view class="poster"> -->
		<image class="poster" src="https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200707/cd4035edeece2e5c3b1284c4023adc4a.png"
		 mode=""></image>
		<!-- </view> -->
		<view class="classify-list">
			<view class="item">
				<image src="../../static/images/good/share_wechat.png" mode=""></image>
				<view class="text">童婴</view>
			</view>
			<view class="item">
				<image src="../../static/images/good/share_wechat.png" mode=""></image>
				<view class="text">童婴</view>
			</view>
			<view class="item">
				<image src="../../static/images/good/share_wechat.png" mode=""></image>
				<view class="text">童婴</view>
			</view>

		</view>
		<view class="recommend-box">
			<view class="r-title flex-center">
				<image src="../../static/images/icon/hot.png" mode=""></image>
				<span>热卖尖货</span>
				<image src="../../static/images/icon/hot.png" mode=""></image>
			</view>
			<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item">
					<image class="i-img" :src="item.url" mode=""></image>
					<view class="info flex-align-center">
						<text class="name clamp">{{item.name}}</text>
						<text class="n-price">
							<text class="p-icon">¥</text>{{item.price}}
						</text>
					</view>
				</view>
			</block>
			</view>
			<load-more :status="loadMore"></load-more>
		</view>
		<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
	</view>
</template>

<script>
	import goodItem from '@/components/goodsItem.vue'
	import fixedIcon from '@/components/fixedIcon.vue'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	export default {
		mixins: [loadMoreData],
		components: {
			goodItem,
			fixedIcon,
			loadMore
		},
		data() {
			return {
				showItem: {
					cart: true,
					share: true,
					backTop: true,
				},
				list: [{
						name: '分阿里交付的拉丝粉',
						desc: '2020新款木马短袖女童连衣裙宝宝夏装纯棉',
						oPrice: 199,
						price: 80,
						url: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
					},
					{
						name: '分阿里交付的拉丝粉',
						desc: '2020新款木马短袖女童连衣裙宝宝夏装纯棉',
						oPrice: 199,
						price: 80,
						url: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
					},
					{
						name: '分阿里交付的拉丝粉',
						desc: '2020新款木马短袖女童连衣裙宝宝夏装纯棉',
						oPrice: 199,
						price: 80,
						url: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
					}
				],

			};
		},
		methods: {
			share(e) {

			},
		},
		onShareAppMessage() {
			return {
				title: '爆款好物'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend {
		background: #fff;
		padding-bottom: 30rpx;
		min-height: 100vh;

		.poster {
			width: 100%;
			height: 360rpx;
			margin-bottom: 20rpx;
		}

		.classify-list {
			padding: 0 35rpx;
			display: flex;
			margin-bottom: 60rpx;

			.item {
				margin-right: 45rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					margin-bottom: 25rpx;
				}

				.text {
					text-align: center;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 1)
				}


			}
		}

		.recommend-box {
			padding: 0 20rpx;
			text-align: center;

			.r-title {
				image {
					width: 39rpx;
					height: 39rpx;
				}

				image:nth-of-type(2) {
					transform: rotateY(180deg);
				}

				span {
					margin: 0 24rpx;
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(223, 70, 78, 1);
				}

				margin-bottom: 38rpx;
			}
			// <view class="item">
			// 	<image class="i-img" :src="item.url" mode=""></image>
			// 	<view class="info">
			// 		<text class="name clamp">{{item.name}}</text>
			// 		<text class="n-price">
			// 			<text class="p-icon">¥</text>{{item.price}}
			// 		</text>
			// 	</view>
			// </view>
			.list{
				display: flex;
				flex-wrap:wrap;
				justify-content: space-between;
			}
			.item{
				width: 345rpx;
				margin-bottom: 28rpx;
				.i-img{
					width:345rpx;
					height:345rpx;
					border-radius:8rpx;
					display: block;
				}
				.info{
					margin-top: 20rpx;
					.name{
						width:260rpx;
						text-align: left;
						font-size:24rpx;
						font-weight:400;
						color:rgba(51,51,51,1);
					}
					.n-price{
						font-size: 40rpx;
						font-weight:500;
						color:rgba(242,39,50,1);
						margin-right: 20rpx;
						.p-icon{
							font-size:24rpx;
						}
					}
					
				}
				
			}
		}

	}
</style>
