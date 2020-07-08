<template>
	<div class="darkContainer">
		<div class="search-bar">
			<div class="search-input-container">
				<div class="search-icon">
					<img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/search.png">
				</div>
				<input @input='keyword?showClearBtn=true:showClearBtn=false' type="text" placeholder='搜索' v-model="keyword">
				<div class="clear-icon" v-show="showClearBtn" @click="clearSearchInput">
					<img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/icon_clear.png">
				</div>
			</div>
			<!-- <div class="search-btn" @click="keyWordSearch">搜索</div> -->

			<div class="search-btn" @click="toSearchResult(keyword,1)">取消</div>
		</div>
		<div class="header-bar">
			<div class="header-item" @click="changeIndex(1)">
				<div class="header-item-text" :class="activeIndex==1?'item-active':''">人气</div>
				<div :class="activeIndex?'':'active-line'"></div>
			</div>
			<div class="header-item" @click="changeIndex(3)">
				<div class="header-item-text" :class="activeIndex==3?'item-active':''">销量</div>
				<div :class="activeIndex?'':'active-line'"></div>
			</div>
			<div class="header-item" @click="changeIndex(4)">
				<div class="header-item-text" :class="activeIndex==4?'item-active':''">价格</div>
				<div :class="activeIndex?'active-line':''"></div>
				<div class="order-arrows">
					<div class="up-arrow" :class="activeIndex==4&&!priceOrder?'up-arrow-active':''"></div>
					<div class="down-arrow" :class="activeIndex==4&&priceOrder?'down-arrow-active':''"></div>
				</div>
			</div>
			<div class="header-item" @click="changeIndex(6)">
				<div class="header-item-text" :class="activeIndex==6?'item-active':''">筛选</div>
				<div :class="activeIndex?'':'active-line'"></div>
			</div>
		</div>

		<div class="goods-list-container" :style="{background:goodType == 1? '#f3f3f3':'#fff'}">
			<div class='goods-item-container' v-for="(item,index) in searchResultList"
			 :key="index">
				<product :product="item" />
				<!-- 份货商品 -->
				<!-- <block v-if="goodType==1">
					<goodsItem  @fhChangeColor='changColor' @fhChangeEllipsis='ellipsis' itemtype="fenhuo" :item='item' :myIndex="index" ></goodsItem>
				</block>
				<block v-else> 
					<product :product="item" />
				</block> -->
			</div>
			<div style="width:100%;">
				<load-more :loadMore="loadMore"></load-more>
			</div>
		</div>
	</div>
</template>

