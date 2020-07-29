<template>
	<!-- <view class="setBg"> -->
		<view class="recommend">
			<!-- <view class="poster"> -->
			<image class="poster" src="https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200707/e2345a113990f00faa21c7f13de0f87a.png"
			 mode=""></image>
			<!-- </view> -->
			<view class="recommend-box">
				<view style="background: #fff;position: relative;z-index: 33;" v-for="(item,index) in list" :key="index" @click="toDetail(item.goods_id)">
					<goodItem :itemHeight="218" itemtype="timeLimite" :item="item"></goodItem>
				</view>
				<load-more :status="loadMore"></load-more>
			</view>
			<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
		</view>
	<!-- </view> -->
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

			};
		},
		onLoad() {
			this.getGood()
		},
		methods: {
			share(e) {

			},
			async getGood() {
				this.$tip.loading()
				await this.$fly.post(this.$api.limitList).then(res => {
					let list = res.data.list
					this.loadMoreStatusDeal(list)
					if (list.length > 0) {
						this.list = this.list.concat(list)
					}
				})
				this.timeOutLoaded();
			},
			reachBottomCallBack() {
				this.getGood();
			},
			toDetail(id) {
				wx.navigateTo({
					url: '/pages/good/goodDetail?id=' + id
				})
			},
		},
		onShareTimeline(){
			return {
				title: '限时抢购',
				query:'h=4',
			}
		},
		onShareAppMessage(res) {
			this.$help.isBtnShare = true
			if (res.from === 'button') {
				// console.log(res.target);
			}
			return {
				title:'限时抢购',
				path: '/pages/index/index?h=4',
				success: function() {
					console.log('分享成功')
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.setBg {
		height: 100%;
		background: #F3F3F3;
	}

	.recommend {
		padding-bottom: 30rpx;
		padding-top: 287rpx;

		.poster {
			width: 100%;
			height: 382rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}

		.recommend-box {
			margin: 0 20rpx;
			text-align: center;
			z-index: 1;
			overflow: hidden;
			border-radius: 10rpx;

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

		}

	}
</style>
