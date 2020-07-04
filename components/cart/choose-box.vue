<template>
	<view class="choose-components" :style="{width:color=='red'?'38rpx':'34rpx',height:color=='red'?'38rpx':'34rpx',}">
		<image v-if="status" :src="color=='red'?'/static/icon/icon_cart_selected.png':'/static/icon/icon_green_selected.png'" mode="widthFix"></image>
		<image v-if="!status" src="/static/icon/icon_cart_noselect.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		props:{
			color:{
				type:String,
				default:'red'
			},
			status:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.choose-components{
		width: 38rpx;
		height: 38rpx;
		display:flex;
		align-items:center;
		// overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
