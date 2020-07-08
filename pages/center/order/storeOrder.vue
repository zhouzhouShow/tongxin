<template>
	<view class="store_order">
		<view class="nav">
			<orderNav :navList="navList" @change="changeNav"></orderNav>
		</view>
		<view class="list">
			<view v-for="item in list" :key="item.id" class="item">
				<view class="header">
					<view class="userinfo">
						<text>{{item.userInfo.nickname}}</text>
						<text>{{item.userInfo.mobile}}</text>
					</view>
					<view class="status">
						<text>{{status[item.status]}}</text>
					</view>
				</view>
				<view class="product">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import orderNav from "@/components/orderNav.vue"
	export default {
		name: "storeOrder",
		components: {
			uniLoadMore,
			orderNav
		},
		data() {
			return {
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
				status:['待付款','待收货','已收货','已退款'],
				list:[
					{
						id:1,
						userInfo:{
							nickname:'nickname',
							mobile:'185****2525',
							avatar:''
						},
						status:1,
						total:88,
						pay:88,
						productList:[
							{
								id:1,
								cover:'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
								name:'2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 ',
								number:1,
								price:88,
								discount:0.7,
								discountText:'7折',
								spec:'粉色；120cm'
							}
						]
					}
				]
			};
		},
		methods: {
			changeNav(ids) {
				this.nowNavIndex = ids
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F3F3;

		view {
			box-sizing: border-box;
		}
	}

	.store_order {
		padding-top: 90rpx;
		.nav{
			position: fixed;
			top: 0;
		}
		.list{
			.item{
				
			}
		}
	}
</style>
