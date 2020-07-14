<template>
	<view class="store_data">
		<view class="visitors" style="background: url(https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200714/66749b59c21f4c9f0ef21b627675d7e9.png) no-repeat;background-size: 100% 100%;">
			<view class="list">
				<view class="item">
					<text class="num">{{storeData.todayVisitNum || 0}}</text>
					<text class="name">今日访客数</text>
				</view>
				<view class="item">
					<text class="num">{{storeData.weekVisitNum || 0}}</text>
					<text class="name">本周访客数</text>
				</view>
				<view class="item">
					<text class="num">{{storeData.monVisitNum || 0}}</text>
					<text class="name">本月访客数</text>
				</view>
			</view>
		</view>
		<view class="turnover">
			<view class="list">
				<view class="item">
					<view class="num">
						<text>¥</text>
						<text>{{storeData.todaymoney || 0}}</text>
					</view>
					<view class="name">
						<text>今日成交额</text>
					</view>
				</view>
				<view class="item">
					<view class="num">
						<text>¥</text>
						<text>{{storeData.weekmoney || 0}}</text>
					</view>
					<view class="name">
						<text>本周成交额</text>
					</view>
				</view>
				<view class="item">
					<view class="num">
						<text>¥</text>
						<text>{{storeData.monmoney || 0}}</text>
					</view>
					<view class="name">
						<text>本月成交额</text>
					</view>
				</view>
			</view>
		</view>
		<view class="today">
			<view class="title">
				<text>今日访客</text>
			</view>
			<view class="nav">
				<view class="item">
					<view class="name">
						<text>微信昵称</text>
					</view>
				</view>
				<view class="item border">
					<view class="name">
						<text>注册时间</text>
					</view>
				</view>
				<view class="item">
					<view class="name">
						<text>购买金额</text>
					</view>
				</view>
			</view>
			<view class="list">
				<view v-for="item in list" :key="item.id" class="item">
					<view class="nickname">
						{{item.nickname}}
					</view>
					<view class="time">
						<text>{{$utils.formatTime(item.createtime*1000,'yyyy-MM-dd')}}</text>
					</view>
					<view class="total">
						<text>{{item.buy_money}}</text>
					</view>
				</view>
				<view class="loadmore">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		name: "storeData",
		components:{
			uniLoadMore
		},
		data() {
			return {
				loadingType: 1,
				page:0,
				pageSize:15,
				storeData:{},
				list:[]
			};
		},
		mounted() {
			this.getMyStoreInfo()
			this.getVisitInfo()
		},
		onReachBottom() {
			if (this.loadingType == 2 || this.loadingType == 3) return
			this.page++
			this.getVisitInfo()
		},
		methods:{
			getMyStoreInfo(){
				uni.showLoading()
				this.$fly.post(this.$api.getMyStoreInfo).then(res=>{
					this.storeData = res.data
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			getVisitInfo(){
				this.loadingType = 2
				this.$fly.post(this.$api.getVisitInfo,{
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					this.list = this.list.concat(res.data.list)
					this.list = this.list.concat(res.data.list)
					if(res.data.list.length<this.pageSize){
						this.loadingType = 3
					}else{
						this.loadingType = 1
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.store_data {
		min-height: 100%;
		overflow: hidden;
		background-color: #F3F3F3;
		view{
			box-sizing: border-box;
		}
		.visitors {
			height: 205rpx;
			overflow: hidden;

			.list {
				width: 710rpx;
				height: 164rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 10rpx;
				margin: 40rpx 20rpx 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 50rpx 54rpx 40rpx 54rpx;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.num {
						height: 26rpx;
						line-height: 26rpx;
						font-size: 36rpx;
						font-family: DINPro;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.name {
						height: 26rpx;
						line-height: 26rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin-top: 20rpx;
					}
				}
			}
		}
		.turnover{
			.list {
				width: 710rpx;
				height: 164rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 10rpx;
				margin: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 50rpx 54rpx 40rpx 54rpx;
			
				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
			
					.num {
						height: 26rpx;
						line-height: 26rpx;
						font-size: 36rpx;
						font-family: DINPro;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						>text:nth-child(1){
							font-size: 24rpx;
						}
					}
			
					.name {
						height: 26rpx;
						line-height: 26rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin-top: 20rpx;
					}
				}
			}
		}
		.today{
			margin: 20rpx;
			background-color: #fff;
			padding-bottom: 82rpx;
			.title{
				width:710rpx;
				height:90rpx;
				background:rgba(255,101,142,1);
				border-radius:10rpx 10rpx 0rpx 0rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
			.nav {
				display: flex;
				align-items: center;
				height: 90rpx;
				border-bottom: 1rpx solid #EEEEEE;
			
				.item {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
			
					.name {
						height: 28rpx;
						font-size: 28rpx;
						line-height: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
			
						&.active {
							color: #F22732;
						}
					}
			
					&.border {
						border-left: 1rpx solid #EEEEEE;
						border-right: 1rpx solid #EEEEEE;
					}
				}
			}
			
			.list{
				.item{
					height: 105rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #EEEEEE;
					.nickname,.time,.total{
						flex: 1;
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.total{
						font-weight:500;
						color:rgba(51,51,51,1);
					}
				}
				.loadmore{
					padding-top: 50rpx;
				}
			}
		}
	}
</style>
