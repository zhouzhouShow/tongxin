<template>
	<view class="member">
		<view class="info" style="background: url(../../static/images/center/invite_top_bg.png) no-repeat;background-size: 100% 100%;">
			<view class="list">
				<view class="item">
					<text class="num">200</text>
					<text class="name">今日浏览量</text>
				</view>
				<view class="item">
					<text class="num">300</text>
					<text class="name">已邀会员</text>
				</view>
				<view class="item">
					<text class="num">25</text>
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
			<view class="btn">
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
				<view :class="['name',sortType==0 || sortType==1?'active':'']">
					<text>注册时间</text>
				</view>
				<view class="arrow">
					<image v-if="sortType==0" src="../../static/images/center/arrow_top_active.png" mode=""></image>
					<image v-else src="../../static/images/center/arrow_top.png" mode=""></image>
					<image v-if="sortType==1" src="../../static/images/center/arrow_bottom_active.png" mode=""></image>
					<image v-else src="../../static/images/center/arrow_bottom.png" mode=""></image>
				</view>
			</view>
			<view @click="handleChangeAmountSort" class="item">
				<view :class="['name',sortType==2||sortType==3?'active':'']">
					<text>购买金额</text>
				</view>
				<view class="arrow">
					<image v-if="sortType==2" src="../../static/images/center/arrow_top_active.png" mode=""></image>
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
					<text>{{item.register_time}}</text>
				</view>
				<view class="total">
					<text>{{item.total}}</text>
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
				loadingType: 0,
				searchText: '',
				sortTypeList: ['timeup', 'timedown', 'amountup', 'amountdown'],
				sortType: 1,
				list:[
					{
						id:1,
						nickname:'nickname',
						register_time:'2020-06-30',
						total:500
					},
					{
						id:2,
						nickname:'nick',
						register_time:'2020-06-30',
						total:704
					},
					{
						id:3,
						nickname:'nams',
						register_time:'2020-06-30',
						total:88.9
					}
				]
			};
		},
		methods: {
			handleChangeTimeSort() {
				switch (this.sortType) {
					case 0:
						this.sortType = 1
						break;
					case 1:
						this.sortType = 0
						break;
					case 2:
						this.sortType = 1
						break;
					case 3:
						this.sortType = 1
						break;
					default:
						this.sortType = 1
						break;
				}
			},
			handleChangeAmountSort() {
				switch (this.sortType) {
					case 0:
						this.sortType = 3
						break;
					case 1:
						this.sortType = 3
						break;
					case 2:
						this.sortType = 3
						break;
					case 3:
						this.sortType = 2
						break;
					default:
						this.sortType = 3
						break;
				}
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
				bottom: 30rpx;
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
