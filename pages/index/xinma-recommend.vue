<template>
	<view class="recommend">
		<!-- <view class="poster"> -->
			<image class="poster" src="https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg" mode=""></image>
		<!-- </view> -->
		<view class="recommend-box">
			<view class="r-title flex-center">
				<image src="../../static/images/icon/heart.png" mode=""></image>
				<span>推荐榜单</span>
				<image src="../../static/images/icon/heart.png" mode=""></image>
			</view>
			<view v-for="(item,index) in list"  :key="index" @click="toDetail(item.id)">
				<goodItem :item="item"></goodItem>
			</view>
			<load-more  :status="loadMore"></load-more>
		</view>
		<fixedIcon ref="backTop" @tirggter="tirggterFixed" :showItem='showItem'></fixedIcon>
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
			tirggterFixed(e){
				
			},
			toDetail(id){
				uni.navigateTo({
					url:'/pages/good/goodDetail?id='+id
				})
			},
		},
		onShareAppMessage() {
			return {
				title:'晴妈推荐'
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.recommend{
	background: #FFE1E1;
	padding-bottom: 30rpx;
	min-height: 100vh;
	.poster{
		width:100%;
		height:360rpx;
		margin-bottom: 60rpx;
	}
	.recommend-box{
		padding: 0 20rpx;
		text-align: center;
		.r-title{
			image{
				width: 39rpx;
				height: 39rpx;
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
