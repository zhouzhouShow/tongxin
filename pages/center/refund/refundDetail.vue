<template>
	<view class="refund_detail">
		<view class="type">
			<view v-if="orderDetail.status==0">
				<view class="title">
					<text>已申请退款/售后，等待商家处理</text>
				</view>
				<view class="tip">
					<text>剩余{{getTime}}</text>
				</view>
			</view>
			<view v-else-if="orderDetail.status==1">
				<view class="title">
					<text>您的退款申请审核失败</text>
				</view>
				<view class="tip">
					<text></text>
				</view>
			</view>
			<view v-else-if="orderDetail.status==2">
				<view class="title">
					<text>您的退款申请已通过</text>
				</view>
				<view class="tip">
					<text>请填写返还快递信息</text>
				</view>
			</view>
			<view v-else-if="orderDetail.status==3">
				<view class="title">
					<text>商品已退回，等待商家退款</text>
				</view>
				<view class="tip red">
					<text>申通快递：ST00000000000000</text>
				</view>
			</view>
			<view v-else-if="orderDetail.status==4">
				<view class="title">
					<text>退款成功</text>
				</view>
				<view class="tip">
					<text>2020-07-09 15:13</text>
				</view>
			</view>
			<view v-else-if="orderDetail.status==5">
				<view class="title">
					<text>退款失败</text>
				</view>
				<view class="tip">
					<text>2020-07-09 15:13</text>
				</view>
			</view>
		</view>
		<view v-if="orderDetail.status==2||orderDetail.status==3" class="address">
			<view class="title">
				<text>商家收货地址</text>
			</view>
			<view class="content">
				<view class="top">
					<text>{{businessInformation.name}}</text>
					<text>{{businessInformation.mobile}}</text>
				</view>
				<view class="bottom">
					<text>{{businessInformation.address}}</text>
				</view>
			</view>
		</view>
		<view class="product">
			<view class="store">
				<image class="logo" :src="orderDetail.products_list[0].brandinfo.brand_logo[0]" mode="scaleToFill"></image>
				<text>{{orderDetail.products_list[0].brandinfo.brand_name}}</text>
				<image class="arrow" src="../../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
			</view>
			<view class="products">
				<view v-for="el in orderDetail.products_list[0].goodlist" :key="el.id" class="products_item">
					<productItem :info="el" :showNumber="false"></productItem>
				</view>
			</view>
			<view class="detail">
				<view class="text">
					<view class="left">
						<text>退货数量</text>
					</view>
					<view class="right">
						<text>{{orderDetail.total_num||0}}件</text>
					</view>
				</view>
				<view class="text">
					<view class="left">
						<text>退货原因</text>
					</view>
					<view class="right">
						<text>{{orderDetail.reason || ''}}</text>
					</view>
				</view>
				<view class="text">
					<view class="left">
						<text>退款金额</text>
					</view>
					<view class="red right">
						<text>¥ {{getRefundTotal(orderDetail)}}</text>
					</view>
				</view>
				<view class="text">
					<view class="left">
						<text>申请时间</text>
					</view>
					<view class="right">
						<text>{{$utils.formatTime(orderDetail.create_time*1000,'yyyy-MM-dd hh:mm:ss')}}</text>
					</view>
				</view>
				<view class="text">
					<view class="left">
						<text>退货单号</text>
					</view>
					<view class="right">
						<text>{{orderDetail.order_code}}</text>
					</view>
				</view>
				<view class="text more">
					<view class="left">
						<text>其他说明</text>
					</view>
					<view class="right">
						<text>{{orderDetail.explain}}</text>
					</view>
				</view>
				<view class="images">
					<view v-for="(image, index) in orderDetail.voucher" :key="index" class="image">
						<image :src="image" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view @click="showPopup" v-if="orderDetail.status==2" class="fill_logistics">
			<button type="default">填写物流</button>
		</view>
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
	import productItem from "@/components/productItem.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: "refundDetail",
		components: {
			productItem,
			uniPopup
		},
		computed:{
			getTime(){
				let nowTime = new Date().getTime()
				let createTime = this.orderDetail.create_time/1000
				let roundClock = 86400000
				let gap = roundClock - (nowTime - createTime)
				return this.$utils.formatTime(gap,'hh时mm分')
			},
			getRefundTotal(item){
				return function(item){
					let goods = item.products_list[0].goodlist[0]
					return (goods.goods_num*goods.goods_price).toFixed(2)
				}
			}
		},
		data() {
			return {
				id: 0,
				businessInformation: {
					name: '蓝盈盈',
					mobile: '18375825365',
					address: '广东省广州市天河区华观路1993万科广场负一楼B1区101'
				},
				orderDetail: {},
				images: [
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg'
				],
				logistic: {
					name: '',
					number: ''
				}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getRefundOrderInfo()
		},
		methods: {
			getRefundOrderInfo() {
				uni.showLoading({
					title: '获取中'
				})
				this.$fly.post(this.$api.getRefundOrderInfo, {
					return_id: this.id
				}).then(res => {
					uni.hideLoading()
					res.data.voucher = res.data.voucher.split(',')
					this.orderDetail = res.data
				}).catch(err => {
					uni.hideLoading()
				})
			},
			showPopup() {
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

	.refund_detail {
		padding-bottom: 140rpx;

		.type {
			padding: 40rpx 30rpx 30rpx 30rpx;

			>view {
				border-bottom: 1rpx solid #EEEEEE;
				padding-bottom: 30rpx;
			}

			.title {
				height: 34rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 34rpx;
			}

			.tip {
				margin-top: 20rpx;
				height: 25rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 25rpx;
			}
		}

		.address {
			padding: 0 30rpx 30rpx 30rpx;

			.title {
				height: 29rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 29rpx;
			}

			.content {
				.top {
					margin-top: 30rpx;
					height: 28rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 28rpx;

					text:nth-child(2) {
						margin-left: 43rpx;
					}
				}

				.bottom {
					margin-top: 25rpx;
					line-height: 36rpx;
					max-width: 600rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}
			}
		}

		.product {
			margin: 0rpx auto;
			width: 710rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(204, 204, 204, 0.3);
			border-radius: 10rpx;
			padding: 30rpx;

			.store {
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

			.products {
				margin-top: 30rpx;
			}
		}

		.detail {
			margin-top: 40rpx;

			.text {
				min-height: 25rpx;
				font-size: 26rpx;
				line-height: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.left {
					flex-basis: 110rpx;
					color: #999999;
				}

				.right {
					margin-left: 50rpx;
					flex: 1;
					color: #333333;
				}

				&.more {
					align-items: flex-start;
					line-height: 36rpx;
				}
			}

			.images {
				width: 100%;
				margin-top: 20rpx;
				padding-left: 150rpx;
				display: flex;
				flex-wrap: wrap;

				.image {
					width: 160rpx;
					height: 160rpx;
					position: relative;
					margin-bottom: 10rpx;
					margin-right: 10rpx;

					&:nth-child(3n) {
						margin-right: 0;
					}

					>image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.fill_logistics {
			position: fixed;
			bottom: 0;
			padding: 30rpx;
			background-color: #fff;

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

		.red {
			color: #F22732 !important;
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
