<template>
	<view>
		<view class="product-container" :class="'item-'+item.id" @click.stop="navToDetailPage(item.id)" v-if="type != 'isCollect'">
			<view class="product-img-box">
				<center-img v-if="show" :src="isWill?item.img:item.pic_urls[0]" :parentsWidth="360" :parentsHeight="480"></center-img>
				<image v-if="item.stocksnum<=0" class="sale-over" src="/static/sale-over.png" mode="widthFix"></image>
				<image v-if="item.video_url" class="video-img" src="/static/play-btn.png" mode="widthFix"></image>
				<view class="last-sales-return-time clamp" v-if="type=='helpBuy'">
					<text>最晚退货时间：{{item.last_return_time}}</text>
				</view>
			</view>
			<view class="product-content" v-if="!isWill">
				<view class="product-price">
					<!-- <text>{{level == 13?'加盟代理':'PLUS会员'}}</text> -->
					<text>加盟代理</text>
					<text>¥{{ item.lastmoney?item.lastmoney:item.price_sale }}</text>
				</view>
				<view class="product-code-collect">
					<text class="product-code">{{item.code}}</text>
					<view class="product-collect">
						<image src="/static/icon/icon_collect.png" mode=""></image>
						<text>{{ item.viewnum }}</text>
					</view>
				</view>
				<view class="product-title clamp">{{ item.title }}</view>
				<view class="product-time" v-if="type=='centerList'">上次进货：7月1日</view>
				<view class="product-activity" v-if="type=='helpBuy'">{{item.activity}}</view>
			</view>
			<!-- //即将上新 -->
			<view class="product-is-will" v-if="isWill"><text>款号:{{item.code}}</text></view>
		</view>
		
		<view class="product-container" :class="'item-'+item.id" v-if="type == 'isCollect'">
			<view class="product-img-box">
				<center-img v-if="show" :src="item.pic_urls[0]" :parentsWidth="360" :parentsHeight="480"></center-img>
				<image v-if="item.stocksnum<=0" class="sale-over" src="/static/sale-over.png" mode="widthFix"></image>
				<view class="last-sales-return-time clamp" v-if="type=='helpBuy'">
					<text>最晚退货时间：{{item.last_return_time}}</text>
				</view>
			</view>
			<view class="product-content" v-if="!isWill">
				<view class="product-price">
					<text>{{level == 13?'加盟价':'PLUS会员'}}</text>
					<text>¥{{ item.lastmoney?item.lastmoney:item.price_sale }}</text>
				</view>
				<view class="product-code-collect">
					<text class="product-code">{{item.code}}</text>
					<view class="product-collect">
						<image src="/static/icon/icon_collect.png" mode=""></image>
						<text>{{ item.viewnum }}</text>
					</view>
				</view>
				<view class="product-title clamp">{{ item.title }}</view>
				<view class="product-time" v-if="type=='centerList'">上次进货：7月1日</view>
				<view class="product-activity" v-if="type=='helpBuy'">{{item.activity}}</view>
			</view>
			<!-- //即将上新 -->
			<view class="product-is-will" v-if="isWill"><text>款号:{{item.code}}</text></view>
		</view>
	</view>
	
</template>

<script>
	let observer = null;
	export default {
		props: {
			item: {
				type: Object
			},
			isWill: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				show: false,
			}
		},
		computed:{
			level(){
				return this.$intercept.userDetail.level;
			}
		},
		methods: {
			//详情页
			navToDetailPage(id) {
				if (this.isWill) {
					return;
				}
				this.$shake.setShake(()=>{
					uni.navigateTo({
						url: `/pages/shopkeeper/product/product?id=${id}`
					})
				})
			}
		},
		mounted() {
			this.$nextTick(() => {
				var that = this;
				observer = uni.createIntersectionObserver(this);
				observer.relativeToViewport({
					bottom: 20
				}).observe('.item-' + that.item.id, (res) => {
					if (res.intersectionRatio > 0) {
						that.show = true;
					}
				})
			})
			// this.$intercept.getUserDetail(() => {
			// 	this.level = 
			// 	console.log(this.level )
			// })
		},
		beforeDestroy() {
			if (observer) {
				observer.disconnect()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.product-container {
		width: 360rpx;
		background: #fff;
		border-radius: 4rpx;
		overflow: hidden;
	}

	.product-img-box {
		width: 360rpx;
		height: 480rpx;
		position: relative;
	}

	.last-sales-return-time {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60rpx;
		background: rgba(0, 0, 0, .5);
		color: #fff;
		font-size: 24rpx;
		font-weight: 400;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		z-index: 100;
	}

	.product-content {
		height: 196rpx;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
		padding-top: 10rpx;
		box-sizing: border-box;
	}

	.product-price {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;

		text:first-child {
			width: 120rpx;
			height: 38rpx;
			line-height: 38rpx;
			background: $base-color;
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			color: #fff;
			margin-right: 10rpx;
		}

		text:last-child {
			font-size: 34rpx;
			font-weight: 500;
			color: $font-black;
		}
	}

	.product-code-collect {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 22rpx;
		line-height: 22rpx;
		color: $font-color-code;
		margin-bottom: 18rpx;

		view {
			align-items: center;
			display: flex;

			image {
				width: 24rpx;
				height: 21rpx;
				margin-right: 6rpx;
			}
		}
	}

	.product-title {
		font-size: 26rpx;
		color: $font-color-dark;
		margin-bottom: 18rpx;
		line-height: 26rpx;
	}

	.product-time {
		font-size: 24rpx;
		line-height: 24rpx;
		color: $base-color;
	}

	.product-activity {
		font-size: 22rpx;
		color: $font-color-light;
		border: 1px solid $font-color-light;
		height: 34rpx;
		line-height: 22rpx;
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		padding: 0 10rpx;
		border-radius: 2rpx;
	}

	.product-is-will {
		height: 66rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: $font-color-base;
	}
</style>
