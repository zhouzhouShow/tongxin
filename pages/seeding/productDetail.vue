<template>
	<view class="product-detail">
		<view class="line"></view>
		<SeedingItem :list="productDetail" :showAllDesc="true" :userId="userInfo.id" @handleDelete="handleDelete" imagesType='swiper'
		 @handleConcern="handleConcern" @previewImage="previewImage" @handleLike="handleLike"></SeedingItem>
	</view>
</template>

<script>
	import {seedingJson} from '@/static/js/seedingJson.js'
	import SeedingItem from '@/components/seedingItem.vue'
	export default {
		name:"productDetail",
		components: {
			SeedingItem,
		},
		data() {
			return {
				userInfo: {
					id: 99,
					nickname: '呢子dayi',
					avatar: require('../../static/images/seeding/icon_avatar.png'),
					seeding: 2,
					fans: 3200
				},
				productDetail: [seedingJson[0]]
			};
		},
		methods: {
			handleConcern(id) {
				let item = this.productDetail.filter(v => v.id == id)[0] || {}
				item.master_info.is_follow = !item.master_info.is_follow
			},
			handleDelete(id) {
				this.productDetail.forEach((item, index) => {
					if (item.id == id) {
						this.productDetail.splice(index, 1)
					}
				})
			},
			previewImage(item, num) {
				this.imgPreview(item.product_info.images, num)
			},
			handleLike(id) {
				let item = this.productDetail.filter(v => v.id == id)[0] || {}
				item.product_info.is_like = !item.product_info.is_like
				item.product_info.like_num = item.product_info.is_like ? item.product_info.like_num + 1 : item.product_info.like_num -
					1
			},
			// 图片预览
			imgPreview(list, idx) {
				// list：图片 url 数组
				if (list && list.length > 0) {
					uni.previewImage({
						current: list[idx], //  传 Number H5端出现不兼容
						urls: list
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		view {
			box-sizing: border-box;
		}
	}
.line{
	width:750rpx;
	height:20rpx;
	background:rgba(243,243,243,1);
}
</style>
