<template>
	<view class="apply_refund">
		<view class="main">
			<view class="product_info">
				<productItem :info="productInfo" :showRefundInfo="true" :refundNumber="refundGoodInfo.return_goods_num"></productItem>
			</view>
			<view class="apply_number">
				<view class="title">
					<text>申请数量</text>
				</view>
				<view class="control">
					<uni-number-box @change="changeApplyNumber" :min="1" :max="getMax"></uni-number-box>
				</view>
			</view>
			<view class="apply_reason">
				<view class="title">
					<text>退货原因</text>
				</view>
				<view class="picker">
					<picker @change="bindPickerChange" :value="reasonIndex" :range="reasonList">
						<view class="choose">
							<text :class="[reasonIndex?'active':'']">{{reasonIndex?reasonList[reasonIndex]:'请选择退货原因'}}</text>
							<image src="../../../static/images/center/icon_arrow-right-grey.png" mode=""></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="apply_mark">
				<view class="input">
					<textarea@input="markInput" :maxlength="200" v-model="mark" placeholder="请描述申请售后服务的具体原因" />
					<text>{{markNowLength}}/200</text>
				</view>
			</view>
			<view class="apply_upload">
				<view class="tip">
					<text>为了帮您更好的解决问题，请务必上传照片凭证</text>
				</view>
				<view class="images">
					<view v-for="(image, index) in images" :key="index" class="image">
						<image :src="image" mode="aspectFill"></image>
						<view @click="handleDelete(index)" class="delete">
							<image src="../../../static/images/center/icon_delete.png" mode="scaleToFill"></image>
						</view>
					</view>
					<view @click="chooseMedia" v-if="images.length<9" class="btn">
						<image src="../../../static/images/center/icon_upload.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="way">
			<view class="left">
				<text>退款方式</text>
			</view>
			<view class="right">
				<text>原支付返还</text>
			</view>
		</view>
		<view class="submit">
			<button @click="handleSubmit" type="default">提交申请</button>
		</view>
	</view>
</template>

