<template>
	<view class="recommend">
		<!-- <view class="poster"> -->
			<image class="poster" src="https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200707/e2345a113990f00faa21c7f13de0f87a.png" mode=""></image>
		<!-- </view> -->
		<view class="recommend-box">
			<view v-for="(item,index) in list"  :key="index" @click="toDetail(item.id)">
				<goodItem itemtype="timeLimite" :item="item"></goodItem>
			</view>
			<load-more  :status="loadMore"></load-more>
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
			share(e){
			
			},
			toDetail(id){
				uni.navigateTo({
					url:'/pages/good/goodDetail?id='+id
				})
			},
		},
		onShareAppMessage() {
			return {
				title:'限时抢购'
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.recommend{
	padding-bottom: 30rpx;
	padding-top: 287rpx;
	.poster{
		width:100%;
		height:382rpx;
		position: absolute;
		left:0;
		top:0;
		z-index:-1 ;
	}
	.recommend-box{
		margin: 0 20rpx;
		text-align: center;
		z-index: 1;
		overflow: hidden;
		border-radius: 10rpx;
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
