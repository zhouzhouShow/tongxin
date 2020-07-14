<template>
	<view class="submitOrder">
		<!-- <view class="top-bg"></view> -->
		<view class="content">
			<view class="area-box" @click="modifyAddress">
				<view class="user"><text>{{addressInfo.realname}}</text><text>{{addressInfo.mobile}}</text></view>
				<view class="area-info">
					<image class="a-icon" src="../../static/images/icon/area_icon.png" mode=""></image>
					<text class="area">{{addressInfo.prov_name+addressInfo.city_name+addressInfo.dist_name+addressInfo.address}}</text>
					<text class="iconfont iconyoujiantou"></text>
				</view>
			</view>
			<view class="good-box">
				<view class="brand-box" v-for="(item ,index) in orderGoodsList" :key="index" >
					<view class="brand-info flex-align-center">
						<image class="b-img" :src="item.brand_logo[0]" mode=""></image>
						<text class="brand-name">{{item.brand_name}}</text>
					</view>
					<view class="good-box-list">
						<block v-for="(itemC,indexC) in item.goodlist" :key="indexC">
							<cartItem type='order' :item="itemC" ></cartItem>
						</block>
					</view>
				</view>
				<view class="expressage flex-align-center">
					<text class="label">配送方式</text>
					<text>普通配送</text>
					<text class="e-money">{{payOrderData.freight == 0 ?'包邮' : '快递 ￥'+payOrderData.freight}}</text>
					<image class="arrow" src="../../static/images/seeding/icon_arrow-right-grey.png" mode=""></image>
				</view>
				<view class="tips1">工作日/节假日均可送货</view>
				<view class="expressage flex-align-center" @click="chooseCoupon">
					<text class="label">优惠券</text>
					<text>{{(payOrderData.coupon.length<=0|| !payOrderData.coupon) ? '无优惠券可以用' : choosedCoupon.name}}</text>
					<text class="r-money"  :style="{visibility: !choosedCoupon?'hidden':'inherit'}">- ￥{{choosedCoupon.money}}</text>
					<image class="arrow" src="../../static/images/seeding/icon_arrow-right-grey.png" mode=""></image>
				</view>
				<view class="desc flex-align-center">
					<text class="label">订单备注</text>
					<input type="text" v-model="desc" placeholder="选填，请先和商家协商一致">
				</view>
			</view>
			<view class="price-detail-box">
				<view class="item">
					<span>商品金额：</span>
				<!-- 选中优惠券了吧减去优惠券的价格 -->
					<span>¥{{totalPrice}}</span>
				</view>
				<view class="item">
					<span>运费：</span>
					<span>{{payOrderData.freight == 0 ? '包邮' : '¥'+payOrderData.freight}}</span>
				</view>
				<!-- <view class="item" v-if="choosedCoupon">
					<span>优惠券抵扣：</span>
					<span>-￥{{choosedCoupon.money}}</span>
				</view> -->
			</view>
		</view>
		<view class="fixed-bottom">

			<view class="total">
				<text>共{{payOrderData.goods_num}}件</text>
				<text>合计:</text>
				<text class="p-box"><text class="p-icon">¥</text>{{choosedCoupon ? (totalPrice*100 - choosedCoupon.money*100)/100 : totalPrice}}</text>
			</view>
			<view class="submit" @click="confirmPay">
				提交订单
			</view>
		</view>
		<popup type="bottom" :show="popup" ref="popup">
			<view class="contentPop">
				<view class="setP">
					<p class="title">
						<span>选择优惠卷</span>
						<!-- <image @click.stop="closePop" src="../../../static/images/icon/del_icon.png" mode=""></image> -->
					</p>
					<!-- &&payOrderData.coupon.length>0 -->
					<scroll-view scroll-y='true' class="couponList" v-if="payOrderData">
						<radio-group class="radio-group" @change.stop="couponChange" >
							<label :for="'st'+index" v-for="(item,index) in payOrderData.coupon" :key="index">
								<view class="item"  @click.stop=''>
									<image class="bg" src="@/static/images/coupon/coupon_bg.png" mode=""></image>
									<view class="item-info"  v-if="item">
										<view class="left-box">
											<p class="price"><span class="price-icon">¥</span>{{parseIntNum(item.money)}}</p>
											<p class="enough">满{{parseIntNum(item.condition)}}元可用</p>
										</view>
										<view class="right-box">
											<view class="name">
												<span class="coupon-type">{{item.name}}</span>
												<radio  class="radio" :id="'st'+index" :value="str(item)" color="#f93168" :checked="item.id==couponId"></radio>
											</view>
											<p class="expires">
												<block>
													{{formTime(item.use_start_time)}} -
													{{formTime(item.use_end_time)}}
												</block>
											</p>
										</view>
									</view>
								</view>
							</label>
						</radio-group>
					</scroll-view>
					<view class="noCoupon" v-else>
						亲,您暂无优惠券!
					</view>
					<view class="sureChoose" @click="sureChooseCoupon">不使用优惠券</view>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import cartItem from '@/components/shopCart/cartItem.vue'

	export default {
		components: {
			cartItem
		},
		data() {
			return {
				desc: '',
				totalPrice: 1123213,
				popup: false,
				addressInfo: null,
				payOrderData: {},
				choosedCoupon: null, //选中优惠券的信息
				couponId: null, //选中优惠券的id
				orderId: "",
				payWay:1, //1:微信支付
				orderGoodsList:[],
			};
		},
		 async onLoad(option){
			 console.log(123123)
			this.$tip.loading();
			this.shopCarIds = option.cart_ids;
			this.addressId = option.address_id;
			this.orderId = option.orderId;
			var result;
			if(this.orderId){ //携带订单id进来 , 两个数据不同,所以要分开处理拿数据
				result = await this.loadOrderDetail();
				this.totalPrice = result.data.price_sum;
				result.data.products_list.map(item=>{
					item.brand_logo = item.brandinfo.brand_logo
					item.brand_banner = item.brandinfo.brand_banner
					item.brand_name = item.brandinfo.brand_name
				})
				this.orderGoodsList = result.data.products_list;
				result.data.freight = result.data.shipping_monery;
				result.data.goods_num = result.data.total_num
				console.log(result.data)
			}else{
				if (wx.getStorageSync('address_id')) {
					this.addressId = wx.getStorageSync('address_id');
					wx.removeStorageSync('address_id');
				}
				result = await this.settlement(this.shopCarIds, this.addressId);
				this.totalPrice = result.data.total_price;
				this.orderGoodsList = result.data.cartlist.list;
			}
			console.log(result.data)
			this.addressInfo = result.data.address;
			this.deliveryTips = result.data.shippings;
			this.payOrderData = result.data
			this.$tip.loaded();
		},
		methods: {
			str(item) {
				return JSON.stringify(item)
			},
			parseIntNum(num) {
				if (num) {
					return parseInt(num)
				}
			},
			formTime(time) {
				if (time) {
					return this.$utils.formatTime(time * 1000, 'yyyy-MM-dd hh:mm')
				}
			},
			sureChooseCoupon() {
				this.couponId = null
				this.choosedCoupon = null
				this.popup = false
			},
			couponChange(e) {
				let coupon = JSON.parse(e.detail.value)
				this.couponId = coupon.id
				this.choosedCoupon = coupon
				setTimeout(() => {
					this.popup = false
				}, 200)
			},
			async confirmPay() {
					this.$tip.loading('提交订单中...')
			
					if(!this.orderId){ //订单id不存在 ,提交订单,获取id
						let orderInfo =  await this.payOrder() //提交订单
						console.log(orderInfo)
						if(orderInfo.code){
							 this.orderId = orderInfo.data.order_id
						}
					}
					var result = await this.$fly.post(this.$api.orderPay, {
						order_id: this.orderId,
						coupon_id: this.couponId || '',
					});
					this.$tip.loaded()
			
					 if (this.payWay == 1) {
						console.log(result)
						if (result.data.is_finish == 1) {
							uni.redirectTo({
								url: "/pages/shopAndOrder/settlement/orderDetail?order_id=" + result.data.order_id
							});
						} else {
							var payMentResult = await this.$fly.post(this.$api.getJsApiData, {
								order_id: result.data.order_id,
							});
							// 微信支付
							wx.requestPayment({
								timeStamp: payMentResult.data.timeStamp,
								nonceStr: payMentResult.data.nonceStr,
								package: payMentResult.data.package,
								signType: 'MD5',
								paySign: payMentResult.data.paySign,
								success: (res) => {
									// 推送订阅消息
									uni.redirectTo({
										url: "/pages/center/order/orderDetail?order_id=" + result.data.order_id
									});
								},
								fail: (res) => {
									this.$tip.toast("支付失败");
								}
							})
						}
					} else {
						uni.redirectTo({
							url: "/pages/shopAndOrder/settlement/payResult?order_id=" + result.data.order_id + '&status=' + result.status
						});
					}
				
					this.$store.dispatch('getCartNum')
			
			
			
			},
			async payOrder() {
				return await this.$fly.post(this.$api.orderBegin, {
					cart_ids: this.shopCarIds,
					address_id: this.addressId,
					remarks: this.desc,
					// coupon_id: this.couponId || ''
				});

			},
			modifyAddress() {
				wx.navigateTo({
					url: "/pages/center/address/address?isShop=1&cart_ids=" + this.shopCarIds
				});
			},
			async loadOrderDetail() {
				return await this.$fly.post(this.$api.orderdetail, {
					order_id: this.orderId,
					type: 1
				});
			},
			async settlement(cart_ids, address_id) {
				return await this.$fly.post(this.$api.goBuy, {
					cart_ids: cart_ids,
					address_id: address_id
				}).catch((err) => {
					setTimeout(() => {
						wx.navigateBack({})
					}, 2000)
				});;
			},
			chooseCoupon() {
				this.$refs['popup'].open()
			},
			showAll() {
				this.$refs['orderBox'].showAllMethod()
				this.showAllState = !this.showAllState
			},


		}
	}
