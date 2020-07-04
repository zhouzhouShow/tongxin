<template>
	<view class="progress-components" :style="'height:'+height+'rpx;border-radius:'+height/2+'rpx'">
		<view v-if="status == 'nomal'" class="nomal-progress" :style="'background:' +nomalBackground+';'">
			<text :style="nomalTextStyle">{{nomalText}}</text>
			<view class="percent-box" :style="'width:'+percentNum+'%;border-radius:'+(isRadius?(height/2):0)+'rpx;background:' +percentColor+';'"></view>
		</view>
		<view v-if="status == 'soldout'" class="sold-out-progress" :style="'border-radius:'+(isRadius?(height/2):0)+'rpx;background:' +soldOutBackground+';'">
			<text :style="soldOutTextStyle">{{soldOutText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			status: {
				type: String,
				default: 'nomal' //soldout 售罄  nomal 正常
			},
			percent: {
				type: Number,
				default: 0,
			},
			percentColor: {
				type: String,
				default: 'linear-gradient(right,#FF7D80 0%,#FF0A2C 100%)'
			},
			nomalText: {
				type: String,
				default: ''
			},
			nomalTextStyle: {
				type: String,
				default: ''
			},
			nomalBackground: {
				type: String,
				default: '#FFCBCE'
			},
			soldOutText: {
				type: String,
				default: ''
			},
			soldOutTextStyle: {
				type: String,
				default: ''
			},
			soldOutBackground: {
				type: String,
				default: '#CBCCD0'
			},
			height: {
				type: Number,
				default: 30
			},
			isRadius: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				percentNum:0
			};
		},
		mounted() {
			this.percentNum = this.percent;
		}
	}
</script>

<style lang="scss">
	.progress-components {
		display: block;
		overflow: hidden;
	}

	.nomal-progress {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18rpx;
		line-height: 18rpx;
		color: #fff;
		position: relative;

		text {
			position: relative;
			z-index: 10;
		}
	}

	.percent-box {
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		height: 100%;
		background: linear-gradient(right, #FF7D80 0%, #FF0A2C 100%);
		transition: width linear .3s;
		z-index: 9;
	}

	.sold-out-progress {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18rpx;
		line-height: 18rpx;
		color: #fff;
	}
</style>
