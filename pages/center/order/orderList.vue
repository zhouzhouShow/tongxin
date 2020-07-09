<template>
	<view class="orderList">
		<view class="search">
			<searchBar @sureBtn="search" placeholder="搜索我的订单" btnText="搜索"></searchBar>
		</view>
		<view class="nav">
			<orderNav :navList="navList" @change="changeNav"></orderNav>
		</view>
		<view class="order-list">
			<block v-for="(item,index) in list" :key="index"></block>
			<orderItem :brandItem="item"></orderItem>
			<load-more  :status="loadMore"></load-more>
		</view>
	</view>
</template>

<script>
	import orderNav from "@/components/orderNav.vue"
	import searchBar from "@/components/searchBar.vue"
	import orderItem from '@/components/center/orderItem'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	export default {
		mixins:[loadMoreData],
		components:{
			searchBar,
			orderNav,
			orderItem,
			loadMore
		},
		data() {
			return {
				keyWord:'',
				list:[],
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
			};
		},
		methods:{
			changeNav(ids) {
				this.nowNavIndex = ids
			},
			search(e){
				this.keyWord = e
				console.log(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.orderList{
		min-height: 100vh;
		background: #f3f3f3;
	}
	.search{
		position: sticky;
		top: 0;
	}
	.nav {
		position: sticky;
		top: 90rpx;
	}
	.order-list{
		padding: 20rpx 20rpx 20rpx;
		
	}
</style>
