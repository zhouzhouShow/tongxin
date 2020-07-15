<template>
	<view class="recommend">
		<!-- <view class="poster"> -->
		<image class="poster" src="https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200707/cd4035edeece2e5c3b1284c4023adc4a.png"
		 mode=""></image>
		<!-- </view> -->
		<view class="classify-list">
			<view class="item" @click="changeNav(item.id)" v-for="(item,index) in navList " :key="index">
				<image :src="item.img" mode=""></image>
				<view class="text">{{item.title}}</view>
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
					<view class="item" @click="toDetail(item.goods_id)">
						<image class="i-img" :src="item.goods_images[0]" mode=""></image>
						<view class="info flex-align-center">
							<text class="name clamp">{{item.goods_title}}</text>
							<text class="n-price">
								<text class="p-icon">¥</text>{{item.price_sale}}
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
				list: [],
				cNavId:0,//0 无  1婴童  2男童 3女童
				navList: [{
					title: '婴童',
					img: 'https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200714/9f817897b334dd3548cacaf3683d025a.png',
					id:1,
				},{
					title: '男童',
					img: 'https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200714/ef7e6c1fa146957e982b2cd5ff817c38.png',
					id:2,
				},{
					title: '女童',
					img: 'https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200714/37d039cee0bf00d16216d45218a920b2.png	',
					id:3,
				}]
			};
		},
		onLoad() {
			this.getGood()
		},
		methods: {
			share(e) {

			},
			changeNav(id){
				this.cNavId = id
				this.list = []
				this.refreshLoad()
			},
			toDetail(id) {
				wx.navigateTo({
					url: '/pages/good/goodDetail?id=' + id
				})
			},
			async getGood() {
				this.$tip.loading()
				let params = {
					page: this.page,
					pageSize: this.pageSize,
					goodsNav: 1,
					goodsAge:this.cNavId
				}
				await this.$fly.post(this.$api.goodslist, params).then(res => {
					let list = res.data.list
					this.loadMoreStatusDeal(list)
					if (list.length > 0) {
						this.list = this.list.concat(list)
					}
				})
				this.timeOutLoaded();
			},
			reachBottomCallBack(){
				this.getGood();
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
					width: 48rpx;
					height: 48rpx;
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
			.list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}

			.item {
				width: 345rpx;
				margin-bottom: 28rpx;

				.i-img {
					width: 345rpx;
					height: 345rpx;
					border-radius: 8rpx;
					display: block;
				}

				.info {
					margin-top: 20rpx;

					.name {
						width: 260rpx;
						text-align: left;
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.n-price {
						font-size: 40rpx;
						font-weight: 500;
						color: rgba(242, 39, 50, 1);
						margin-right: 20rpx;

						.p-icon {
							font-size: 24rpx;
						}
					}

				}

			}
		}

	}
</style>
