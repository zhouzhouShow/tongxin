<template>
	<view class="member">
		<view class="info" style="background: url(https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200716/78726feeb59a5765b60b2cb638254d3d.png) no-repeat;background-size: 100% 100%;">
			<view class="list">
				<view class="item">
					<text class="num">{{numberInfo.todayVisitNum}}</text>
					<text class="name">今日浏览量</text>
				</view>
				<view class="item">
					<text class="num big">{{numberInfo.userNum}}</text>
					<text class="name">已邀会员</text>
				</view>
				<view class="item">
					<text class="num">{{numberInfo.yesUserNum}}</text>
					<text class="name">昨日新增会员</text>
				</view>
			</view>
		</view>
		<view class="search">
			<view class="icon">
				<image src="../../static/images/center/icon_search.png" mode="scaleToFill"></image>
			</view>
			<view class="input">
				<input type="text" v-model="searchText" placeholder="搜索昵称" />
			</view>
			<view @click="handleSearch" class="btn">
				<text>搜索</text>
			</view>
		</view>
		<view class="nav">
			<view class="item">
				<view class="name">
					<text>微信昵称</text>
				</view>
			</view>
			<view @click="handleChangeTimeSort" class="item border">
				<view :class="['name',sortType==1 || sortType==2?'active':'']">
					<text>注册时间</text>
				</view>
				<view class="arrow">
					<image v-if="sortType==2" src="../../static/images/center/arrow_top_active.png" mode=""></image>
					<image v-else src="../../static/images/center/arrow_top.png" mode=""></image>
					<image v-if="sortType==1" src="../../static/images/center/arrow_bottom_active.png" mode=""></image>
					<image v-else src="../../static/images/center/arrow_bottom.png" mode=""></image>
				</view>
			</view>
			<view @click="handleChangeAmountSort" class="item">
				<view :class="['name',sortType==3||sortType==4?'active':'']">
					<text>购买金额</text>
				</view>
				<view class="arrow">
					<image v-if="sortType==4" src="../../static/images/center/arrow_top_active.png" mode=""></image>
					<image v-else src="../../static/images/center/arrow_top.png" mode=""></image>
					<image v-if="sortType==3" src="../../static/images/center/arrow_bottom_active.png" mode=""></image>
					<image v-else src="../../static/images/center/arrow_bottom.png" mode=""></image>
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
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		name: "inviteMember",
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingType: 1,
				searchText: '',
				sortType: 1,
				page:1,
				pageSize:15,
				numberInfo:{},
				list:[]
			};
		},
		mounted() {
			this.getMyMemberNumLog()
			this.getMyMemberList()
		},
		onReachBottom() {
			if (this.loadingType == 2 || this.loadingType == 3) return
			this.page++
			this.getMyMemberList()
		},
		methods: {
			getMyMemberNumLog() {
				uni.showLoading()
				this.$fly.post(this.$api.getMyMemberNumLog).then(res=>{
					this.numberInfo = res.data
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			getMyMemberList(){
				this.loadingType = 2
				this.$fly.post(this.$api.getMyMemberList,{
					page:this.page,
					pageSize:this.pageSize,
					orderType:this.sortType,
					nickname:this.searchText
				}).then(res=>{
					this.list = this.list.concat(res.data.list)
					if(res.data.list.length<this.pageSize){
						this.loadingType = 3
					}else{
						this.loadingType = 1
					}
				})
			},
			handleSearch() {
				this.page = 1
				this.list = []
				this.getMyMemberList()
			},
			handleChangeTimeSort() {
				switch (this.sortType) {
					case 1:
						this.sortType = 2
						break;
					case 2:
						this.sortType = 1
						break;
					case 3:
						this.sortType = 1
						break;
					case 4:
						this.sortType = 1
						break;
					default:
						this.sortType = 1
						break;
				}
				this.page = 1
				this.list = []
				this.getMyMemberList()
			},
			handleChangeAmountSort() {
				switch (this.sortType) {
					case 1:
						this.sortType = 3
						break;
					case 2:
						this.sortType = 3
						break;
					case 3:
						this.sortType = 4
						break;
					case 4:
						this.sortType = 3
						break;
					default:
						this.sortType = 3
						break;
				}
				this.page = 1
				this.list = []
				this.getMyMemberList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.member {
		view {
			box-sizing: border-box;
		}
		.info {
			width: 750rpx;
			height: 265rpx;

			.list {
				padding: 115rpx 70rpx 0 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.num {
						height: 26rpx;
						font-size: 36rpx;
						font-family: DINPro;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						line-height: 26rpx;
						&.big{
							font-size: 48rpx;
						}
					}

					.name {
						margin-top: 30rpx;
						height: 25rpx;
						font-size: 26rpx;
						line-height: 25rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}

		.search {
			padding: 43rpx 30rpx 13rpx 30rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.icon {
				position: absolute;
				left: 50rpx;
				bottom: 39rpx;
				width: 30rpx;
				height: 30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.input {
				width: 604rpx;
				height: 62rpx;
				background: rgba(243, 243, 243, 1);
				border-radius: 31rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				padding: 0 60rpx;
				display: flex;
				align-items: center;

				input {
					width: 100%;
				}
			}

			.btn {
				height: 30rpx;
				line-height: 30rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
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

				.arrow {
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					image {
						width: 18rpx;
						height: 10rpx;
						margin: 3rpx 0;
					}
				}

				&.border {
					border-left: 1rpx solid #EEEEEE;
					border-right: 1rpx solid #EEEEEE;
				}
			}
		}
		
		>.list{
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
		}
	}
</style>
