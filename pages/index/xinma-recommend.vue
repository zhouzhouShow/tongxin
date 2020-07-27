<template>
		<view class="recommend">
			<!-- <view class="poster"> -->
				<image class="poster" src="https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200715/2f4b3a7e393070013718756d6b9e2e56.png" mode=""></image>
			<!-- </view> -->
			<view class="recommend-box">
				<view class="r-title flex-center">
					<image src="../../static/images/icon/heart.png" mode=""></image>
					<span>推荐榜单</span>
					<image src="../../static/images/icon/heart.png" mode=""></image>
				</view>
				<view v-for="(item,index) in list"  :key="index" @click="toDetail(item.goods_id)">
					<goodItem :itemHeight="218" :item="item"></goodItem>
				</view>
				<load-more v-if="loadMore != 3"  :status="loadMore"></load-more>
			</view>
			<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
		</view>
</template>

<script>
	import goodItem from '@/components/goodsItem.vue'
	import fixedIcon from '@/components/fixedIcon.vue'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	export default {
		mixins:[loadMoreData],
		components:{
			goodItem,
			fixedIcon,
			loadMore
		},
		data() {
			return {
				showItem:{
					cart:true,
					share:true,
					backTop:true,
				},
				list:[],
				
			};
		},
		onLoad(){
			this.getGood()
		},
		methods:{
			share(e){
				
			},
		 async getGood(){
				this.$tip.loading()
				let params = {
					page: this.page,
					pageSize: this.pageSize,
					goodsNav:1,
				}
				await this.$fly.post(this.$api.goodslist,params).then(res=>{
					let list = res.data.list
					this.loadMoreStatusDeal(list)
					if(list.length>0){
						this.list = this.list.concat(list)
					}
				})
				this.timeOutLoaded();
			},
			toDetail(id){
				wx.navigateTo({
					url:'/pages/good/goodDetail?id='+id
				})
			},
			reachBottomCallBack(){
				this.getGood();
			},
		},
		onShareAppMessage(res) {
			this.$help.isBtnShare = true
			if (res.from === 'button') {
				// console.log(res.target);
			}
			return {
				title:'晴妈推荐',
				path: '/pages/index/index?h=2',
				success: function() {
					console.log('分享成功')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.recommend{
	background: #FFE1E1;
	min-height: 100vh;
	.poster{
		width:100%;
		height:360rpx;
		margin-bottom: 60rpx;
	}
	.recommend-box{
		padding: 0 20rpx 30rpx;
		text-align: center;
		.r-title{
			image{
				width: 40rpx;
				height: 40rpx;
			}
			image:nth-of-type(2){
				transform: rotateY(180deg);
			}
			span{
				margin:0 24rpx;
				font-size:40rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(223,70,78,1);
			}
			margin-bottom: 38rpx;
		}
		
	}
	
}
</style>
