<template>
	<view class="choose_relate">
		<view @click="chooseItem(item)" v-for="(item,index) in productList" :key="index" class="item">
			<view class="select">
				<image :src="selectIds.includes(item.id)?require('../../static/images/seeding/icon_select.png'):require('../../static/images/seeding/icon_unselect.png')"
				 mode=""></image>
			</view>
			<view class="image">
				<image :src="item.cover" mode="aspectFill"></image>
			</view>
			<view class="info">
				<view class="name">
					<text>{{item.name}}</text>
				</view>
				<view class="price">
					<text class="type">¥</text>
					<text class="total">{{item.price}}</text>
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
				loadingType: 'more',
				productList: [{
						id: 1,
						cover: 'http://img0.imgtn.bdimg.com/it/u=3347969450,2605879496&fm=26&gp=0.jpg',
						name: '2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 ',
						price: 88
					},
					{
						id: 2,
						cover: 'http://img0.imgtn.bdimg.com/it/u=3347969450,2605879496&fm=26&gp=0.jpg',
						name: '2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 2020新款木马短袖女童连衣裙宝宝夏装纯棉 ',
						price: 188
					}
				],
				selectIds: []
			};
		},
		onReachBottom() {
			if (this.loadingType == 'loading' || this.loadingType == 'noMore') return
			this.loadingType = 'loading'
			setTimeout(() => this.loadingType = 'more', 3000)
		},
		onLoad(options) {
			this.eventChannel = this.getOpenerEventChannel()
		},
		onUnload() {
			this.eventChannel.emit('getRelateInfo', {
				selectIds: this.selectIds
			})
		},
		methods: {
			chooseItem(item) {
				let isHas = this.selectIds.includes(item.id)
				if (isHas) {
					this.selectIds.forEach((el, num) => {
						if (el == item.id) {
							this.selectIds.splice(num, 1)
						}
					})
				} else {
					this.selectIds.push(item.id)
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