<script>
	import product from '../../components/product'
	import loadMore from '../../components/loadMore'
	import goodsItem from '../../components/goodsItem'


	var page = 1,
		pageSize = 10;
	export default {
		name: "searchResult",
		components: {
			product,
			loadMore,
			goodsItem
		},
		data() {
			return {
				activeIndex: 1, //0销售 1价格
				priceOrder: true, //false是默认顺序即升序 true是降序
				loadMore: 1,
				keyword: '',
				showClearBtn: false,
				searchResultList: [{
					pic_urls: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
					stocksnum: 10,
					goods_type: 1,
					price_market: 123,
					code: 123213,
					
					title: '张阿第三方第三方飞',
					price: '123',
					nub: 123
				}],
				ordertype: 1,
				nav_id: '', //导航id
				catid: '', //
				type: 0, //0:普通搜索进来,1:分类点击进来 
				goodType: 0, // 0 : 挑款商品 ,1:份货商品
			}
		},
		methods: {
			toSearchResult() {
				this.searchResultList.push({
					pic_urls: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200613/a5e893120f8c105b672586e160ba21c9.jpg',
					stocksnum: 10,
					goods_type: 1,
					price_market: 123,
					code: 123213,
					title: '张阿第三方第三方飞',
					price: '123',
					nub: 123
				})
			},
			initData() {
				page = 1
				pageSize = 10
			},
			ellipsis(index) {
				this.searchResultList[index].descShow = !this.searchResultList[index].descShow
			},
			changColor(index, index2, item, num) {
				this.searchResultList[index].colorChooseIndex = index2
				let price = 0
				item.stockarr.wholesale_price_arr.forEach(items => {
					if (num <= items.max && num >= items.min) {
						price = items.price
					}
				})
				if (price == 0) { //没有区间,就区最大的数量的价格
					let maxArr = item.stockarr.wholesale_price_arr.slice(0)
					maxArr.reverse((a, b) => {
						console.log(a.max)
						return a.max > b.max
					})
					this.searchResultList[index].preferPrice = maxArr[0].price
				} else {
					this.searchResultList[index].preferPrice = price
				}
				this.$forceUpdate()
			},
			changeIndex(index) {
				switch (index) {
					case 1:
						this.priceOrder = true;
						this.activeIndex = index
						this.ordertype = index
						page = 1;
						this.getDataList()
						break;
					case 3:
						this.priceOrder = true;
						this.activeIndex = index
						this.ordertype = index
						page = 1;
						this.getDataList()
						break;
					case 4:
						this.activeIndex = index
						this.priceOrder = !this.priceOrder;
						if (this.priceOrder == false) {
							this.ordertype = 4; //4价格顺序
						}
						if (this.priceOrder == true) {
							this.ordertype = 5; //5价格倒序
						}
						page = 1;
						this.getDataList()
						break;
					case 6:
						this.priceOrder = true;
						this.activeIndex = index
						this.ordertype = 3
						page = 1;
						this.getDataList()
						break;
					default:
						break;
				}
				// this.activeIndex=index;
				// if(this.activeIndex==4){
				//   this.priceOrder=!this.priceOrder;
				//   if(this.priceOrder==false){
				//     this.ordertype=4;   //4价格顺序
				//     page=1;
				//     this.keyWordSearch();
				//   }
				//   if(this.priceOrder==true){
				//     this.ordertype=5;   //5价格倒序
				//     page=1;
				//     this.keyWordSearch();
				//   }
				//   return
				// }

				// if(this.activeIndex==1 || this.activeIndex==3){
				//   this.priceOrder=true;
				//   this.ordertype=this.activeIndex;   //3销量
				//   page=1;
				//   this.keyWordSearch();
				// }

			},
			keyWordSearch() {
				this.loadMore = 2;
				this.$fly.post(this.$api.keyWordSearch, {
					page: page,
					pageSize: pageSize,
					search_type: 0, //0搜索商品 1搜索分类
					ordertype: this.ordertype, //1 时间 3.销量  4 价格顺序 5价格倒序   
					keyword: this.keyword,
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
			keyWordFenhuoSearch() {
				this.loadMore = 2;
				let filterId = {
					ordertype: this.ordertype,
					keyword: this.keyword
				}
				let params = Object.assign(filterId, {
					page,
					pageSize
				})
				this.$fly.post(this.$api.goodlistfh, params).then(res => {
					if (res.status == 1) {
						res.data.list.filter(item => {
							item.descShow = false
							item.colorChooseIndex = 0
							// let keyStr = item.stockarr.colorarr[0].color_id+'-'+item.stockarr.sizearr[0].size_id
							item.stockarr.colorarr.reverse((a, b) => {
								return a.color > b.color
							})
							// item.keyStr = keyStr
							let num = item.stockarr.colorarr[0].color
							let price = 0
							item.stockarr.wholesale_price_arr.forEach(item => {
								if (num <= Number(item.max) && num >= Number(item.min)) {
									price = item.price
								}
							})
							if (price == 0) { //没有区间,就区最大的数量的价格
								let maxArr = item.stockarr.wholesale_price_arr.slice(0)
								maxArr.reverse((a, b) => {
									console.log(a.max)
									return a.max > b.max
								})
								item.preferPrice = maxArr[0].price
							} else {
								item.preferPrice = price
							}
							// console.log(item.preferPrice,num)
						})
						if (page == 1) {
							this.searchResultList = res.data.list;
						} else {
							if (res.data.list.length > 0)
								this.searchResultList = this.goodlistfh.concat(res.data.list);
						}
						if (res.data.list.length < pageSize) {
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
				if (this.keyword && this.goodType == 0) {
					this.keyWordSearch();
				} else if (this.keyword && this.goodType == 1) {
					this.keyWordFenhuoSearch();
				} else if (this.nav_id) {
					this.catid = this.catid
					this.getClassGood()
				}
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
			this.toSearchResult()
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
