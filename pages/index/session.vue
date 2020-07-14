<!--专场 -->
<template>
	<view class="session">
		<searchNav @changeType="changeType"></searchNav>
		<div class="good-list">
			<div v-for="(item,index) in list"  :key="index" @click="toDetail(item.goods_id)">
				<goodItem itemtype="sessionItem" :item="item"></goodItem>
			</div>
			<load-more  :status="loadMore"></load-more>
		</div>
	</view>
</template>

<script>
	
	import searchNav from '@/components/searchNav'
	import goodItem from '@/components/goodsItem.vue'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	export default {
		mixins:[loadMoreData],
		components:{
			goodItem,
			loadMore,
			searchNav
		},
		data() {
			return {
				activeIndex:-1,
				ordertype: 1,
				nav_id: '', //导航id
				catid: '', //
				goodsAge:'',
				filter:{}, //筛选
				type: 0, //0:普通搜索进来,1:分类点击进来 
				priceOrder: true, //false是默认顺序即升序 true是降序
				loadMore: 1,
				list:[],
			};
		},
		onLoad(option) {
			this.list = [];
			this.goodsAge = option.goodsAge || ''
			wx.setNavigationBarTitle({
				title:option.title
			})
			this.getDataList()
		},
		onUnload() {
			// 接触全局监听
			uni.$off('filterGood')
		},
		onReady(){
			uni.$on('filterGood',(res)=>{
				this.filter = res
				this.page = 1
				this.keyWordSearch()
				console.log(res)
			})
		},
		methods:{
			toDetail (id){
				uni.navigateTo({
					url:'/pages/good/goodDetail?id='+id
				})
			},
			keyWordSearch() {
				this.loadMore = 2;
				let params = {
					page: this.page,
					pageSize: this.pageSize,
					cateId:this.filter.cateId || '', //分类
					goodsNav:0, ////0 全部  1 晴妈推荐 2 爆款好物 3 上新
					ordertype: this.ordertype, ////1 销量倒序2 价格顺序 3 价格倒序 4 设置的排序 5 时间倒序 6 销量顺序 7 有货  8 人气
					brandId:this.filter.brandId || '', //品牌
					gender:this.filter.gender || '', //0 不限  1男 2女
					priceMin:this.filter.priceMin || '',
					priceMax:this.filter.priceMax || '',
					goodsAge:this.goodsAge //0 无  1婴童  2男童 3女童
				}
				this.$fly.post(this.$api.goodslist,params).then(res => {
					if (res.code == 1) {
						let list = res.data.list
						if(this.page==1){
							this.list = []
						}
						this.loadMoreStatusDeal(list)
						if(list.length>0){
							this.list = this.list.concat(res.data.list);
						}
					}
				})
			},
			changeType(type){
				console.log('筛选类型:'+type)
				this.page = 1;
				this.ordertype = type
				this.keyWordSearch()
			},
			getDataList() {
					this.keyWordSearch();
			}
		}
	}
</script>

<style lang="scss" scoped>
.header-bar {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 90rpx;
		background: #fff;
		border-bottom: 1rpx solid #eee;

		.header-item:after {
			position: absolute;
			left: 0;
			top: 50%;
			width: 2rpx;
			height: 30rpx;
			content: '';
			background: #eee;
			margin-top: -15rpx;
		}

		.header-item {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 50%;
			height: 100%;
			box-sizing: border-box;

			.header-item-text {
				font-size: 30rpx;
				font-weight: 500;
				color: #999;
				text-align: center;
				position: relative;
			}

			.active-line {
				width: 60rpx;
				height: 1px;
				// background-color: #FF0000;
			}

			.item-active {
				color: #F22631;
			}

			.order-arrows {
				position: absolute;
				top: 0;
				right: 33rpx;
				margin-top: 32rpx;
				color: #eee;

				.up-arrow {
					width: 6px;
					height: 6px;
					border-top: 1px solid #999;
					border-right: 1px solid #999;
					transform: rotate(-45deg);
					// border-width: 10rpx;
					// border-style: solid;
					// border-color: transparent transparent #eee transparent;
					margin-bottom: -1rpx;
				}

				.down-arrow {
					width: 6px;
					height: 6px;
					border-top: 1px solid #999;
					border-right: 1px solid #999;
					transform: rotate(135deg);
					// border-width: 10rpx;
					// border-style: solid;
					// border-color:#eee transparent transparent transparent;
					// transform: rotate(180deg); /*顺时针旋转90°*/
				}

				.up-arrow-active {
					border-color: #F22631;
					color: #F22631;
				}

				.down-arrow-active {
					border-color: #F22631;
					color: #F22631;
				}
			}
		}
	}
</style>