</script>

<style lang="scss" scoped>

	.submitOrder {
		min-height: 100vh;
		background: #f3f3f3;
		background: linear-gradient(to bottom, #DF464E 0%, #df464e 5%, #f3f3f3 30%, #f3f3f3 100%);

		.top-bg {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			width: 100%;
			height: 478rpx;
			background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(223, 70, 78, 1) 100%);
		}

		.content {
			padding: 0 20rpx;
			padding-top: 20rpx;
			padding-bottom: 118rpx;
			.price-detail-box {
				padding: 30rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				border-radius: 10rpx;
				background: #fff;

				.item:not(:last-of-type) {
					margin-bottom: 30rpx;
				}

				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;

					span:nth-child(2) {
						color: #333;
					}
				}
			}

			.good-box {
				padding: 35rpx 30rpx 40rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 10rpx;
				margin-bottom: 20rpx;

				.brand-info {
					margin-left: 10rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 30rpx;

					.b-img {
						width: 40rpx;
						height: 40rpx;
						margin-right: 6rpx;
					}
				}

				.desc {
					font-weight: 400;
					font-size: 26rpx;
					margin-top: 40rpx;

					.label {
						color: #333333;
					}

					input {
						flex: 1;
						margin-left: 40rpx;
						font-size: 26rpx;
					}
				}

				.expressage {
					font-weight: 400;
					font-size: 26rpx;

					.label {
						color: #333333;
					}

					text:nth-child(2) {
						color: #999999;
						margin-left: 40rpx;
					}

					.e-money {
						color: #333;
						margin-left: auto;
					}

					.r-money {
						color: #F22732;
						margin-left: auto;
					}

					.arrow {
						margin-left: 15rpx;
						width: 14rpx;
						height: 23rpx;
					}
				}

				.tips1 {
					text-align: right;
					padding-right: 30rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin: 10rpx 0 38rpx;
				}
			}

			.area-box {
				background: #fff;
				padding: 40rpx 30rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 10rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				margin-bottom: 20rpx;

				.user {
					font-size: 30rpx;
					color: rgba(51, 51, 51, 1);
					margin: 0 0 30rpx;

					text:nth-child(1) {
						margin-right: 32rpx;
						font-weight: 500;
					}

					text:nth-child(2) {
						font-weight: 400;
					}
				}

				.area-info {
					display: flex;

					.a-icon {
						width: 24rpx;
						height: 27rpx;
						margin-right: 10rpx;
						margin-top: 10rpx;
					}

					.area {
						font-size: 28rpx;
						width: 513rpx;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						line-height: 42rpx;
					}

					.iconyoujiantou {
						margin-left: auto;
						font-size: 40rpx;
						color: #D6D6D6;
					}
				}

			}
		}
	}

	.fixed-bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 98rpx;
		left: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);

		.radio {
			margin-left: 40rpx;

			text {
				margin-left: 10rpx;
			}
		}

		.total {
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 42px;
			margin-left: auto;

			text:nth-child(1) {
				font-size: 24rpx;
			}

			text:nth-child(2) {
				font-size: 28rpx;
				margin-left: 10rpx;
			}

			.p-box {
				margin-left: 20rpx;
				color: #F22732;
				font-size: 40rpx;

				.p-icon {
					font-size: 24rpx;
				}
			}
		}

		.submit {
			margin-right: 20rpx;
			margin-left: 30rpx;
			width: 210rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
			border-radius: 40rpx;
		}
	}


	div.show {
		height: 840rpx;
	}

	.contentPop {
		width: 100%;
		height: 800rpx;
		transition: height .5s;
		background: #f3f3f3;
		border-radius: 10rpx 10rpx 0px 0px;

		.setP {
			padding: 0 16px;
			height: 100%;
			display: flex;
			flex-direction: column;

		}

		.title {
			margin-top: 30rpx;
			margin-bottom: 27rpx;
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

			span {
				flex: 1;
				text-align: center;
			}

			image {
				width: 25rpx;
				height: 25rpx;
			}
		}

		.couponList {
			width: 100%;
			height: 650rpx;
			overflow: hidden;
		}

		.noCoupon {
			text-align: center;
			font-size: 34rpx;
			padding: 50rpx;
		}

		.item {
			position: relative;
			height: 180rpx;
			margin-bottom: 30rpx;

			.bg {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 0;
			}

			.item-info {
				font-weight: 400;
				display: flex;
				align-items: center;
				height: 100%;
				z-index: 2;

				.left-box {
					color: #fff;
					width: 220rpx;
					z-index: 1;
					// margin-right: 20rpx;
					text-align: center;

					.price {
						font-size: 80rpx;

						.price-icon {
							font-size: 30rpx;
						}
					}

					.enough {
						font-size: 24rpx;
						font-weight: 500;
					}
				}

				.right-box {
					flex: 1;
					padding: 0 20rpx;
					position: relative;

					.name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 36rpx;

						.coupon-type {
							white-space: nowrap;
							width: 440rpx;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.radio {
						position: absolute;
						right: 30rpx;
						top: 30rpx;

					}

					.btn1 {
						width: 100rpx;
						height: 38rpx;
						line-height: 38rpx;
						border: 1rpx solid rgba(242, 48, 48, 1);
						border-radius: 19rpx;
						font-size: 24rpx;
						text-align: center;
						color: rgba(242, 48, 48, 1);
					}

					.btn2 {
						width: 140rpx;
						text-align: center;
						height: 56rpx;
						line-height: 56rpx;
						background: linear-gradient(90deg, rgba(251, 9, 9, 1), rgba(255, 103, 73, 1));
						box-shadow: 0px 8rpx 16rpx 0px rgba(255, 103, 73, 0.3);
						border-radius: 28rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}

					.btn3 {
						@extend .btn1;
						background: rgba(248, 248, 248, 1);
						border: 1rpx solid rgba(153, 153, 153, 1);
						color: #999999;
						border-radius: 19rpx;
					}

					.btn4 {
						font-size: 24rpx;
						color: rgba(153, 153, 153, 1);
					}

					.expires {
						font-size: 25rpx;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						margin-top: 30rpx;
					}
				}
			}
		}

		.sureChoose {
			height: 88rpx;
			line-height: 88rpx;
			background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
			border-radius: 44rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			margin: auto 0 20rpx 0;
		}
	}
</style>
