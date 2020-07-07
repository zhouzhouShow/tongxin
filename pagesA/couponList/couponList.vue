<template>
	<div class="couponList">
		<div class="nav">
			<div class="nav-item">
				<span :class="type=='noUsed'?'fontColorRed':''" @click="changeNav('noUsed')">未使用({{noUsedNum}})</span>
				<span :class="type=='used'?'fontColorRed':''" @click="changeNav('used')">已使用({{usedNum}})</span>
				<span :class="type=='timeOut'?'fontColorRed':''" @click="changeNav('timeOut')">已过期({{timeOutNum}})</span>
				<image class="nav-icon" @click="showPop" src="../../static/images/coupon/coupon_nav_icon.png" mode=""></image>
			</div>
		</div>
		<div class="list-box">
			<div class="list">
				<div class="item" v-for="(item,index) in couponList" :key="index">
					<image class="bg" src="../../static/images/coupon/coupon_bg.png" mode=""></image>
					<div class="item-info">
						<div class="left-box">
							<p class="price"><span class="price-icon">¥</span>{{item.money | parseInt}}</p>
							<p class="enough">满{{item.condition | parseInt}}元可用</p>
						</div>
						<div class="right-box">
							<div class="name">
								<span class="coupon-type">{{item.name}}</span>
								<block v-if="type=='noUsed'">
									<span @click="toUse(item.goods_type)" v-if='item.isget ==1' class="btn1">去使用</span>
									<span @click="receive(item.id,index)" v-else class="btn2">立即领取</span>
								</block>
								<block v-else-if="type=='used'">
									<span class="btn3">已使用</span>
								</block>
								<block v-else>
									<span class="btn4">已过期</span>
								</block>
							</div>
							<p class="expires" :style="{marginTop:item.time_type == 1 ? '15rpx' : '30rpx'}">
								<block v-if="item.time_type == 1">
									{{item.use_start_time | formTime}} -
									{{item.use_end_time | formTime}}
								</block>
								<!-- 类型领取多少天内可用 -->
								<block v-else>
									<!-- 已经领取了 -->
									<block v-if="item.isget == 1">
										{{item.use_start_time | formTime}} -
										{{item.use_start_time | formTime(item.delay_day)}}
									</block>
									<block v-else>
										领券后{{item.delay_day}}天内有效
									</block>
								</block>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="couponPopup" @touchmove.stop.prevent :style="{visibility:popup ?'inherit' : 'hidden',height:popup ? '100%':'0',opacity:popup ? 1 : 0}"
		 @click="closePop">
			<div class="content" :class="{show:popup}" @click.stop=''>
				<p class="title">
					<span>优惠券说明</span>
					<image @click.stop="closePop" src="../../static/images/icon/del_icon.png" mode=""></image>
				</p>
				<p class="line-text">每张优惠券具有一定的使用条件和期限，优惠券使用一般性规则如下：</p>
				<p class="line-text">1、订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p>
				<p class="line-text">2、优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换定金；</p>
				<p class="line-text">3、每个订单只能使用一张优惠券；</p>
				<p class="line-text">4、使用优惠券支付的订单，如果退货，优惠券抵扣金额不能退还，只能退还实际支付商品金额；如部分退货，将按照订单实际成交商品的金额进行结算；退货后订单金额不满足优惠使用条件时，优惠券失效。退款金额=退货商品价格-优惠金额；</p>
				<p class="line-text">5、优惠券等抵扣金额不能开具发票；</p>
				<p class="line-text">6、优选优品商城在法律范围内保留对优惠券使用细则的最终解释权。</p>
			</div>
		</div>
		<div style="width:100%;" class="setBgFFF">
			<load-more :loadMore="loadMore"></load-more>
		</div>
	</div>
</template>

