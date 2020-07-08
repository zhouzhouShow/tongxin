<template>
	<view class="income">
		<view class="header_nav">
			<view @click="changeHeaderNav(nav.ids)" v-for="(nav,num) in headerNav" :key="num" class="item">
				<text>{{nav.name}}</text>
				<image v-if="nav.ids==headerNavIndex" src="../../static/images/center/icon_nav-active.png" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="info">
			<view class="info_box" style="background: url(../../static/images/center/income_top_bg.png) no-repeat;background-size: 100% 100%;">
				<view class="title">
					<text>今日收入（元）</text>
				</view>
				<view class="date">
					<text>2020-06-28</text>
				</view>
				<view class="total">
					<text>200.00</text>
				</view>
				<view class="tip">
					<text>返利说明</text>
				</view>
			</view>
		</view>
		<view class="list_nav">
			<view @click="changeListNav(nav.ids)" v-for="(nav,num) in listNav" :key="num" :class="['item',listNavIndex==nav.ids?'active':'']">
				<text>{{nav.name}}</text>
			</view>
		</view>
		<view class="list">
			<view v-for="item in list" :key="item.id" class="item">
				<view class="icon">
					<image v-if="item.type==1" src="../../static/images/center/icon_income.png" mode="scaleToFill"></image>
					<image v-else-if="item.type==2" src="../../static/images/center/icon_cash.png" mode="scaleToFill"></image>
					<image v-else-if="item.type==3" src="../../static/images/center/icon_refund.png" mode="scaleToFill"></image>
				</view>
				<view class="detail">
					<view class="about">
						<view class="name">
							<text>{{item.name}}</text>
						</view>
						<view class="time">
							<text>{{item.create_time}}</text>
						</view>
					</view>
					<view class="number">
						<view class="total">
							<text>{{item.total}}</text>
						</view>
						<view class="balance">
							{{item.balance}}
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		name: "income",
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingType: 0,
				headerNav: [{
						ids: 0,
						name: '今日',
					},
					{
						ids: 1,
						name: '本周',
					},
					{
						ids: 2,
						name: '本月',
					},
					{
						ids: 3,
						name: '累计',
					}
				],
				headerNavIndex: 0,
				listNav: [{
						ids: 0,
						name: '全部'
					},
					{
						ids: 1,
						name: '收入'
					},
					{
						ids: 2,
						name: '提现'
					},
					{
						ids: 3,
						name: '退款'
					},
				],
				listNavIndex: 0,
				list: [{
						id: 1,
						name: '收入',
						create_time: '2020-06-20',
						type: 1,
						total: 500,
						balance: 2000
					},
					{
						id: 2,
						name: '提现',
						create_time: '2020-06-20',
						type: 2,
						total: 500,
						balance: 2000
					},
					{
						id: 3,
						name: '退款',
						create_time: '2020-06-20',
						type: 3,
						total: 500,
						balance: 2000
					}
				],
			};
		},
		methods: {
			changeHeaderNav(ids) {
				if (this.headerNavIndex == ids) return
				this.headerNavIndex = ids
			},
			changeListNav(ids) {
				if (this.listNavIndex == ids) return
				this.listNavIndex = ids
			}
		}
	}
</script>

<style lang="scss" scoped>
	.income {
		overflow: hidden;
		min-height: 100%;
		background-color: #F3F3F3;
		view {
			box-sizing: border-box;
		}

		.header_nav {
			width: 750rpx;
			height: 90rpx;
			background: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			background-color: #fff;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-right: 85rpx;

				text {
					height: 32rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 51, 1)
				}

				image {
					width: 32rpx;
					height: 14rpx;
					margin-top: 7rpx;
				}
			}
		}

		.info {
			background-color: #fff;
			overflow: hidden;
			&_box{
				width: 710rpx;
				height: 250rpx;
				margin: 10rpx 20rpx 0 20rpx;
				position: relative;
				overflow: hidden;
				
				.title {
					height: 30rpx;
					font-size: 30rpx;
					line-height: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					margin: 40rpx 0 20rpx 40rpx;
				}
				
				.date {
					height: 20rpx;
					font-size: 28rpx;
					line-height: 20rpx;
					padding-left: 40rpx;
					font-family: DINPro;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
				
				.total {
					width: 100%;
					margin-top: 24rpx;
					height: 51rpx;
					font-size: 72rpx;
					line-height: 51rpx;
					font-family: DINPro;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					display: flex;
					justify-content: center;
				}
				
				.tip {
					position: absolute;
					top: 0;
					right: 0;
					width: 144rpx;
					height: 48rpx;
					background: rgba(255, 127, 24, 1);
					border-radius: 0rpx 10rpx 0rpx 10rpx;
					line-height: 48rpx;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}

		.list_nav {
			padding: 50rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			background-color: #fff;

			.item {
				width: 140rpx;
				height: 56rpx;
				border: 1rpx solid rgba(221, 221, 221, 1);
				margin-right: 20rpx;
				border-radius: 8rpx;
				line-height: 56rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);

				&.active {
					border-color: #F22732;
					color: #F22732;
				}
			}
		}

		.list {
			padding: 0 30rpx;
			background-color: #fff;

			.item {
				border-bottom: 1rpx solid #EEEEEE;
				padding: 30rpx 0;
				display: flex;

				.icon {
					flex-basis: 80rpx;
					width: 80rpx;
					height: 80rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.detail {
					flex: 1;
					margin-left: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.about {
						display: flex;
						flex-direction: column;
						justify-content: center;

						.name {
							height: 30rpx;
							font-size: 30rpx;
							line-height: 30rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
						}

						.time {
							height: 17rpx;
							font-size: 24rpx;
							line-height: 24rpx;
							margin-top: 15rpx;
							font-family: DINPro;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
						}
					}

					.number {
						display: flex;
						align-items: center;

						.total {
							height: 26rpx;
							font-size: 36rpx;
							font-family: DINPro;
							font-weight: 500;
							color: rgba(255, 180, 79, 1);
							line-height: 26rpx;
						}

						.balance {
							margin-left: 25rpx;
							height: 17rpx;
							font-size: 24rpx;
							font-family: DINPro;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							line-height: 17rpx;
						}
					}
				}

				&:nth-last-child(1) {
					border: none;
				}
			}
		}
	}
</style>
