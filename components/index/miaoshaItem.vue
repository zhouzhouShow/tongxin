<template>
	<view class="item" v-if="item">
		<view class="img-box">
			<image v-show="!isShowLoading" :style="{height: height+'rpx'}"   class="good-img" @load="loaded"  :src="item.goods_images[0]" mode="aspectFill"></image>
			<image v-if="isShowLoading"  class="good-img" src="@/static/images/icon/loading-icon.gif" mode=""></image>
			<!-- <view class="time">距结束02:02:02</view> -->
		</view>
		<view class="price-box">
			<text class="n-price">¥{{item.price_last}}</text>
			<text class="o-price">¥{{item.price_market}}</text>
		</view>
		<view class="getNum" v-if="is_agent">
			<image src="../../static/images/index/zhuan.png"></image>
			¥{{item.commission}}
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item','itemHeight'],
		data() {
			return {
				isShowLoading:true,
				height:0,
			};
		},
		mounted(){
			this.isShowLoading = true
			this.height = 0
		},
		methods:{
			loaded(){
				setTimeout(()=>{
					this.isShowLoading = false
					this.height = this.itemHeight
				},50)
			},
		},
		computed:{
			is_agent(){//是否代理
				return this.$store.state.is_agent || false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: inline-block;
		margin-right: 18rpx;
		width: 200rpx;

		.img-box {
			position: relative;
			margin-bottom: 20rpx;

			.good-img {
				width: 200rpx;
				height: 200rpx;
			}

			.time {
				position: absolute;
				bottom: 0;
				left: 0;
				height: 30rpx;
				line-height: 30rpx;
				width: 150rpx;
				text-align: center;
				border-radius: 0px 10rpx 0px 0px;
				background: rgba(242, 39, 50, 1);
				font-size: 20rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
		}

		.price-box {
			display: flex;
			justify-content: space-between;
			font-weight: 500;
			color: rgba(242, 39, 50, 1);
			line-height: 36rpx;
			margin-bottom: 10rpx;
			font-family:DINPro;
			.n-price {
				font-size: 30rpx;
			}

			.o-price {
				font-size: 26rpx;
				color: #999999;
				font-weight:400;
				text-decoration: line-through;
			}
		}

		.getNum {
			font-size: 26rpx;
			font-weight: 400;
			color: rgba(255, 180, 79, 1);
			display: flex;
			align-items: center;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 4rpx;
			}
		}
	}
</style>
