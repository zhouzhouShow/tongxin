<template>
	<div class="darkContainer">
		<searchBar @sureBtn="search" placeholder="搜索商品" btnText="取消" :itemKeyWord="keyword"></searchBar>
		<searchNav @changeType="changeType"></searchNav>

		<div class="goods-list-container" :style="{background:goodType == 1? '#f3f3f3':'#fff'}">
			<div class='goods-item-container' v-for="(item,index) in searchResultList"
			 :key="index">
				<product :product="item"  />
				<!-- 份货商品 -->
				<!-- <block v-if="goodType==1">
					<goodsItem  @fhChangeColor='changColor' @fhChangeEllipsis='ellipsis' itemtype="fenhuo" :item='item' :myIndex="index" ></goodsItem>
				</block>
				<block v-else> 
					<product :product="item" />
				</block> -->
			</div>
			<div style="width:100%;">
				<load-more :loadMore="loadMore" ref="box2"></load-more>
			</div>
		</div>
	</div>
</template>

<script>
	import product from '../../components/product'
	import loadMore from '../../components/loadMore'
	import goodsItem from '../../components/goodsItem'
	import searchBar from '@/components/searchBar'
	import searchNav from '@/components/searchNav'
	import searchFilterJs  from '@/mixins/searchFilter'
	var page = 1,
		pageSize = 10;
	export default {
		name: "searchResult",
		mixins:[searchFilterJs],
		components: {
			product,
			loadMore,
			goodsItem,
			searchBar,
			searchNav
		},
		data() {
			return {
				activeIndex: 1, //0销售 1价格
				priceOrder: true, //false是默认顺序即升序 true是降序
				loadMore: 1,
				keyword: '',
				showClearBtn: false,
				searchResultList: [],
				ordertype: 1,
				filter:{}, //筛选
				// nav_id: '', //导航id
				type: 0, //0:普通搜索进来,1:分类点击进来 
				// goodType: 0, // 0 : 挑款商品 ,1:份货商品
			}
		},
		onUnload() {
			// 接触全局监听
			uni.$off('filterGood')
		},
		onReady(){
			uni.$on('filterGood',(res)=>{
				this.filter = res
				page = 1
				this.keyWordSearch()
				console.log(res)
			})
		},
		methods: {
		
			initData() {
				page = 1
				pageSize = 10
			},
		
			changeType(type){
				console.log('筛选类型:'+type)
				page = 1;
				this.ordertype = type
				this.keyWordSearch()
			},
			search(e){
				this.keyword = e
				page = 1
				this.keyWordSearch()
			},
		
			keyWordSearch() {
				this.loadMore = 2;
				
				let params = {
					page: page,
					pageSize: pageSize,
					cateId:this.filter.cateId || '', //分类
					goodsNav:0, ////0 全部  1 晴妈推荐 2 爆款好物 3 上新
					ordertype: this.ordertype, ////1 销量倒序2 价格顺序 3 价格倒序 4 设置的排序 5 时间倒序 6 销量顺序 7 有货  8 人气
					brandId:this.filter.brandId || '', //品牌
					gender:this.filter.gender || '', //0 不限  1男 2女
					priceMin:this.filter.priceMin || '',
					priceMax:this.filter.priceMax || '',
					keyword: this.keyword,
				}
				this.$fly.post(this.$api.goodslist,params).then(res => {
					if (res.code == 1) {
						if (page == 1) {
							this.searchResultList = res.data.list;
						} else {
							if (res.data.list.length > 0) {
								this.searchResultList = this.searchResultList.concat(res.data.list);
							}
						}
						if (res.data.list.length < pageSize || res.data.list.length == 0) {
							this.loadMore = 3;
						} else {
							page++;
							this.loadMore = 1;
						}
					}
				})
			},
		
			getClassGood() { //分类点进来
				this.loadMore = 2;
				this.$fly.post(this.$api.getGoodList, {
					page: page,
					pageSize: pageSize,
					nav_id: this.nav_id, //0搜索商品 1搜索分类
					ordertype: this.ordertype, //1 时间 3.销量  4 价格顺序 5价格倒序   
					catid: this.catid,
				}).then(res => {
					if (res.status == 1) {
						if (page == 1) {
							this.searchResultList = res.data.list;
						} else {
							if (res.data.list.length > 0) {
								this.searchResultList = this.searchResultList.concat(res.data.list);
							}
						}
						if (res.data.list.length < pageSize || res.data.list.length == 0) {
							this.loadMore = 3;
						} else {
							page++;
							this.loadMore = 1;
						}
					}
				})

			},
			// 根据类型获取不同的数据
			getDataList() {
				// if (this.keyword && this.goodType == 0) {
					this.keyWordSearch();
				// } else if (this.keyword && this.goodType == 1) {
				// 	this.keyWordFenhuoSearch();
				// } else if (this.nav_id) {
				// 	this.catid = this.catid
				// 	this.getClassGood()
				// }
			}
		},
		onLoad(option) {
			this.initData()
			this.searchResultList = [];
			this.catid = option.catid || ''
			this.keyword = option.keyword;
			this.nav_id = option.nav_id;
			this.goodType = option.type
			this.getDataList()
		},
		onReachBottom() {
			if (this.loadMore == 1) {
				this.getDataList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-bar {
		display: flex;
		flex-direction: row;
		// justify-content: center;
		align-items: center;
		padding: 0 20rpx 12rpx;
		margin: 12rpx 0 12rpx;

		.search-input-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 604rpx;
			height: 64rpx;
			background-color: #F0F1F2;
			// border:2rpx solid #FF0000;
			border-radius: 28rpx;

			.search-icon {
				width: 31rpx;
				height: 31rpx;
				flex-grow: 0;
				padding: 0 10rpx 0 20rpx;
			}

			input {
				width: 80%;
				// background-color: black;
				font-size: 26rpx;
				color: #333333;
			}

			.clear-icon {
				width: 31rpx;
				height: 31rpx;
				flex-grow: 0;
				padding: 20rpx 20rpx 20rpx 10rpx;
			}
		}

		div.noSelected {
			background: #C9C9C9;
		}

		.search-btn {
			width: 120rpx;
			height: 64rpx;
			line-height: 64rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #333333;
			text-align: center;
		}
	}

	

	.goods-list-container {
		background: #fff;
		box-sizing: border-box;
		width: 100%;
		padding: 15rpx 20rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;

		.brands-part-good-list {
			padding-top: 20rpx;
			width: 100%;
		}

		.goods-item-container {
			width: 344rpx;
			height: 500rpx;
			margin-bottom: 23rpx;
		}
	}
</style>