<script>
	import productItem from "@/components/productItem.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		name: "applyRefund",
		components: {
			productItem,
			uniNumberBox
		},
		data() {
			return {
				productInfo: {},
				refundGoodInfo: {},
				refundNumber: 1,
				reasonList: [],
				reasonIndex: '',
				markNowLength: 0,
				mark: '',
				images: [],
				maxCount: 9,
				submitImagesUrl: []
			};
		},
		onLoad(options) {
			try {
				let info = JSON.parse(options.info)
				this.productInfo = info
				this.getRefundGoodInfo()
				this.getRefundConfig()
			} catch (e) {
				this.productInfo = {}
			}
		},
		computed: {
			getMax() {
				return Number(this.refundGoodInfo.buy_goods_num) - Number(this.refundGoodInfo.return_goods_num)
			}
		},
		methods: {
			getRefundConfig() {
				this.$fly.post(this.$api.getRefundConfig).then(res => {
					let list = []
					res.data.reason_list.forEach(item => {
						list.push(item.reason)
					})
					this.reasonList = list
				})
			},
			getRefundGoodInfo() {
				uni.showLoading({
					title: '获取中',
				})
				this.$fly.post(this.$api.getRefundGoodInfo, {
					order_id: this.productInfo.order_id,
					goods_id: this.productInfo.goods_id,
					product_id: this.productInfo.product_id
				}).then(res => {
					uni.hideLoading()
					this.refundGoodInfo = res.data
				}).catch(err => {
					uni.hideLoading()
				})
			},
			changeApplyNumber(e) {
				this.refundNumber = e.value
			},
			bindPickerChange(e) {
				this.reasonIndex = e.detail.value
			},
			markInput(e) {
				this.markNowLength = e.detail.value.length
			},
			handleDelete(index) {
				this.images.splice(index, 1)
			},
			chooseMedia() {
				let _this = this
				let type = this.images.length > 0 ? 0 : 2
				uni.chooseMedia({
					count: _this.maxCount,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					camera: 'back',
					success(res) {
						_this.images.push(res.tempFiles[0].tempFilePath)
					}
				})
			},
			async handleSubmit() {
				let refundNumber = Number(this.refundNumber)
				let totalNum = Number(this.refundGoodInfo.buy_goods_num)
				let hasRefundNum = Number(this.refundGoodInfo.return_goods_num?this.refundGoodInfo.return_goods_num:0)
				if(refundNumber>(totalNum-hasRefundNum)){
					uni.showToast({
						title: '没有商品可申请退款',
						icon: 'none',
						duration: 1500
					})
					return
				} else if (!this.reasonIndex) {
					uni.showToast({
						title: '请选择退货原因',
						icon: 'none',
						duration: 1500
					})
					return
				} else if (!this.mark) {
					uni.showToast({
						title: '请描述具体原因',
						icon: 'none',
						duration: 1500
					})
					return
				} else if (this.images.length <= 0) {
					uni.showToast({
						title: '请上传凭证',
						icon: 'none',
						duration: 1500
					})
					return
				}
				let _this = this;
				var loadingTitle = '';
				for (var i = 0; i < _this.images.length; i++) {
					loadingTitle = '正在上传第' + (i + 1) + '/' + _this.images.length + '张';
					let result = await this.$utils.uploadFile(_this.images[i], loadingTitle);
					let data = JSON.parse(result.data);
					_this.submitImagesUrl.push(data.data.url);
				}
				let jsonstr = [{
					'order_id': this.productInfo.order_id,
					'goods_id': this.productInfo.goods_id,
					'product_id': this.productInfo.product_id,
					'goods_num': this.refundNumber
				}]
				uni.showLoading({
					title:'提交中'
				})
				this.$fly.post(this.$api.applyRefund, {
					jsonstr:JSON.stringify(jsonstr),
					order_id:this.productInfo.order_id,
					reason:this.reasonList[this.reasonIndex],
					explain:this.mark,
					voucher:this.submitImagesUrl.join(',')
				}).then(res=>{
					this.getRefundGoodInfo()
					uni.showToast({
						title:res.msg || '申请成功',
						duration:1500
					})
					this.refundNumber = 1
					this.reasonIndex = ''
					this.markNowLength = 0
					this.mark = ''
					this.images = []
					this.submitImagesUrl = []
					wx.navigateTo({
						url:'./refundResult'
					})
				}).catch(err=>{
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.apply_refund {
		min-height: 100%;
		background-color: #F3F3F3;
		overflow: hidden;
		padding-bottom: 30rpx;

		.main {
			width: 710rpx;
			margin: 20rpx;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 10px;

			.product_info {
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #EEEEEE;
			}

			.apply_number {
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					height: 28rpx;
					font-size: 28rpx;
					line-height: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.control {
					font-size: 24rpx !important;
				}
			}

			.apply_reason {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					height: 28rpx;
					font-size: 28rpx;
					line-height: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.picker {
					.choose {
						height: 28rpx;
						font-size: 28rpx;
						line-height: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						display: flex;
						align-items: center;

						image {
							width: 14rpx;
							height: 23rpx;
							margin-left: 15rpx;
						}

						.active {
							color: rgba(51, 51, 51, 1);
						}
					}
				}
			}

			.apply_mark {
				margin-top: 50rpx;

				.input {
					width: 650rpx;
					height: 250rpx;
					background: rgba(248, 248, 248, 1);
					border-radius: 4rpx;
					padding: 30rpx 20rpx 60rpx 20rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					position: relative;

					textarea {
						height: 160rpx;
					}

					text {
						position: absolute;
						right: 20rpx;
						bottom: 20rpx;
					}
				}
			}

			.apply_upload {
				margin-top: 20rpx;

				.tip {
					height: 24rpx;
					font-size: 24rpx;
					line-height: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(242, 39, 50, 1);
				}

				.images {
					width: 100%;
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;

					.image {
						width: 160rpx;
						height: 160rpx;
						position: relative;
						margin-bottom: 10rpx;
						margin-right: 10rpx;

						>image {
							width: 100%;
							height: 100%;
						}

						.delete {
							width: 40rpx;
							height: 40rpx;
							position: absolute;
							right: 10rpx;
							top: 10rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

					.btn {
						width: 160rpx;
						height: 160rpx;

						image {
							width: 160rpx;
							height: 160rpx;
						}
					}
				}
			}
		}

		.way {
			width: 710rpx;
			height: 100rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10rpx;
			margin: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			padding: 0 30rpx;

			.left {
				color: rgba(51, 51, 51, 1);
			}

			.right {
				color: rgba(153, 153, 153, 1);
			}
		}

		.submit {
			margin-top: 30rpx;

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
</style>
