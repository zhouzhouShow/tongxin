<template>
	<view class="brand-container" @click.stop="navToBrand(item.id)">
		<view class="b-c-header">
			<view class="b-c-img-title clamp">
				<image class="b-c-img" :src="item.brand_logo" mode="aspectFit"></image>
				<view class="b-c-title-tip clamp">
					<text class="b-c-title">{{item.brand_name}}</text>
					<text class="clamp">{{item.brand_description}}</text>
				</view>
			</view>
			<view class="b-c-collect" v-if="type =='recommended'">
				<text>查看更多</text>
			</view>
			<view class="b-c-collect" @click.stop="collectBrand(item.id)" v-if="type =='collect'">
				<image v-if="item.iscollect == 0" src="/static/icon/icon_collect.png"></image>
				<image v-if="item.iscollect == 1" src="/static/icon/icon_collect-fill.png"></image>
				<text>{{item.iscollect == 0?'收藏品牌':'已收藏'}}</text>
			</view>
		</view>
		<view class="brand-scroll-box">
			<scroll-view class="brand-scroll" scroll-x>
				<view class="brand-scroll-item" v-for="(items,index) in item.goodlist" :key="index">
					<view class="b-i-img">
						<center-img :src="items.pic_urls[0]" :parentsWidth="210"></center-img>
					</view>
					<view class="b-i-text">
						<view class="b-i-title clamp">{{items.title}}</view>
						<view class="b-i-price">¥{{items.price_sale}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
			},
			idx: Number,
			type:{
				type:String,
				default:'collect'  //recommended 详情页的推荐收藏  collect 显示收藏的品牌
			}
		},
		data() {
			return {};
		},
		methods: {
			navToBrand(id) {
				if(this.type == 'collect'){
					uni.navigateTo({
						url: `/pages/shopkeeper/shop-brand/shop-brand?id=${id}`
					})
				}
				if(this.type == 'recommended'){
					if(this.is_brandHall == 1){
						uni.navigateTo({
							url: `/pages/shopkeeper/shop-brand/shop-brand?id=${id}`
						})
					}else{
						this.$tags.indexTabTag = this.item.nav_id;
						uni.switchTab({
							url:`/pages/index/index`
						})
					}
				}
			},
			collectBrand(id) {
				this.$request.post({
					url: this.$api.collecBrands,
					loadingTip: '加载中',
					data: {
						brand_id: id,
						type: 1
					}
				}).then((res) => {
					this.$emit('collect', {
						idx: this.idx
					});
				})

			},
		}
	}
</script>

<style lang="scss">
	.brand-container {
		height: 488rpx;
		background: #fff;
		margin: 20rpx 0;
		box-sizing: border-box;
	}

	.b-c-header {
		padding: 10rpx 30rpx 0;
		height: 170rpx;
		box-sizing: border-box;
		flex: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.b-c-img-title {
			display: flex;
			align-items: center;

			.b-c-img {
				flex: none;
				width: 120rpx;
				height: 120rpx;
				border: 1px solid #EEEEEE;
				border-radius: 10rpx;
				margin-right: 16rpx;
			}

			.b-c-title-tip {
				flex: auto;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				font-size: 28rpx;
				padding-right: 20rpx;
				color: $font-color-disabled;
				box-sizing: border-box;

				text {
					width: 100%;
				}

				.b-c-title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: $font-color-base;
					margin-bottom: 14rpx;
				}
			}
		}

		.b-c-collect {
			flex: none;
			width: 166rpx;
			height: 52rpx;
			border: 1px solid $font-color-dark;
			border-radius: 2rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $font-color-dark;
			font-size: 26rpx;
			box-sizing: border-box;

			image {
				width: 34rpx;
				height: 34rpx;
				margin-right: 4rpx;
			}
		}
	}

	.brand-scroll-box {
		height: 318rpx;
		padding-bottom: 8rpx;
		padding-top: 4rpx;
		box-sizing: border-box;

		.brand-scroll {
			height: 100%;
			white-space: nowrap;
			width: 100%;

			.brand-scroll-item {
				width: 210rpx;
				height: 100%;
				margin-right: 10rpx;
				display: inline-block;

				.b-i-img {
					width: 210rpx;
					height: 210rpx;
					margin-bottom: 8rpx;
					border-radius: 8rpx;
					overflow: hidden;
				}

				.b-i-text {
					.b-i-title {
						font-size: 26rpx;
						color: $font-color-base;
						margin-bottom: 12rpx;
					}

					.b-i-price {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $font-black;
					}
				}
			}

			.brand-scroll-item:first-child {
				margin-left: 30rpx;
			}

			.brand-scroll-item:last-child {
				margin-right: 30rpx;
			}
		}
	}
</style>
