<template>
	<view class="season">
		<view class="notice flex-center">
			<view class="box">
				<image class="icon" src="../../static/images/icon/notice.png" mode=""></image>
				<swiper class="notice-swiper" vertical="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
					<swiper-item class="clamp">
						新品9折优惠，喜欢的亲们抓紧抢购！
					</swiper-item>
					<swiper-item class="clamp">
						新品9折优惠，喜欢的亲们抓紧抢购！
					</swiper-item>
				</swiper>
			</view>
		</view>
	
		<view class="recommend-box">
			<view class="r-title flex-center">
				<image src="../../static/images/icon/lindang.png" mode=""></image>
				<span>热卖尖货</span>
				<image src="../../static/images/icon/lindang.png" mode=""></image>
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
		<fixedIcon ref="backTop" @tirggter="tirggterFixed" :showItem='showItem'></fixedIcon>
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
			tirggterFixed(e) {

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
	.season {
		background: #FBEEDC;
		padding-bottom: 30rpx;
		min-height: 100vh;
		.notice{
			height:130rpx;
			background:rgba(255,180,79,1);
			padding:0 20rpx;
			.box{
				background:rgba(255,255,255,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				height: 90rpx;
				width: 100%;
				.icon{
					padding-left:20rpx;
					padding-right:20rpx;
					width: 40rpx;
					height: 40rpx;
				}
				.notice-swiper{
					flex: 1;
					height: 50rpx;
					line-height: 50rpx;
					font-size:30rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
					.swiper-item{
						height: 100%;
					}
				}
			}
			
		}
		.poster {
			width: 100%;
			height: 360rpx;
			margin-bottom: 20rpx;
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
