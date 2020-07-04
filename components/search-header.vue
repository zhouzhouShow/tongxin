<template>
	<view class="searchContainer">
		<view class="searchInput" @click.stop="toSearch">
			<image src="/static/icon/icon_search.png" mode="scaleToFill"></image>
			<text>搜索商品/品牌/分类</text>
		</view>
		<view class="searchOperation">
			<!-- <button open-type="contact">
				<image src="/static/icon/icon_customer.png" mode="scaleToFill"></image>
				<text>客服</text>
			</button> -->
			<view @click.stop="toContact">
				<image src="/static/icon/icon_customer.png" mode="scaleToFill"></image>
				<text>客服</text>
			</view>
			<view @click.stop="scanCode">
				<image src="/static/icon/icon_sweep.png" mode="scaleToFill"></image>
				<text>扫一扫</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			},
			toContact() {
				uni.navigateTo({
					url: `/pages/center/server/server`
				})
			},
			//扫码
			scanCode() {
				var _this = this;
				uni.scanCode({
					success: function(res) {
						// console.log(res);
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
						let data = _this.$share.ErcodeParameter({q:res.result});
						_this.$tips.loading('');
						_this.$utils.code2goods(data.id).then(res=>{
							_this.$tips.loaded();
							uni.navigateTo({
							    url: '/pages/shopkeeper/product/product?id='+res.goods_id
							});
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.searchContainer {
		display: flex;
		height: 84rpx;
		padding-left: 30rpx;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
		z-index: 100;
	}

	.searchInput {
		font-size: 26rpx;
		color: $font-color-disabled;
		height: 64rpx;
		background: #eee;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		flex-grow: 1;
		flex-shrink: 1;
		border-radius: 32rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.searchOperation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 184rpx;
		padding: 0 12rpx;
		flex-grow: 0;
		flex-shrink: 0;

		view,
		button {
			display: flex;
			width: 50%;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			line-height: 30rpx;
			color: $font-color-dark;
			padding: 0;
			background: #fff;
			border: none;

			image {
				width: 44rpx;
				height: 38rpx;
			}
		}

		button:after {
			border: none;
		}
	}
</style>
