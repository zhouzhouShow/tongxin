<template>
	<view class="componentsHeadImg">
		<image :lazy-load="true" mode="widthFix" @load="imgLoad" :src="src" @error="imgError" :style="'width:'+width+'rpx;'"
		 alt=""></image>
		<view class="imgloadingBox" v-if="isLoadImg">
			<wLoading></wLoading>
		</view>
		<view class="defaultBox" v-if="isShowError">
			<image src="/static/errorImage.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import wLoading from "@/components/w-loading.vue"
	export default {
		props: {
			src: {
				type: String,
				default: ""
			},
			parentsWidth: {
				type: Number,
				default: 1
			},
			parentsHeight: {
				type: Number,
				default: 1
			},
		},
		components: {
			wLoading
		},
		data() {
			return {
				width: 0,
				isShowError: false,
				isLoadImg: true,
			};
		},
		methods: {
			imgLoad(e) {
				this.isShowError = false;
				this.isLoadImg = false;
				var width = e.detail.width,
					height = e.detail.height;
				if (width / height > this.parentsWidth / this.parentsHeight) {
					this.width = this.parentsHeight * (width / height);
				} else {
					this.width = this.parentsWidth;
				}
			},
			imgError() {
				this.isShowError = true;
				this.isLoadImg = false;
			}
		},
		mounted() {
			this.isLoadImg = true;
		}
	}
</script>

<style lang="scss">
	.componentsHeadImg {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;

		.defaultBox {
			width: 100%;
			height: 100%;
			background: #f1f1f1;

			image {
				width: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 99;
			}
		}

		&>image {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 99;
		}
	}
</style>