<script>
	import utils from '../../utils/index'
	import loadMore from '../../components/loadMore'; //1上拉加载更多 2正在加载 3我们是有底线的
	// user_type: {
	// 		1: {
	// 			str: '所有用户'
	// 		},
	// 		2: {
	// 			str: ' 新人券'
	// 		},
	// 		3: {
	// 			str: ' 会员专享'
	// 		}
	// 	},
	// 	time_type: {
	// 		1: {
	// 			str: ' 固定时间'
	// 		},
	// 		2: {
	// 			str: ' 领券后计算'
	// 		}
	// 	},
	// 	goods_type: {
	// 		0: {
	// 			str: '全部'
	// 		},
	// 		1: {
	// 			str: ' 按手'
	// 		},
	// 		2: {
	// 			str: ' 份货'
	// 		}
	// 	}
	export default {
		components: {
			loadMore,
		},
		data() {
			return {
				type: 'noUsed', //noUsed:未使用 , used:已使用 ,timeOut:已过期
				popup: false,
				page: 1,
				pageSize: 9999,
				couponList: [],
				noUsedNum: 0,
				usedNum: 0,
				timeOutNum: 0,
				loadMore: 1
			};
		},
		filters: {
			parseInt(num) {
				if (num) {
					return parseInt(num)
				}
			},
			formTime(time, addDayNum) {
				if (time) {
					if (addDayNum) {
						return utils.formatTime(time * 1000 + (addDayNum * 1000 * 60 * 60 * 24), 'yyyy-MM-dd hh:mm')
					} else {
						return utils.formatTime(time * 1000, 'yyyy-MM-dd hh:mm')
					}
				}
			}
		},
		onLoad() {
			this.couponDataList()
			this.getNum()
		},
		onReachBottom() {
			if (this.loadMore == 1) {
				switch (this.type) {
					case 'noUsed':
						this.couponDataList()
						break;
					case 'used':
						this.userCouponList(this.type)
						break;
					case 'timeOut':
						this.userCouponList(this.type)
						break;
					default:
						break;
				}
			}
		},
		methods: {
			toUse(type) {
				if (type == 3) { //份货
					uni.navigateTo({
						url: '/pages/index/brandzoufen?id=75'
					})
				} else if (type == 0) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/brandzoufen?id=26'
					})
				}
			},
			userCouponList(type) {
				this.$fly.post(this.$api.mycoupon, {
					page: this.page,
					pageSize: this.pageSize,
					ctype: type == 'used' ? 1 : 2
				}).then(res => {
					if (res.status) {
						if (this.page == 1) {
							this.couponList = res.data.list
						} else {
							if (res.data.list > 0) {
								this.couponList = this.couponList.concat(res.data.list)
							}
						}
						if (res.data.list.length < this.pageSize || res.data.list.length == 0) {
							this.loadMore = 3;
						} else {
							this.page++;
							this.loadMore = 1;
						}
					}
				})
			},
			couponDataList() {
				this.$fly.post(this.$api.couponList, {
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					if (res.status) {
						if (this.page == 1) {
							this.couponList = res.data.list
						} else {
							if (res.data.list > 0) {
								this.couponList = this.couponList.concat(res.data.list)
							}
						}
						if (res.data.list.length < this.pageSize || res.data.list.length == 0) {
							this.loadMore = 3;
						} else {
							this.page++;
							this.loadMore = 1;
						}
					}
				})
			},
			getNum() {
				this.$fly.post(this.$api.mycouponnum).then(res => {
					if (res.status) {
						this.noUsedNum = Number(res.data.new)
						this.usedNum = Number(res.data.oldnum)
						this.timeOutNum = Number(res.data.deadnum)
						// this.couponList = res.data.list
					}
				})
			},
			receive(id, index) {
				this.$fly.post(this.$api.getCoupon, {
					c_id: id
				}).then((res) => {
					if (res.status) {
						this.couponList[index].isget = 1
						this.$tip.toast(res.msg)
					} else {
						this.$tip.toast(res.msg)
					}
				})
			},
			closePop() {
				this.popup = false
			},
			showPop() {
				this.popup = true
			},
			changeNav(type) {
				// let typeList = new utils.couponType('user_type', 1)
				// console.log(typeList.getTypeStr())
				this.couponList = []
				this.type = type
				this.page = 1
				switch (type) {
					case 'noUsed':
						this.couponDataList()
						break;
					case 'used':
						this.userCouponList(type)
						break;
					case 'timeOut':
						this.userCouponList(type)
						break;
					default:
						break;
				}
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: #f3f3f3;
	}

	.fontColorRed {
		color: #FE0000;
	}

	.nav {
		background: #fff;
		display: flex;
		align-items: center;
		height: 90rpx;
		padding: 0 30rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		position: sticky;
		top: 0;
		background: #fff;
		overflow: hidden;
		z-index: 1;
		left: 0;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: space-between;

		}

		.nav-icon {
			width: 40rpx;
			height: 40rpx;
			// margin-left:auto;
		}
	}

	.list-box {
		padding: 32rpx 30rpx;

		.item {
			position: relative;
			height: 180rpx;
			margin-bottom: 30rpx;

			.bg {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
			}

			.item-info {
				font-weight: 400;
				display: flex;
				align-items: center;
				height: 100%;

				.left-box {
					color: #fff;
					width: 31%;
					text-align: center;
					margin-right: 20rpx;
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
					// flex: 1;
					// padding: 0 20rpx;
					width: 63%;
					.name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 36rpx;

						.coupon-type {
							width: 290rpx;
						}
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
						white-space: nowrap;
					}
				}
			}
		}
	}

	.couponPopup {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		left: 0;
		top: 0;
		z-index: 9998;
		transition: all .2s;

		div.show {
			height: 773rpx;
		}

		.content {
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 40rpx;
			font-size: 24rpx;
			height: 0;
			transition: height .5s;
			background: #fff;

			.title {
				margin-top: 15rpx;
				margin-bottom: 45rpx;
				display: flex;
				justify-content: space-between;

				image {
					width: 25rpx;
					height: 25rpx;
				}
			}

			.line-text {
				margin-bottom: 30rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 36rpx;
			}

			.closePop {
				position: absolute;
				bottom: -40rpx;
				right: 50%;
				width: 64rpx;
				height: 64rpx;
				margin-right: -25rpx;

			}
		}
	}
</style>
