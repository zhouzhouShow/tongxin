<template>
	<view class="other-main-container">
	<mescroll-uni v-if="isShowPage" :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
			<!-- 头部轮播 -->
			<swiperView :list="bannerList"></swiperView>
			<!-- 分类 -->
			<view class="cate-section">
				<view class="cate-item" v-for="(item,index) in categoryList" :key="item.cat_id" @click.stop="navToCatePage(item.cat_id,item.title)">
					<image :src="item.image"></image>
					<text>{{item.title}}</text>
				</view>
			</view>

			<!-- 公司介绍 -->
			<view class="company-introduce">
				<view class="c-i-content">
					<view v-for="(item,index) in posterList" @click.stop="navToPosterLink(item.ad_link)" v-if="index<3" :key="item.id">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<!-- 全部新款 -->
			<view class="f-header">
				<text class="header-line"></text>
				<text class="header-title">{{title}}</text>
				<text class="header-line"></text>
			</view>

			<view class="guess-section">
				<view class="guess-item" v-for="(item, index) in goodsList" :key="index">
					<procduct :item="item"></procduct>
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
		components: {
			procduct,
			swiperView,
			MescrollUni
		},
		props: {
			title: String,
			navId:Number
		},
		data() {
			return {
				bannerList: [],
				categoryList: [],
				goodsList: [],
				posterList: [],
				loadingType: 'more', //加载更多状态
				isShowPage:false,
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:false, // 不自动加载
				},
				upOption:{
					auto:true, // 不自动加载
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
				let result = await this.$request.post({
					url: this.$api.xcxhome,
					data: {
						type: this.navId
					}
				});
				this.bannerList = result.banner;
				this.categoryList = result.cat;
				this.posterList = result.poster;
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
				let result = await this.$request.post({
					url: this.$api.newprocudt,
					data: {
						nav_id: this.navId,
						page: mescroll.num,
						pageSize: mescroll.size,
					}
				});
				mescroll.endSuccess(result.list.length);
				if(mescroll.num == 1) this.goodsList = [];
				this.goodsList = this.goodsList.concat(this.$utils.simplifyArticleList(result.list,
					['id', 'pic_urls', 'code', 'stocksnum', 'viewnum', 'title', 'price_sale', 'lastmoney', 'likenum','video_url']));
			},
			//跳转类别页面
			navToCatePage(id,title) {
				uni.navigateTo({
					url: `/pages/shopkeeper/product/product-cate-page?title=${title}&pClassId=${id}&navId=${this.navId}`,
				})
			},
			//跳转海报页面
			navToPosterLink(link) {
				uni.navigateTo({
					url: link
				})
			},
		}
	}
</script>

<style lang="scss">
	.other-main-container {
		height: 100%;

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

		/* 公司介绍 */
		.company-introduce {
			padding: 20rpx 30rpx 24rpx 30rpx;
			background: #fff;

			.c-i-header {
				width: 100%;
				height: 138rpx;
				display: flex;
				margin-bottom: 24rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.c-i-content {
				display: flex;
				align-items: center;

				view {
					width: 32%;
					height: 293rpx;
					display: flex;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
				&>view:not(:last-child){
					margin-right:2%;
				}
			}
		}

		.f-header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 104upx;
			background: #f3f3f;
			margin-top: 10rpx;

			text.header-title {
				font-size: 36rpx;
				font-weight: bold;
				color: $font-color-dark;
				font-weight: 500;
				margin: 0 30rpx;
			}

			.header-line {
				width: 24rpx;
				height: 2px;
				background: #666;
			}
		}


		/* 全部新款 */
		.guess-section {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 10upx;

			.guess-item {
				margin-bottom: 12rpx;
			}
		}
	}
</style>
