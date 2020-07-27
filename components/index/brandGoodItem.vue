<template>
	<view class="item" v-if="item">
		<view class="img-box">
			<image class="good-img" v-show="!isShowLoading" :style="{height: height+'rpx'}" @load="loaded" :src="item.goods_images[0]" mode="aspectFill"></image>
			<image v-if="isShowLoading"  class="good-img" src="@/static/images/icon/loading-icon.gif" mode=""></image>
			<view class="getMoney">
				<view class="position" v-if="item.commission > 0 && is_agent">
					<image class="bg" src="../../static/images/index/kz_bg.png" mode=""></image>
					<view class="tip-text" >
						<text>可赚</text>
						<text class="num">{{item.commission}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="good-name">{{item.goods_title}}</view>
		<view class="price-box">
			<text class="n-price">¥{{item.price_last}}</text>
			<text class="o-price">¥{{item.price_market}}</text>
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
		display: flex;
		flex-direction: column;
		margin-right: 18rpx;
		width: 218rpx;
		
		.img-box {
			position: relative;
			margin-bottom: 20rpx;

			.good-img {
				width: 218rpx;
				height: 218rpx;
			}

			.getMoney {
				position: absolute;
				bottom: 0;
				left: 0;
				height: 68rpx;
				width: 67rpx;

				.position {
					position: relative;
					font-size: 20rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					
					.bg {
						position: absolute;
						left: 0;
						top: 0;
						width: 68rpx;
						height: 68rpx;
						z-index: 1;
					}

					view.tip-text {
						z-index: 2;
						position: absolute;
						left: 0;
						top: 0;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
						padding-left: 9rpx;
						// align-items: center;
						width: 68rpx;
						height: 68rpx;
					}
				}
			}
		}

		.good-name {
			margin-bottom: 20rpx;
			// width: 190rpx;
			// height: 60rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 30rpx;
			text-overflow: ellipsis;
			display: -webkit-box;
			overflow: hidden;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
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

	}
</style>
