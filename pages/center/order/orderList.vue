<template>
	<view class="list">
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
		onLoad(option) {
		  this.nowNavIndex = option.idx || 0;
		  this.list = []
		  this.page = 1
		  this.getOrderData();
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
				page:1,
				pageSize:10,
				nowNavIndex: 0,
			};
		},
		methods:{
			changeNav(ids) {
				this.nowNavIndex = ids
			},
			// 处理数据
			dataToThin(data){
				return data
			},
			//获取订单信息
			getOrderData() {
			  this.loadMore = 2;
			  this.$fly.post(this.$api.myOrder, {
			    page: this.page,
			    pageSize: this.pageSize,
			    statu_stype: this.itemAc,
			    pay_type: this.pay_type
			  }).then(res => {
			    // initData = initData.concat(JSON.parse(JSON.stringify(res.data.list)));
			    var data = this.dataToThin(res.data.list);
			    // console.log(data)
			    if (this.page == 1) {
			      this.list = data;
			    } else {
			      if (data.length > 0) {
			        this.list = this.list.concat(data);
			      }
			    }
			    if (data.length < this.pageSize) {
			      this.loadMore = 3;
			    } else {
			      this.page++
			      this.loadMore = 1;
			    }
			  })
			},
			//取消订单 // 确定收货 //退款
			changeStatus({id, status}) {
			  this.$tip.loading('正在处理')
			  this.$fly.post(this.$api.changeOrderStatus, {
			    id: id,
			    status: status
			  }).then(res => {
			    this.$tip.loaded();
			    this.page = 1;
			    this.getOrderData();
			    this.$tip.toast(res.msg)
			  })
			},
			search(e){
				this.keyWord = e
				console.log(e)
			},
		},
			onReachBottom() {
      if (this.loadMore == 1) {
        this.getOrderData();
      }
    }
	}
</script>

<style lang="scss" scoped>
	.list{
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
