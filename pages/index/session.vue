<!--专场 -->
<template>
	<view class="session">
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
		<div class="good-list">
			<div v-for="(item,index) in list"  :key="index" @click="toDetail(item.id)">
				<goodItem itemtype="sessionItem" :item="item"></goodItem>
			</div>
			<load-more  :status="loadMore"></load-more>
		</div>
	</view>
</template>

<script>
	import goodItem from '@/components/goodsItem.vue'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	export default {
		mixins:[loadMoreData],
		components:{
			goodItem,
			loadMore
		},
		data() {
			return {
				activeIndex:-1,
				ordertype: 1,
				nav_id: '', //导航id
				catid: '', //
				type: 0, //0:普通搜索进来,1:分类点击进来 
				priceOrder: true, //false是默认顺序即升序 true是降序
				loadMore: 1,
				list:[
					{
						name :'分阿里交付的拉丝粉',
						desc:'2020新款木马短袖女童连衣裙宝宝夏装纯棉',
						oPrice:199,
						price:80,
					},
					{
						name :'分阿里交付的拉丝粉',
						desc:'2020新款木马短袖女童连衣裙宝宝夏装纯棉',
						oPrice:199,
						price:80,
					},
					{
						name :'分阿里交付的拉丝粉',
						desc:'2020新款木马短袖女童连衣裙宝宝夏装纯棉',
						oPrice:199,
						price:80,
					}
				],
			};
		},
		methods:{
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
				
						uni.navigateTo({
							url:'/pages/search/searchFilters'
						})
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
