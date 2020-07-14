<template>
	<view class="item flex-align-center">
		<checkbox @click="clickCheckBox" class="c-checkbox" color="#17B948" :checked="item.checked" v-if="type=='cart'" />
		<image class="g-img" :src="item.goods_images[0]"
		 mode=""></image>
		<view class="g-info">
			<p class="g-name clamp-two">{{item.goods_title || item.goods_name}}</p>
			<div class="flex flex-align-center resBox">
				<p class="g-spec flex-justify-center">
					<text>{{item.spec_item_title | split}}</text>
					<!-- <text v-if="type=='cart'" class="iconfont iconarrow"></text> -->
				</p>
				<p v-if="reFoundBtn" class="reFoundBtn" @click="handleToRefund">退货</p>
			</div>
			<p class="discount" v-if="item.discount">{{item.discount/10}}折</p>
			<p class="pirce-box flex-align-center">
				<span class="n-price">
					<span class="p-icon">¥</span>{{item.goods_price}}
				</span>
				<span class="num" v-if="type=='order'">x{{item.goods_num}}</span>
				<uni-number-box v-if="type=='cart'" :isFor="true" :value='item.goods_num' :max="item.stock" min="1" @change="getNumberValue" :onlyKey="123"></uni-number-box>
			</p>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			type:{
				type:String,
				default:'cart'
			},
			reFoundBtn:false
		},
		filters:{
			split(str){
				return  str.replace('_',' : ');
			},
		},
		data() {
			return {

			};
		},
	
		methods:{
			handleToRefund(){
				this.$emit('handleToRefund')
			},
			getNumberValue(e){
				console.log(e)
				this.$emit('changeNum',{goods_num:e.inputValue,addType:e.addType,oldValue:e.oldValue})
				this.chooseNum = e.value
			},
			clickCheckBox(){
				this.$emit('onePick')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding-bottom: 30rpx;
		.c-checkbox{
			margin-right: 20rpx;
		}
		.g-img {
			width: 219rpx;
			height: 219rpx;
			margin-right: 20rpx ;
		}

		.g-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			text-align: left;
			height: 230rpx;

			.g-name {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
			.resBox{
				.reFoundBtn{
					width:150rpx;
					height:50rpx;
					line-height:50rpx;
					text-align: center;
					border:1rpx solid rgba(221,221,221,1);
					border-radius:25rpx;
					font-size:28rpx;
					font-weight:400;
					margin-left: auto;
					color:rgba(102,102,102,1);
				}
				.g-spec {
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 36rpx;
					margin-top: 18rpx;
					// padding:0 13rpx;
					width: 194rpx;
					height: 46rpx;
					line-height: 46rpx;
					background: rgba(248, 248, 248, 1);
					border-radius: 4rpx;
				
				}
			}
			

			.discount {
				margin-top: 10rpx;
				width: 80rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				background: rgba(255, 180, 79, 1);
				border-radius: 4rpx;
				font-size: 24rpx;
				color: #fff;
				font-weight: 400;
			}

			.pirce-box {
				margin-top: auto;
				display: flex;
				justify-content: space-between;

				.n-price {
					font-size: 40rpx;
					font-weight: 500;
					color: rgba(242, 39, 50, 1);
					margin-right: 20rpx;

					.p-icon {
						font-size: 24rpx;
					}
				}
				.num{
					font-size:24rpx;
					font-weight:400;
					color:rgba(153,153,153,1);
				}

			}
		}
	}
</style>
