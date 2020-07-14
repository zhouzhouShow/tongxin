<template>
	<view class="refund_order">
		<view class="search">
			<view class="icon">
				<image src="../../../static/images/center/icon_search.png" mode="scaleToFill"></image>
			</view>
			<view class="input">
				<input type="text" v-model="searchText" placeholder="搜索商品名称" />
			</view>
			<view @click="search" class="btn">
				<text>搜索</text>
			</view>
		</view>
		<view class="nav">
			<orderNav :navList="navList" @change="changeNav"></orderNav>
		</view>
		<view class="list">
			<view v-for="(item,index) in list" :key="item.id" class="item">
				<block v-for="(el,num) in item.products_list" :key="num">
					<view class="store">
						<view class="info">
							<image class="logo" :src="el.brandinfo.brand_logo[0]" mode="scaleToFill"></image>
							<text>{{el.brandinfo.brand_name}}</text>
							<image class="arrow" src="../../../static/images/center/icon_arrow-right-grey.png" mode="scaleToFill"></image>
						</view>
						<view class="status">
							<text>{{status[item.status]}}</text>
						</view>
					</view>
					<view class="product">
						<view v-for="(e,n) in el.goodlist" :key="e.id" class="product_item">
							<productItem :info="e"></productItem>
						</view>
					</view>
				</block>
				<view class="total">
					<text>退款金额</text>
					<text>¥{{getRefundTotal(item)}}</text>
				</view>
				<view class="btns">
					<button v-if="item.status==4" @click="deleteLog(item.id,index)" class="to_delete" type="default">删除记录</button>
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
					<button type="default" @click.stop="submitExpressInfo">确定</button>
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
				page: 0,
				pageSize: 10,
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
				status: ['审核中','审核失败', '待寄出', '待退款','退款成功','退款失败'],
				list: [],
				logisticId:'',
				logistic:{
					name:'',
					number:''
				}
			};
		},
		computed:{
			getRefundTotal(item){
				return function(item){
					let goods = item.products_list[0].goodlist[0]
					return (goods.goods_num*goods.goods_price).toFixed(2)
				}
			}
		},
		onLoad() {
			this.getRefundList()
		},
		onReachBottom(){
			if(this.loadingType==1){
				this.page++
				this.getRefundList()
			}
		},
		methods: {
			deleteLog(id,index){
				this.$tip.modal('确认删除此记录吗？','删除确认').then((res) => {
					// on confirm
					this.$fly.post(this.$api.returnOrderStatus,{
						return_id:id
					}).then(res=>{
						this.$tip.toast('删除成功!')
						this.list.splice(index,1)
					})
				}).catch(() => {
					// on cancel
				});
			},
			submitExpressInfo(){
				if(!this.logistic.number || !this.logistic.name){
					return this.$tip.toast('请填写完整!')
				}
				this.$fly.post(this.$api.submitExpressInfo,{
					express_company:this.logistic.name,
					express_id:this.logistic.number,
					return_id:this.logisticId
				}).then(res=>{
					if(res.code){
						this.hidePopup()
						this.page = 1
						this.getRefundList()
					}
				})
			},
			getRefundList() {
				this.loadingType = 2
				this.$fly.post(this.$api.getRefundList, {
					page: this.page,
					pageSize: this.pageSize,
					statu_stype: this.nowNavIndex,
					keyword: this.searchText
				}).then(res => {
					this.list = this.list.concat(res.data.list)
					if (res.data.list.length < this.pageSize) {
						this.loadingType = 3
					} else {
						this.loadingType = 1
					}
				})
			},
			search() {
				this.page = 0
				this.list = []
				this.loadingType = 1
				this.getRefundList()
			},
			changeNav(ids) {
				if (this.nowNavIndex == ids) return
				this.nowNavIndex = ids
				this.page = 0
				this.list = []
				this.loadingType = 1
				this.getRefundList()
			},
			handleToDetail(item) {
				wx.navigateTo({
					url: './refundDetail?id='+item.id
				})
			},
			showPopup(item) {
				this.logisticId = item.id
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
