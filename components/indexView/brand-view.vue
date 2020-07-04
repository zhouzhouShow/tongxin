<template>
	<view class="other-main-container">
		<mescroll-uni v-if="isShowPage" :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
			<swiperView :list="bannerList"></swiperView>
			<!-- 分类 -->
			<view class="cate-section">
				<view class="cate-item" v-for="(item,index) in categoryList" :key="item.cat_id" @click.stop="navToCatePage(item.cat_id,item.title)">
					<image :src="item.image"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
			<!-- //品牌列表 -->
			<view class="brand-section">
				<block v-for="(item,index) in barndList" :key="index">
					<brand :item="item" @collect="getCollect" :idx="index"></brand>
				</block>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import brand from '@/components/shop-components/brand.vue'
	import swiperView from '@/components/swiper-view.vue'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";

	export default {
		components: {
			brand,
			swiperView,
			MescrollUni
		},
		props: {
			title: String,
			navId: Number
		},
		data() {
			return {
				bannerList: [],
				categoryList: [],
				goodsList: [],
				barndList: [],
				isShowPage: false,
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:false, // 不自动加载
				},
				upOption:{
					auto:true, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 6 // 每页数据的数量
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
				
				let barndResult = await this.$request.post({
					url: this.$api.barndsIndex,
					data: {
						page: mescroll.num,
						pageSize: mescroll.size,
						p_class_id: 0,
						catid: 0,
						nav_id: this.navId
					}
				})
				
				mescroll.endSuccess(barndResult.list.length);
				if(mescroll.num == 1) this.barndList = [];
				this.barndList = this.barndList.concat(barndResult.list);
			},
			//跳转类别页面
			navToCatePage(id,title) {
				uni.navigateTo({
					url: `/pages/shopkeeper/product/product-cate-page?title=${title}&pClassId=${id}&navId=${this.navId}`,
				})
			},
			//收藏
			getCollect(e){
				this.barndList[e.idx].iscollect = 1;
				this.$tip.toast('收藏成功');
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
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			margin-top: -20rpx;
			position: relative;
			z-index: 99;

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

	}
</style>
