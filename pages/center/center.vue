<template>
	<view class="center">
		<view class="userinfo" :style="[{'paddingTop':paddingTop + 'px'},{'background': 'url(../../static/images/center/center_top_bg.png) no-repeat'},{'background-size': '100% 100%'}]">
			<view class="title">
				<text>我的</text>
			</view>
			<view class="info">
				<view class="avatar">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="nickname">
					<view class="name">
						{{userInfo.nickname}}
					</view>
					<view class="type">
						<text>{{userInfo.is_vip?'代理会员':'普通会员'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="nav_box">
				<view class="nav">
					<view class="name">
						<text>我的订单</text>
					</view>
					<view class="tip">
						<text>查看全部订单</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view v-for="(el,num) in orderNav" :key="num" class="item">
					<image :src="el.icon" mode="scaleToFill"></image>
					<text>{{el.name}}</text>
				</view>
			</view>
		</view>
		<view v-if="userInfo.is_vip" class="income">
			<view @click="handleToMyIncome" class="nav_box">
				<view class="nav">
					<view class="name">
						<text>我的收益（元）</text>
					</view>
					<view class="tip">
						<text>查看详情</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="list">
					<view class="item">
						<text class="num">200</text>
						<text class="name">今日</text>
					</view>
					<view class="item">
						<text class="num">3000</text>
						<text class="name">本日</text>
					</view>
					<view class="item">
						<text class="num">5000</text>
						<text class="name">累计</text>
					</view>
				</view>
				<view class="bottom">
					<view class="total">
						<text>可提现（元）：</text>
						<text>88.88</text>
					</view>
					<view @click="handleToWithdraw" class="btn">
						<button type="default">提现</button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="userInfo.is_vip" class="store">
			<view class="nav_box">
				<view class="nav">
					<view class="name">
						<text>我的店铺</text>
					</view>
					<view class="tip">
						<text>查看店铺详情</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view @click="handleToMemberList" class="item">
					<text class="num">256</text>
					<text class="name">已邀会员</text>
				</view>
				<view @click="handleToStoreOrder" class="item">
					<text class="num">700</text>
					<text class="name">店铺订单</text>
				</view>
				<view @click="handleToStoreData" class="item">
					<text class="num">120</text>
					<text class="name">今日浏览</text>
				</view>
			</view>
		</view>
		<view class="service">
			<view class="nav_box">
				<view class="nav">
					<view class="name">
						<text>我的服务</text>
					</view>
					<view class="tip">
						<text>查看全部服务</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item">
					<image src="../../static/images/center/icon_coupon.png" mode="scaleToFill"></image>
					<text>优惠券</text>
				</view>
				<view class="item">
					<image src="../../static/images/center/icon_chat.png" mode="scaleToFill"></image>
					<text>帮助与客服</text>
				</view>
				<view class="item" @click.stop="nav('/pages/center/address/address')">
					<image src="../../static/images/center/icon_address.png" mode="scaleToFill"></image>
					<text>收货地址</text>
				</view>
				<view class="item">
					<image src="../../static/images/center/icon_us.png" mode="scaleToFill"></image>
					<text>关于我们</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "center",
		data() {
			return {
				paddingTop: 0,
				userInfo: {
					id: 99,
					nickname: '呢子dayi',
					avatar: require('../../static/images/center/icon_avatar.png'),
					seeding: 2,
					fans: 3200,
					desc: '',
					is_vip: true,
				},
				orderNav: [{
						ids: 0,
						name: '全部',
						icon: require('../../static/images/center/order_all.png')
					},
					{
						ids: 1,
						name: '待付款',
						icon: require('../../static/images/center/order_waitpay.png')
					},
					{
						ids: 2,
						name: '待发货',
						icon: require('../../static/images/center/order_waitrecive.png')
					},
					{
						ids: 3,
						name: '已发货',
						icon: require('../../static/images/center/order_shipped.png')
					},
					{
						ids: 4,
						name: '退货/售后',
						icon: require('../../static/images/center/order_return.png')
					},
				]
			}
		},
		onLoad() {
			this.paddingTop = wx.getMenuButtonBoundingClientRect().top
			wx.showTabBar()
		},
		mounted() {
			this.getCenterIndex()
		},
		methods: {
			nav(url){
				wx.navigateTo({
					url: url
				})
			},
			getCenterIndex() {
				this.$fly.post(this.$api.getCenterIndex).then(res=>{
					console.log(res)
				})
			},
			handleToMyIncome() {
				wx.navigateTo({
					url: './income'
				})
			},
			handleToWithdraw() {
				wx.navigateTo({
					url: './withdraw'
				})
			},
			handleToMemberList() {
				wx.navigateTo({
					url: './inviteMember'
				})
			},
			handleToStoreData() {
				wx.navigateTo({
					url: './storeData'
				})
			},
			handleToStoreOrder() {
				wx.navigateTo({
					url: './order/storeOrder'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center {
		background-color: #F3F3F3;
		min-height: 100%;
		overflow: hidden;
		view {
			box-sizing: border-box;
		}

		.userinfo {
			height: 340rpx;

			.title {
				width: 750rpx;
				height: 62rpx;
				line-height: 62rpx;
				text-align: center;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.info {
				padding: 40rpx 30rpx 65rpx 30rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 120rpx;
					height: 120rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.nickname {
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.name {
						height: 32rpx;
						font-size: 32rpx;
						line-height: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.type {
						margin-top: 20rpx;
						width: 120rpx;
						height: 40rpx;
						border: 1rpx solid rgba(242, 39, 50, 1);
						border-radius: 20rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						text-align: center;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(242, 39, 50, 1);
					}
				}
			}
		}

		.nav_box {
			padding-left: 20rpx;
			background-color: #fff;
			border-radius: 10rpx 10rpx 0 0;

			.nav {
				padding-right: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 88rpx;
				border-bottom: 1rpx solid #EEEEEE;

				.name {
					height: 32rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.tip {
					display: flex;
					align-items: center;

					image {
						width: 14rpx;
						height: 23rpx;
						margin-left: 10rpx;
					}

					text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}
			}
		}

		.order,
		.income,
		.store,
		.service {
			width: 710rpx;
			margin: 20rpx;
		}

		.order,
		.service {
			.list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0 30rpx 0;
				background-color: #fff;

				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 44rpx;
						height: 44rpx;
					}

					text {
						height: 26rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin-top: 15rpx;
					}
				}
			}
		}

		.income {
			.content {
				border-radius: 0 0 10rpx 10rpx;
				padding: 30rpx 20rpx;
				background-color: #fff;

				.list {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.item {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.num {
							height: 26rpx;
							font-size: 36rpx;
							line-height: 26rpx;
							font-family: DINPro;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
						}

						.name {
							height: 26rpx;
							font-size: 26rpx;
							line-height: 26rpx;
							margin-top: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
						}
					}
				}

				.bottom {
					padding-left: 10rpx;
					margin-top: 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.total {
						height: 30rpx;
						font-size: 28rpx;
						line-height: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);

						text:nth-child(2) {
							color: #FFB44F;
						}
					}

					.btn {
						button {
							width: 120rpx;
							height: 60rpx;
							background: rgba(255, 180, 79, 1);
							border: 1rpx solid rgba(255, 180, 79, 1);
							border-radius: 30rpx;
							line-height: 60rpx;
							text-align: center;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
			}
		}

		.store {
			.list {
				padding: 30rpx 0;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.num {
						height: 26rpx;
						font-size: 36rpx;
						line-height: 26rpx;
						font-family: DINPro;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.name {
						height: 26rpx;
						font-size: 26rpx;
						line-height: 26rpx;
						margin-top: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
		}
	}
</style>
