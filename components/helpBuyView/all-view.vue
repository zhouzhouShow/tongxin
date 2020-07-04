<template>
	<view class="help-all-container">
		<mescroll-uni v-if="isShowPage" :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
		 @init="mescrollInit">
			<!-- <swiperView :list="carouselList"></swiperView> -->
			<view class="help-buy-banner" @click="navToDetailPage(banner.ad_link)">
				<image :src="banner.image" mode="widthFix"></image>
			</view>
			<!-- 分类 -->
			<view class="cate-section">
				<view class="cate-item" v-for="(item,index) in categoryList" :key="item.cat_id" @click.stop="navToCatePage(item.cat_id,item.title)">
					<image :src="item.pic_url"></image>
					<text>{{item.title}}</text>
				</view>
			</view>

			<!-- 全部新款 -->
			<view class="guess-section">
				<view class="guess-item" v-for="(item, index) in goodsList" :key="index">
					<procduct :item="item" type="helpBuy"></procduct>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import procduct from '@/components/product.vue'
	import swiperView from '@/components/swiper-view.vue'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";

	export default {
		props: {
			title: String,
			menuItem: Object,
		},
		components: {
			procduct,
			swiperView,
			MescrollUni
		},
		data() {
			return {
				categoryList: [],
				goodsList: [],
				banner: '',
				isShowPage: false,
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: true,
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 12 // 每页数据的数量
					},
					noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				},
			};
		},
		mounted() {
			this.loadData();
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			async loadData() {
				this.$tips.loading();
				let bannerResult = await this.$request.post({
					url: this.$api.banner,
					data: {
						type: 43
					},
				})
				this.banner = bannerResult.list[0];
				let categoryResult = await this.$request.post({
					url: this.$api.concatCategory,
					data: {
						parentId: this.menuItem.id
					}
				})
				this.categoryList = categoryResult.list;
				this.$tips.loaded();
				this.isShowPage = true;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.loadData();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {

				let concatResult = await this.$request.post({
					url: this.$api.concatGoodlist,
					data: {
						page: mescroll.num,
						pageSize: mescroll.size,
						p_class_id: 0,
						catid: 0,
						nav_id: 0,
						ordertype: 1,
						brand_id: 0,
						is_replace: this.menuItem.id
					}
				})
				mescroll.endSuccess(concatResult.list.length);
				if (mescroll.num == 1) this.goodsList = [];
				this.goodsList = this.goodsList.concat(this.$utils.simplifyArticleList(concatResult.list,
					['id', 'pic_urls', 'stocksnum', 'viewnum', 'title', 'price_sale', 'lastmoney', 'likenum', 'activity', 'code',
						'last_return_time', 'video_url'
					]));
			},
			//跳转类别页面
			navToCatePage(id, title) {
				uni.navigateTo({
					url: `/pages/shopkeeper/product/product-cate-page?title=${title}&pClassId=${id}&navId=${this.navId}`,
				})
			},
			// 上拉加载
			lower() {
				if (this.loadingType == 'more') {
					this.loadMore();
				}
			},
			navToDetailPage(link) {
				this.$swiper.linkTo(link);
			},
		}

	}
</script>

<style lang="scss">
	.help-all-container {
		height: 100%;

		.help-buy-banner {
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			height: 300rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		/* 分类 */
		.cate-section {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 12upx 0;
			background: #fff;

			.cate-item {
				padding-top: 8rpx;
				padding-bottom: 16rpx;
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 26rpx;
				color: $font-color-dark;
			}

			/* 原图标颜色太深,不想改图了,所以加了透明度 */
			image {
				width: 88upx;
				height: 88upx;
				margin-bottom: 14upx;
				border-radius: 50%;
			}
		}

		/* 全部新款 */
		.guess-section {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 10upx;
			padding-top: 14rpx;

			.guess-item {
				margin-bottom: 12rpx;
			}
		}
	}
</style>
