<template>
	<view class="container">
		<scroll-view scroll-y class="scroll-y">
			<radio-group @change='handleChooseDefault'>
				<view class="address-item" v-for='item in addressList' :key='item.id'>
					<view class="address-item-top" @click.stop="orderBindAddress(item.id)">
						<view>{{item.realname}} {{item.mobile}}</view>
						<view>{{item.prov_name}}{{item.city_name}}{{item.dist_name}}{{item.address}}</view>
					</view>
					<view class="address-item-bottom">
						<view @click='changeDafaultAddress(item)'>
							<label class="radio">
								<radio :checked='item.status=="1"?true:false'>默认地址</radio>
							</label>
						</view>
						<view>
							<view class="yticon icon-bianji" @click='handleTo(item)'></view>
							<view class="yticon icon-iconfontshanchu1" @click='delAddress(item)'></view>
						</view>
					</view>
				</view>
			</radio-group>
		</scroll-view>
		<view class="btn">
			<view @click='handleTo(false)'>新建地址</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				loadFinish:false,
				addressList: [],
				again:false,
				isOrder:0,
			}
		},
		methods: {
			handleChooseDefault(e) {
				console.log(e)
			},
			handleTo(item) {
				let url;
				if(item){
					url = `addressManage?item=${JSON.stringify(item)}&type=${this.type}`
				}else{
					url = `addressManage?type=${this.type}`
				}
				uni.navigateTo({
					url
				})
			},
			changeDafaultAddress(item) {
				this.$request.post({
					url: this.$api.addressSetDefault,
					data: {
						address_id: item.id
					}
				}).then(res => {
					console.log('changeDefaultAddress', res)
				})
			},
			delAddress(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除此地址吗？',
					success: function(res) {
						if (res.confirm) {
							_this.$request.post({
								url: _this.$api.addressDel,
								data: {
									address_ids: item.id
								}
							}).then(rs => {
								console.log('delAddress', rs)
								_this.$request.post({
									url: _this.$api.addressList,
									data:{
										page: 1,
										pageSize: 10,
										type: _this.type
									}
								}).then(r => {
									console.log('addressList', r)
									_this.addressList = r.list
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			orderBindAddress(id){
				if(this.isOrder == 1){
					uni.setStorageSync('addressId', id);
					uni.navigateBack({
						delta:1
					})
				}
			},
			getAddressList() {
				this.$request.post({
					url: this.$api.addressList,
					data:{
						page: 1,
						pageSize: 10,
						type: this.type
					}
				}).then(res => {
					console.log('addressList', res)
					this.addressList = res.list
				})
			}
		},
		mounted() {
			if(this.loadFinish){
				this.getAddressList()
			}
		},
		onShow() {
			if(this.again){
				this.getAddressList()
			}
			this.again = true;
		},
		onLoad(data){
			if(data.type == 'receive'){
				this.type = 0
				this.loadFinish = true
				uni.setNavigationBarTitle({
				    title: '收货地址'
				});
			}else if(data.type == 'send'){
				this.type = 1
				this.loadFinish = true
				uni.setNavigationBarTitle({
				    title: '发货地址'
				});
			}
			this.loadFinish = true;
			this.isOrder = data.isOrder;
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #F3F3F3;

		.container {
			height: 100%;

			.scroll-y {
				height: calc(100% - 140rpx);

				.address-item {
					background: white;
					height: 332rpx;
					padding: 0 30rpx;
					margin-top: 20rpx;

					.address-item-top {
						height: 218rpx;
						font-weight: 500;
						overflow: hidden;

						>view:nth-child(1) {
							font-size: 32rpx;
							color: #1E1F20;
							margin: 30rpx 0;
						}

						>view:nth-child(2) {
							font-size: 30rpx;
							color: #666666;
						}
					}

					.address-item-bottom {
						height: 113rpx;
						border-top: 1rpx solid #EEEEEE;
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #666666;
						font-size: 30rpx;
						font-weight: 500;

						>view {
							display: flex;
							align-items: center;

							>view {
								width: 40rpx;
								height: 40rpx;
								font-size: 40rpx;
								margin-left: 40rpx;
							}
						}
					}
				}
			}

			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 26rpx 0;

				>view {
					width: 690rpx;
					height: 88rpx;
					background: #FF5152;
					color: white;
					border-radius: 10rpx;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 88rpx;
					text-align: center;
				}
			}
		}
	}
</style>
