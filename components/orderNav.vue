<template>
	<view class="order_nav">
		<view @click="changeNav(nav.ids)" v-for="(nav,num) in navList" :key="num" :class="['item',nowNavIndex==nav.ids?'active':'']">
			<text>{{nav.name}}</text>
			<image v-if="nowNavIndex==nav.ids" src="@/static/images/center/icon_nav-active.png" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			navList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				nowNavIndex:0
			};
		},
		methods:{
			changeNav(ids){
				if(this.nowNavIndex==ids) return
				this.nowNavIndex = ids
				this.$emit('change',ids)
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		box-sizing: border-box;
	}
	.order_nav {
		width: 750rpx;
		height: 90rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: space-between;
		padding: 30rpx 30rpx 0 30rpx;

		.item {
			height: 60rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;

			text {
				height: 32rpx;
				line-height: 32rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			image {
				width: 32rpx;
				height: 14rpx;
				margin-top: 7rpx;
			}

			&.active {
				text {
					font-weight: bold;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
