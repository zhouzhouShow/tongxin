<template>
	<!-- showItem:{
		cart:true,
		share:true,
		backTop:true,
	}, -->
	<view class="backTop"  v-show="showItem">
		<view class="fixed-box">
			<image v-if="showItem.cart" @click.stop="trigger('cart')" src="../static/images/icon/fixed_cart.png" ></image>
			<!-- 单独分享处理逻辑 -->
			<block v-if="type=='special'"> 
				<image v-if="showItem.share" @click.stop="trigger('share')"  src="../static/images/icon/share_icon.png" ></image>
			</block>
			<block v-else>
				<button class="resetStyle" open-type="share"><image v-if="showItem.share" @click.stop="trigger('share')"  src="../static/images/icon/share_icon.png" ></image></button>
			</block>
			<image v-if="showItem.backTop" @click.stop="trigger('backTop')"  src="../static/images/icon/backTop.png" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:['showItem','type'],
		data() {
			return {
				
			};
		},
		methods:{
			trigger(type){
				switch (type){
					case 'cart':
						wx.navigateTo({
							url:'/pages/shopCart/shopCart2'
						})
						break;
					case 'share':
						this.$emit('share')
						break;
					case 'backTop':
						uni.pageScrollTo({
							scrollTop:0,
							duration:600
						})
						break;
					default:
						break;
				}
			},
			backTop(){
				
			},
		}
	}
</script>

<style lang="scss">
.backTop{
		position: fixed;
		bottom:150rpx;
		right:20rpx;
		width:72rpx;
		height:300rpx;
		z-index: 999;
		text-align: center;
		.fixed-box{
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			height: 100%;
			.resetStyle{}
			image{
				width:72rpx;
				height: 72rpx;
				margin-top:20rpx;
			}
		}
		
	}
</style>
