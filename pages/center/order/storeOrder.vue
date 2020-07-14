<template>
	<view class="store_order">
		<view class="nav">
			<orderNav :navList="navList" @change="changeNav"></orderNav>
		</view>
		<view class="list">
			<view @click="handleToDetail(item.id)" v-for="item in list" :key="item.id" class="item">
				<view class="header">
					<view class="userinfo">
						<text>{{item.userinfo.nickname}}</text>
						<text>{{item.userinfo.mobile}}</text>
					</view>
					<view class="status">
						<text>{{status[item.final_flag]}}</text>
					</view>
				</view>
				<view class="product">
					<list>
						<view v-for="(el,num) in item.products_list" :key="num">
							<view v-for="(e,s) in el.goodlist" :key="s" class="product_item">
								<productItem :info="e"></productItem>
							</view>
						</view>
					</list>
				</view>
				<view class="total">
					<view class="left">
						<text>总价</text>
						<text>¥ {{item.price_sum}}</text>
					</view>
					<view class="right">
						<text>实付款</text>
						<text>¥ {{item.last_money}}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import orderNav from "@/components/orderNav.vue"
	import productItem from "@/components/productItem.vue"
	export default {
		name: "storeOrder",
		components: {
			uniLoadMore,
			orderNav,
			productItem
		},
		data() {
			return {
				loadingType: 1,
				navList: [{
						ids: 0,
						name: '全部'
					},
					{
						ids: 1,
						name: '待付款'
					},
					{
						ids: 2,
						name: '待收货'
					},
					{
						ids: 3,
						name: '已收货'
					},
					{
						ids: 4,
						name: '已退款'
					},
				],
				nowNavIndex: 0,
				status: ['全部','待付款','待发货', '待收货', '已收货', '已取消'],
				page:0,
				pageSize:15,
				list: []
			};
		},
		onReachBottom() {
			if (this.loadingType == 2 || this.loadingType == 3) return
			this.page++
			this.getMySubOrder()
		},
		mounted(){
			this.getMySubOrder()
		},
		methods: {
			handleToDetail(id) {
				wx.navigateTo({
					url:'./storeOrderDetail?id='+id
				})
			},
			getMySubOrder(){
				this.loadingType = 2
				this.$fly.post(this.$api.getMySubOrder,{
					page:this.page,
					pageSize:this.pageSize,
					statu_stype:this.nowNavIndex
				}).then(res=>{
					this.list = this.list.concat(res.data.list)
					if(res.data.list.length<this.pageSize){
						this.loadingType = 3
					}else{
						this.loadingType = 1
					}
				})
			},
			changeNav(ids) {
				if(this.nowNavIndex==ids) return
				this.nowNavIndex = ids
				this.page = 0
				this.list = []
				this.getMySubOrder()
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.store_order {
		min-height: 100%;
		overflow: hidden;
		background-color: #F3F3F3;

		.nav {
			position: fixed;
			top: 0;
		}

		.list {
			padding-top: 90rpx;

			.item {
				width: 710rpx;
				margin: 20rpx;
				background-color: #fff;
				border-radius: 10px;
				padding: 40rpx 30rpx 30rpx 30rpx;

				.header {
					font-size: 30rpx;
					line-height: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 30rpx;

					.status {
						color: #FFB44F;
					}
				}

				.product {
					&_item{
						margin-bottom: 30rpx;
					}
				}

				.total {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					margin-top: 40rpx;
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 28rpx;

					.left {
						color: #999999;
					}

					.right {
						margin-left: 30rpx;
						color: #666666;
					}
				}
			}
		}
	}
</style>
