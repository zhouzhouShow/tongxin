<template>
	<view>
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
			<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
			<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
			<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
	}
</script>

<style>
.uni-bg-red{
	background: red;
}
.uni-bg-green{
	background: blue;
}
.uni-bg-blue{
	background: green;
}
.scroll-view_H{
	white-space: nowrap;
}
.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
</style>
