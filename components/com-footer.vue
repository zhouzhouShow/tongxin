<template>
	<view class="com-footer-container">
		<view v-for="(item,index) in tabList" :key="index" :class="{'tab-ac':tabIdx == index}" @click.stop="navToTabPage(index)">
			<image :src="tabIdx == index?item.imgAc:item.imgDefault" mode="scaleToFill"></image>
			<text>{{item.title}}</text>
			<view class="angle-box" v-if="index == 4">
				<angle :value="centerAngle" background="#FE2E2E" height="34rpx" padding="0 8rpx" fontSize="24rpx" borderRadius="17rpx"></angle>
			</view>
		</view>
	</view>
</template>

<script>
	import angle from '@/components/angle.vue'
	export default {
		components: {
			angle
		},
		props: {
			tabIdx: {
				type: Number,
				default: 0
			},
			centerAngle: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [{
						title: '首页',
						imgDefault: '/static/tab-home.png',
						imgAc: '/static/tab-home-current.png',
						path: '/pages/index/index'
					},
					{
						title: '分类',
						imgDefault: '/static/tab-cate.png',
						imgAc: '/static/tab-cate-current.png',
						path: '/pages/category/category'
					},
					{
						title: '代卖',
						imgDefault: '/static/tab-help.png',
						imgAc: '/static/tab-help-current.png',
						path: '/pages/helpBuy/helpBuy/helpBuy'
					},
					{
						title: '进货车',
						imgDefault: '/static/tab-cart.png',
						imgAc: '/static/tab-cart-current.png',
						path: '/pages/cart/cart'
					},
					{
						title: '我的',
						imgDefault: '/static/tab-my.png',
						imgAc: '/static/tab-my-current.png',
						path: '/pages/center/user/user'
					}
				],
			}
		},
		methods: {
			navToTabPage(idx) {
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
		height: 94rpx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-top: 1px solid #ddd;
		z-index: 210;
		box-sizing: border-box;

		&>view {
			width: 20%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 20rpx;
			color: #C0C4CC;
			position: relative;

			image {
				width: 54rpx;
				height: 50rpx;
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
