<template>
	<view class="list">
		<view class="search">
			<searchBar @sureBtn="search" placeholder="搜索我的订单" btnText="搜索"></searchBar>
		</view>
		<view class="nav">
			<orderNav :navIndex="nowNavIndex" :navList="navList" @change="changeNav"></orderNav>
		</view>
		<view class="order-list">
			<block v-for="(item,index) in list" :key="index">
				<orderItem
					@toDetail="toDetail"
					@toExpress="toExpress"
					@toPay="toPay"
					@toReceipt="toReceipt"
					@addToCar="addToCar"
					@toDelete="toDelete" 
					@handleToRefund="handleToRefund"
					:detail="item"></orderItem>
			</block>
			<load-more :status="loadMoreType"></load-more>
		</view>
	</view>
</template>

<script>
	import orderNav from "@/components/orderNav.vue"
	import searchBar from "@/components/searchBar.vue"
	import orderItem from '@/components/center/orderItem'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
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
				keyWord: '',
				list: [],
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
						name: '待发货'
					},
					{
						ids: 3,
						name: '已发货'
					},
					{
						ids: 4,
						name: '已完成'
					},
				],
				page: 0,
				pageSize: 10,
				nowNavIndex: 0,
				loadMoreType: 1
			};
		},
		methods: {
			changeNav(ids) {
				if (this.nowNavIndex == ids) return
				this.nowNavIndex = ids
				this.page = 0
				this.list = []
				this.loadMoreType = 1
				this.getOrderData()
			},
			// 处理数据
			dataToThin(data) {
				return data
			},
			//获取订单信息
			getOrderData() {
				this.loadMoreType = 2;
				this.$fly.post(this.$api.myOrder, {
					page: this.page,
					pageSize: this.pageSize,
					statu_stype: this.nowNavIndex,
					keyword:this.keyWord
				}).then(res => {
					var data = this.dataToThin(res.data.list);
					this.list = this.list.concat(data);
					if (data.length < this.pageSize) {
						this.loadMoreType = 3;
					} else {
						this.loadMoreType = 1;
					}
				})
			},
			toDetail(id){
				wx.navigateTo({
					url:"./orderDetail?order_id="+id
				})
			},
			toExpress(id){
				wx.navigateTo({
					url:"./logistics?order_id="+id
				})
			},
			toPay(id){
				// TODO: 二次支付
				wx.navigateTo({
					url:'../../shopCart/submitOrder?orderId='+id
				})
			},
			toReceipt(id){
				this.changeStatus({
					order_id:id,
					status:3
				})
			},
			addToCar(id){
				let item = this.list.filter(v=>v.id==id)[0]
				console.log(item)
				let data = []
				item.products_list.forEach(item=>{
					let goods = item.goodlist
					goods.forEach(el=>{
						data.push({
							goods_id:el.goods_id,
							goods_num:el.goods_num,
							product_id:el.product_id
						})
					})
				})
				uni.showLoading({
					title:'请稍后'
				})
				this.$fly.post(this.$api.addCart,{
					jsonstr:JSON.stringify(data),
					type:1
				}).then(res=>{
					uni.showToast({
						title:res.msg || '加入成功',
						duration:1500
					})
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			toDelete(id){
				this.changeStatus({
					order_id:id,
					status:1
				})
			},
			// 1'删除订单，'2'取消订单，'3'确认收货，
			changeStatus({
				order_id,
				status
			}) {
				this.$tip.loading('正在处理')
				this.$fly.post(this.$api.changeOrderStatus, {
					order_id: order_id,
					status: status
				}).then(res => {
					this.$tip.loaded();
					this.page = 0;
					this.list = []
					this.getOrderData();
					this.$tip.toast(res.msg)
				})
			},
			search(e) {
				this.keyWord = e
				this.page = 0
				this.list = []
				this.loadMoreType = 1
				this.getOrderData()
			},
			handleToRefund(info){
				wx.navigateTo({
					url:'../refund/applyRefund?info='+JSON.stringify(info)
				})
			}
		},
		onReachBottom() {
			if (this.loadMoreType == 1) {
				this.page++
				this.getOrderData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		min-height: 100vh;
		background: #f3f3f3;
	}

	.search {
		position: sticky;
		top: 0;
	}

	.nav {
		position: sticky;
		top: 80rpx;
	}

	.order-list {
		padding: 20rpx 20rpx 20rpx;

	}
</style>
