<template>
	<view class="choose_relate">
		<view @click="chooseItem(item)" v-for="(item,index) in productList" :key="index" class="item">
			<view class="select">
				<image :src="selectIds.includes(item.goods_id)?require('../../static/images/seeding/icon_select.png'):require('../../static/images/seeding/icon_unselect.png')"
				 mode=""></image>
			</view>
			<view class="image">
				<image :src="item.goods_images[0]" mode="aspectFill"></image>
			</view>
			<view class="info">
				<view class="name">
					<text>{{item.goods_title}}</text>
				</view>
				<view class="price">
					<text class="type">¥</text>
					<text class="total">{{item.price_last}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingType: '1',
				page: 1,
				pageSize: 10,
				productList: [],
				selectIds: [],
				selectList: []
			};
		},
		onReachBottom() {
			if (this.loadingType == 'loading' || this.loadingType == 'noMore') return
			this.loadingType = 'loading'
			setTimeout(() => this.loadingType = 'more', 3000)
		},
		onLoad(options) {
			this.eventChannel = this.getOpenerEventChannel()
			this.eventChannel.on('relateInfo', data => {
				console.log(data)
				this.selectIds = data.relateIds
				this.selectList = data.relateList
			})
			this.getSeedingCarList()
		},
		onUnload() {
			uni.$emit('getRelateInfo', {
				relateIds: this.selectIds,
				relateList: this.selectList
			})
		},
		methods: {
			getSeedingCarList() {
				this.loadingType = 2
				this.$fly.post(this.$api.getSeedingCarList, {
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					this.productList = this.productList.concat(res.data.list)
					if (res.data.list.length < this.pageSize) {
						this.loadingType = 3
					} else {
						this.loadingType = 1
					}
				})
			},
			onReachBottom() {
				if (this.loadingType == 1) {
					this.page++
					this.getSeedingCarList()
				}
			},
			chooseItem(item) {
				let isHas = this.selectIds.includes(item.goods_id)
				if (isHas) {
					this.selectIds.forEach((el, num) => {
						if (el == item.goods_id) {
							this.selectIds.splice(num, 1)
						}
					})
					this.selectList.forEach((el, num) => {
						if (el.goods_id == item.goods_id) {
							this.selectList.splice(num, 1)
						}
					})
				} else {
					this.selectIds.push(item.goods_id)
					this.selectList.push({
						goods_id:item.goods_id,
						image: item.goods_images[0],
						name: item.goods_title,
						price: item.price_last
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.choose_relate {
		background-color: #F3F3F3;
		min-height: 100%;
		overflow: hidden;

		.item {
			padding: 30rpx 20rpx;
			display: flex;
			align-items: center;
			width: 710rpx;
			height: 278rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10rpx;
			margin: 20rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			.select {
				flex-basis: 60rpx;
			}

			.image {
				flex-basis: 218rpx;
				width: 218rpx;
				height: 219rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				height: 219rpx;
				flex: 1;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 42rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}

				.price {
					.type {
						height: 29rpx;
						font-size: 24rpx;
						font-family: DINPro;
						font-weight: 500;
						color: rgba(242, 39, 50, 1);
					}

					.total {
						height: 29rpx;
						font-size: 40rpx;
						font-family: DINPro;
						font-weight: 500;
						color: rgba(242, 39, 50, 1);
					}
				}
			}
		}
	}
</style>
