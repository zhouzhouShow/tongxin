<template>
	<view class="com-footer-container">
		<view v-for="(item,index) in tabList" :key="index" :class="{'tab-ac':tabIdx == index}" @click.stop="navToTabPage(index)">
			<image :src="tabIdx == index?item.imgAc:item.imgDefault" mode="scaleToFill"></image>
			<text>{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabIdx: {
				type: Number,
				default: 0
			}
		},
		data() {
		
			
			return {
				tabList: [{
						"path": "/pages/index/index",
						"imgDefault": "/static/images/index-footer.png",
						"imgAc": "/static/images/index-active-footer.png",
						"title": "首页"
					}
						,
					// {
					// 	"path": "/pages/seeding/seeding",
					// 	"imgDefault": "/static/images/shopper-footer.png",
					// 	"imgAc": "/static/images/shopper-active-footer.png",
					// 	"title": "种草"
					// },
					{
						"path": "/pages/shopCart/shopCart",
						"imgDefault": "/static/images/shopcart-footer.png",
						"imgAc": "/static/images/shopcart-active-footer.png",
						"title": "购物车"
					},
				
					{
						"path": "/pages/center/center",
						"imgDefault": "/static/images/me-footer.png",
						"imgAc": "/static/images/me-active-footer.png",
						"title": "我的"
					}
				],
				
			}
		},
		methods: {
			navToTabPage(idx) {
				uni.hideTabBar({})
				if (idx != this.tabIdx) {
					uni.switchTab({
						url: this.tabList[idx].path
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-footer-container {
		height: 98rpx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #fff;
		border-top: 1rpx solid #eee;
		z-index: 210;
		box-sizing: border-box;

		&>view {
			width: 25%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 20rpx;
			color: #999;
			position: relative;

			image {
				width: 48rpx;
				height: 46rpx;
				margin-bottom: 2rpx;
			}

			&.tab-ac {
				color: #fa436a;
			}
		}
	}

	.angle-box {
		position: absolute;
		left: 80rpx;
		top: 6rpx;
	}
</style>
