<template>
	<view class="search-components">
		<view class="search-right">
			<image src="/static/icon/icon_search.png" mode="widthFix"></image>
			<input type="text" :value="value" placeholder="搜索潮T" 
			@focus="getFocus"
			@blur="getBlur"
			@confirm="getConfirm"
			@input="getInput"
			confirm-type="search"/>
		</view>
		<view class="search-left" @click.stop="getSearch">
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			};
		},
		methods:{
			getSearch(){
				this.$emit('search',{value:this.value});
			},
			getFocus(e){
				this.$emit('focus',e);
			},
			getBlur(e){
				this.$emit('blur',e);
			},
			getConfirm(e){
				this.$emit('comfirm',{value:this.value});
			},
			getInput(e){
				this.value = e.detail.value;
				this.$emit('input',e)
			},
			setValue(e){
				this.value = e;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-components{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 85rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	.search-right{
		flex: auto;
		height: 64rpx;
		background: #eee;
		border-radius: 32rpx;
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		image{
			flex: none;
			width: 30rpx;
			height: 30rpx;
		}
		input{
			flex: auto;
			height: 100%;
			padding: 0 10rpx;
			box-sizing: border-box;
			font-size: 26rpx;
			color: $font-color-base;
		}
	}
	.search-left{
		flex: none;
		font-size: 30rpx;
		color: $font-color-disabled;
		width: 116rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
