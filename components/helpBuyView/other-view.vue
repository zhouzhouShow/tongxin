<template>
	<view class="help-other-containet">
		<mescroll-uni v-if="isShowPage" :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
		 @init="mescrollInit">
			<!-- //款式类别选择 -->
			<view class="brand-cate-box">
				<scroll-view class="brand-cate-scroll" scroll-x>
					<view class="brand-cate-item" :class="{'b-c-active':cateIdList.indexOf(items.cat_id) !=-1}" @click.stop="brandCateClick(items.cat_id)"
					 v-for="(items,index) in cateList" :key="index">
						<view class="b-c-item-img">
							<image :src="items.pic_url" mode=""></image>
						</view>
						<text class="clamp">{{items.title}}</text>
					</view>
				</scroll-view>
			</view>

			<view class="goods-list">
				<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)">
					<procduct :item="item" type="helpBuy"></procduct>
				</view>
			</view>

		</mescroll-uni>
	</view>
</template>

<script>
	import procduct from '@/components/product.vue'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";

	export default {
		props: {
			title: String,
			menuItem: Object,
		},
		components: {
			procduct,
			MescrollUni
		},
		data() {
			return {
				goodsList: [],
				cateList: [], //类别数据
				cateIdList: [],
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
				let categoryResult = await this.$request.post({
					url: this.$api.concatCategory,
					data: {
						parentId: this.menuItem.id
					}
				})
				this.cateList = categoryResult.list;
				this.$tips.loaded();
				this.isShowPage = true;
			},
			//分类点击
			brandCateClick(id) {
				if (this.cateIdList.indexOf(id) == -1) {
					this.cateIdList.push(id);
				} else {
					this.cateIdList.splice(this.cateIdList.indexOf(id), 1);
				}
				this.$tips.loading();
				this.mescroll.resetUpScroll()
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.loadData();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			async upCallback(mescroll) {

				let concatResult = await this.$request.post({
					url: this.$api.concatGoodlist,
					data: {
						page: mescroll.num,
						pageSize: mescroll.size,
						p_class_id: 0,
						catid: this.cateIdList.join(','),
						nav_id: 0,
						ordertype: 1,
						brand_id: 0,
						is_replace: this.menuItem.id
					}
				});

				mescroll.endSuccess(concatResult.list.length);
				if (mescroll.num == 1) this.goodsList = [];
				this.goodsList = this.goodsList.concat(this.$utils.simplifyArticleList(concatResult.list,
					['id', 'pic_urls', 'stocksnum', 'viewnum', 'title', 'price_sale', 'lastmoney', 'likenum', 'activity', 'code',
						'last_return_time','video_url'
					]));
				this.$tips.loaded();
			},
		}
	}
</script>

<style lang="scss">
	.help-other-containet {
		height: 100%;
		background: $page-color-base;
	}

	// 品牌款式选择
	.brand-cate-box {
		padding: 10rpx 0;

		.brand-cate-scroll {
			height: 200rpx;
			white-space: nowrap;

			.brand-cate-item {
				width: 180rpx;
				height: 200rpx;
				background: #fff;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-size: 24rpx;
				border: 1px solid #F3F3F3;
				border-radius: 4rpx;
				color: $font-color-dark;
				margin-right: 20rpx;
				box-sizing: border-box;

				.b-c-item-img {
					width: 124rpx;
					height: 124rpx;
					border-radius: 2rpx;
					overflow: hidden;
					margin-bottom: 6rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				text {
					width: 150rpx;
					text-align: center;
				}
			}

			.brand-cate-item:first-child {
				margin-left: 30rpx;
			}

			.brand-cate-item:last-child {
				margin-right: 30rpx;
			}

			.b-c-active {
				border: 1px solid $base-color;
				position: relative;
			}

			.b-c-active:after {
				content: url(../../static/icon/icon_cate_angle.png);
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				bottom: 0;
				right: 20rpx;
			}
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 10upx;

		.goods-item {
			margin-bottom: 12rpx;
		}
	}
</style>
