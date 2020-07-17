<template>
	<view class="center">
		<view class="userinfo" :style="[{'paddingTop':paddingTop + 'px'},{'background': 'url(https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200716/f8df85add9986064b9c1181779d6d175.png) no-repeat'},{'background-size': '100% 100%'}]">
			<view class="title">
				<text>我的</text>
			</view>
			<view class="info">
				<view class="avatar">
					<image  :src="hasLogin ? userInfo.avatar : '/static/images/no-auth.png'" mode="aspectFill"></image>
				</view>
				<view class="nickname" v-if="hasLogin">
					<view class="name">
						{{userInfo.nickname}}
					</view>
					<view class="type">
						<text>{{userInfo.is_agent==1?'代理会员':'普通会员'}}</text>
					</view>
				</view>
				<button open-type="getUserInfo" @getuserinfo="getInfo" class="auth-btn" v-else>
					 点击授权登录
				</button>
			</view>
		</view>
		<view class="order">
			<view class="nav_box">
				<view class="nav">
					<view class="name">
						<text>我的订单</text>
					</view>
					<view @click="hanldeToOrder" class="tip">
						<text>查看全部订单</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view @click="handleToOrderType(num)" v-for="(el,num) in orderNav" :key="num" class="item">
					<image :src="el.icon" mode="scaleToFill"></image>
					<text>{{el.name}}</text>
				</view>
			</view>
		</view>
		<view v-if="userInfo.is_agent && hasLogin" class="income">
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
						<text class="num">{{pageData.todaymoney || 0}}</text>
						<text class="name">今日</text>
					</view>
					<view class="item">
						<text class="num">{{pageData.thismonmoney || 0}}</text>
						<text class="name">本月</text>
					</view>
					<view class="item">
						<text class="num">{{pageData.totalmoney || 0}}</text>
						<text class="name">累计</text>
					</view>
				</view>
				<view class="bottom">
					<view class="total">
						<text>可提现（元）：</text>
						<text>{{pageData.balance || 0}}</text>
					</view>
					<view @click="handleToWithdraw" class="btn">
						<button type="default">提现</button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="userInfo.is_agent && hasLogin" class="store">
			<view class="nav_box">
				<view class="nav">
					<view class="name">
						<text>我的店铺</text>
					</view>
					<!-- 					<view class="tip">
						<text>查看店铺详情</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view> -->
				</view>
			</view>
			<view class="list">
				<view @click="handleToMemberList" class="item">
					<text class="num">{{pageData.mySubordinate || 0}}</text>
					<text class="name">已邀会员</text>
				</view>
				<view @click="handleToStoreOrder" class="item">
					<text class="num">{{pageData.ordernum || 0}}</text>
					<text class="name">店铺订单</text>
				</view>
				<view @click="handleToStoreData" class="item">
					<text class="num">{{pageData.viewnum || 0}}</text>
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
					<!-- 					<view class="tip">
						<text>查看全部服务</text>
						<image src="../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
					</view> -->
				</view>
			</view>
			<view class="list">
				<view @click.stop="nav('/pagesA/couponList/couponList')" class="item">
					<image src="../../static/images/center/icon_coupon.png" mode="scaleToFill"></image>
					<text>优惠券</text>
				</view>
				<button class="contact item" open-type="contact" >
					<image src="../../static/images/center/icon_chat.png" mode="scaleToFill"></image>
					<text>帮助与客服</text>
				</button>
				<view class="item" @click.stop="nav('/pages/center/address/address')">
					<image src="../../static/images/center/icon_address.png" mode="scaleToFill"></image>
					<text>收货地址</text>
				</view>
				<view class="item" @click.stop="nav('')">
					<image src="../../static/images/center/icon_us.png" mode="scaleToFill"></image>
					<text>关于我们</text>
				</view>
			</view>
		</view>
		<comfooter :tabIdx="2"></comfooter>
	</view>
</template>

<script>
	import comfooter from '@/components/com-footer.vue'
	export default {
		name: "center",
		components: {
			comfooter
		},
		computed:{
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		data() {
			return {
				paddingTop: 0,
				pageData: {},
				userInfo: {},
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
		},
		mounted() {
			this.getCenterIndex()
		},
		onShow() {
			this.getCenterIndex()
		},
		methods: {
			getInfo(e){
				console.log(e)
			  if (e.target.userInfo) {
			    this.$fly.post(this.$api.updateUserInfo, {
			      wxname: e.target.userInfo.nickName,
			      headimg: e.target.userInfo.avatarUrl,
			      gender: e.target.userInfo.gender,
						iv:e.target.iv,
						encryptedData:e.target.encryptedData
			    }).then(res => {
						this.getCenterIndex(()=>{
							this.$store.commit('loginSuccess',true)
							this.$tip.toast('授权成功!')
						})
						
			    })
			  }
			},
			nav(url) {
				if(!url){
					return this.$tip.toast('正在建设中!')
				}
				wx.navigateTo({
					url: url
				})
			},
			getCenterIndex(callback) {
				this.$fly.post(this.$api.getCenterIndex).then(res => {
					this.userInfo = res.data
					if(res.data.is_agent == 1){
						this.$store.commit('setAgent',true)
					}else{
						this.$store.commit('setAgent',false)
					}
					if(callback){
						callback()
					}
					if (this.userInfo.is_agent) {
						this.getMyAssets()
					}
				})
			},
			getMyAssets() {
				uni.showLoading()
				this.$fly.post(this.$api.getMyAssets).then(res => {
					this.pageData = res.data
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			handleToMyIncome() {
				wx.navigateTo({
					url: './income'
				})
			},
			handleToWithdraw() {
				console.log(this.pageData)
				wx.navigateTo({
					url: './withdraw?balance=' + this.pageData.balance
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
			},
			hanldeToOrder() {
				wx.navigateTo({
					url: './order/orderList'
				})
			},
			handleToOrderType(index) {
				let url = ''
				switch (index) {
					case 0:
						url = './order/orderList?idx=' + 0
						break;
					case 1:
						url = './order/orderList?idx=' + 1
						break;
					case 2:
						url = './order/orderList?idx=' + 2
						break;
					case 3:
						url = './order/orderList?idx=' + 3
						break;
					case 4:
						url = './refund/refundOrder'
						break;
					default:
						url = './order/orderList'
						break;
				}
				wx.navigateTo({
					url: url
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
		// padding-bottom: 100rpx;

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
						border-radius: 50%;
					}
				}
				.auth-btn{
					// padding-left: 20rpx;
					border: none;
					box-shadow: none;
					line-height: 1;
					margin:0;
					padding:0;
					font-size:36rpx;
					font-weight:500;
					color:rgba(51,51,51,1);
					margin-left: 20rpx;
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
						line-height: 36rpx;
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
		.service{
			padding-bottom: 100rpx;
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
				border-radius:  0 0 10rpx 10rpx;
				.contact{
					box-shadow: none;
					background: transparent;
					margin: 0;
					padding: 0;
					border: none;
				}
				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					line-height: 1;
					image {
						width: 46rpx;
						height: 46rpx;
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
