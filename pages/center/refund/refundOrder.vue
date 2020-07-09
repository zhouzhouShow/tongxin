<template>
	<view class="refund_order">
		<view class="search">
			<view class="icon">
				<image src="../../../static/images/center/icon_search.png" mode="scaleToFill"></image>
			</view>
			<view class="input">
				<input type="text" v-model="searchText" placeholder="搜索商品名称" />
			</view>
			<view class="btn">
				<text>搜索</text>
			</view>
		</view>
		<view class="nav">
			<orderNav :navList="navList" @change="changeNav"></orderNav>
		</view>
		<view class="list">
			<view v-for="item in list" :key="item.id" class="item">
				<view class="store">
					<view class="info">
						<image class="logo" :src="item.storeInfo.logo" mode="scaleToFill"></image>
						<text>{{item.storeInfo.name}}</text>
						<image class="arrow" src="../../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
					<view class="status">
						<text>{{status[item.status]}}</text>
					</view>
				</view>
				<view class="product">
					<view v-for="el in item.productList" :key="el.id" class="product_item">
						<productItem :info="el"></productItem>
					</view>
				</view>
				<view class="total">
					<text>退款金额</text>
					<text>¥88</text>
				</view>
				<view class="btns">
					<button v-if="item.status==4" class="to_delete" type="default">删除记录</button>
					<button @click="handleToDetail(item)" class="to_detail" type="default">查看详情</button>
					<button @click="showPopup(item)" v-if="item.status==2" class="to_fillin" type="default">填写物流</button>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<uni-popup @change="popupChange" ref="popup" type="bottom">
			<view class="popup_header">
				<text class="title">填写物流</text>
				<image @click="hidePopup" class="close" src="@/static/images/seeding/icon_close.png" mode="scaleToFill"></image>
			</view>
			<view class="popup_content">
				<view class="logistic_item">
					<view class="item">
						<view class="left">
							<text>快递公司</text>
						</view>
						<view class="right">
							<input type="text" v-model="logistic.name" placeholder="请输入快递公司" />
						</view>
					</view>
					<view class="item">
						<view class="left">
							<text>快递单号</text>
						</view>
						<view class="right">
							<input type="text" v-model="logistic.number" placeholder="请输入快递单号" />
						</view>
					</view>
				</view>
				<view class="logistic_btn">
					<button type="default">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import orderNav from "@/components/orderNav.vue"
	import productItem from "@/components/productItem.vue"
	export default {
		name: "refundOrder",
		components: {
			uniLoadMore,
			orderNav,
			productItem
		},
		data() {
			return {
				searchText: "",
				loadingType: 1,
				navList: [{
						ids: 0,
						name: '全部'
					},
					{
						ids: 1,
						name: '申请中'
					},
					{
						ids: 2,
						name: '待寄出'
					},
					{
						ids: 3,
						name: '待退款'
					},
					{
						ids: 4,
						name: '退款成功'
					},
				],
				nowNavIndex: 0,
				status: ['申请中', '待寄出', '待退款', '退款成功'],
				list: [{
					id: 1,
					storeInfo: {
						logo: require('@/static/images/center/icon_store.png'),
						name: '拉粑粑',
						id: 1
					},
					status: 2,
					total: 88,
					pay: 88,
					productList: [{
						id: 1,
						cover: 'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
						name: '2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 ',
						number: 1,
						price: 88,
						discount: 0.7,
						discountText: '7折',
						spec: '粉色；120cm'
					}]
				}]
			};
		},
		methods: {
			changeNav(ids) {
				this.nowNavIndex = ids
			},
			handleToDetail() {
				wx.navigateTo({
					url: './refundDetail'
				})
			},
			showPopup(item) {
				this.$refs.popup.open()
			},
			hidePopup() {
				this.$refs.popup.close()
			},
			popupChange(e) {

			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.refund_order {
		min-height: 100%;
		background-color: #F3F3F3;
		overflow: hidden;

		.search {
			padding: 10rpx 30rpx 12rpx 30rpx;
			border-bottom: 1rpx solid #EEEEEE;
			background-color: #fff;
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

		.list {
			.item {
				margin: 20rpx;
				width: 710rpx;
				padding: 30rpx;
				background-color: #fff;
				border-radius: 10px;

				.store {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.info {
						display: flex;
						align-items: center;

						.logo {
							width: 36rpx;
							height: 34rpx;
						}

						text {
							height: 30rpx;
							font-size: 32rpx;
							line-height: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							padding: 0 7rpx;
						}

						.arrow {
							width: 14rpx;
							height: 23rpx;
						}
					}

					.status {
						height: 26rpx;
						font-size: 28rpx;
						line-height: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 180, 79, 1);
					}
				}

				.product {
					padding: 40rpx 0;
				}

				.total {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 28rpx;

					text:nth-child(1) {
						margin-right: 10rpx;
					}
				}

				.btns {
					margin-top: 50rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					.to_detail,
					.to_delete {
						width: 150rpx;
						height: 50rpx;
						border: 1rpx solid rgba(221, 221, 221, 1);
						border-radius: 25rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						margin: 0 0 0 20rpx;
						background-color: #fff;
					}

					.to_fillin {
						width: 150rpx;
						height: 50rpx;
						background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
						border-radius: 25rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin: 0 0 0 20rpx;
					}
				}
			}
		}

		.popup_header {
			width: 750rpx;
			height: 100rpx;
			background: rgba(248, 248, 248, 1);
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			.title {
				height: 100rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 100rpx;
				text-align: center;
			}

			.close {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.popup_content {
			.logistic_item {
				padding: 70rpx 50rpx;

				.item {
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 28rpx;

					&:nth-child(1) {
						margin-bottom: 40rpx;
					}

					.left {}

					.right {
						margin-left: 30rpx;
						padding: 25rpx 30rpx;
						border: 1rpx solid rgba(238, 238, 238, 1);
						border-radius: 4rpx;
					}
				}
			}

			.logistic_btn {
				padding: 0rpx 0 30rpx 0;

				button {
					width: 690rpx;
					height: 80rpx;
					background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
					border-radius: 40rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
</style>
