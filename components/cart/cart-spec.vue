<template>
	<view class="cart-spec-components">
		<view class="c-spec-left">
			<slot></slot>
		</view>
		<view class="c-spec-right">
			<view class="c-spec-detail">
				<text>颜色：{{item.color}}</text>
				<text>尺码：{{item.size}}</text>
			</view>
			<uni-number-box :ref="'num'+item.carts_id" :min="1" :max="item.stokcnum" :value="item.goods_num" @change="numChange"></uni-number-box>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		props:{
			item:Object,
			specKey:String
		},
		components:{
			uniNumberBox
		},
		data() {
			return {
				
			};
		},
		methods:{
			numChange(e){
				console.log(e)
				this.$emit('change',{value:e.value,key:this.specKey});
			},
			resetNum(){
				this.$refs['num'+item.carts_id].resetNum();
			}
		}
	}
</script>

<style lang="scss">
	.cart-spec-components{
		height: 84rpx;
		width: 100%;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
		border-radius: 2rpx;
		margin-bottom: 10rpx;
	}
	.c-spec-left{
		flex: none;
		width: 88rpx;
		height: 100%;
		padding-left: 30rpx;
		box-sizing: border-box;
	}
	.c-spec-right{
		flex: auto;
		height: 100%;
		background: #F8F8F8;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #1E1F20;
		padding: 0 20rpx;
	}
	.c-spec-detail{
		font-size: 24rpx;
		color: #666;
		display:flex;
		align-items:center;
		text:first-child{
			width: 180rpx;
		}
	}
</style>
