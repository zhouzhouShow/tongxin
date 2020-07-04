<template>
	<view class="container-header">
		<view class="container-header-item" v-for='(item,index) in items' :key='item' @click='onClickItem(index)'>
			<view :class="[current == index?'container-header-item-active':'container-header-item-deactive']" :style='{"fontSize":fontResize}'>
				{{item}}
				<view></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			items:{
				type:Array,
				default:()=>['标题一','标题二','标题三']
			},
			current:{
				type:Number,
				default:0
			},
			fontResize:{
				type:String,
				default:'30rpx'
			}
		},
	    data() {
	        return {
	            
			}
		},
		methods: {
			//标题栏点击事件 改变对应下标
		    onClickItem(index) {
		        this.$emit('onClickItem',index)
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.container-header{
		height: 90rpx;
		display: flex;
		border-bottom:1rpx solid rgba(238,238,238,1); 
		overflow: hidden;
		background: white;
		.container-header-item{
			flex: 1;
			display: flex;
			justify-content: center;
			text-align: center;
			view{
				width:50%;
				font-weight:500;
				color:rgba(30,31,32,1);
				line-height: 90rpx;
			}
			.container-header-item-active{
				color:rgba(254,46,46,1);
				position: relative;
				view{
					position: absolute;
					width: 100%;
					height: 4rpx;
					background: rgba(254,46,46,1);
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					animation: showLine 0.5s;
				}
			}
			.container-header-item-deactive{
				position: relative;
				view{
					position: absolute;
					width: 0;
					height: 4rpx;
					background: rgba(254,46,46,1);
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					animation: hideLine 0.5s;
				}
			}
			@keyframes showLine
			{
				from {width:0;}
				to {width:100%;}
			}
			@-webkit-keyframes showLine
			{
				from {width:0;}
				to {width:100%;}
			}
			@keyframes hideLine
			{
				from {width:100%;}
				to {width:0;}
			}
			@-webkit-keyframes hideLine
			{
				from {width:100%;}
				to {width:0;}
			}
		}
	}
</style>
