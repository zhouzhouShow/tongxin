<template>
	<view class="product-detail">
		<view class="line"></view>
		<SeedingItem :list="productDetail" :showAllDesc="true" :userId="userInfo.id" @handleDelete="handleDelete" imagesType='swiper'
		 @handleConcern="handleConcern" @previewImage="previewImage" @handleLike="handleLike"></SeedingItem>
	</view>
</template>

<script>
	import SeedingItem from '@/components/seedingItem.vue'
	export default {
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
				productDetail: [{
					id: 1,
					master_info: {
						user_id: 98,
						avatar: require('../../static/images/seeding/icon_avatar.png'),
						nickname: '呢子dayi',
						title: '种草达人',
						is_follow: false
					},
					product_info: {
						id: 1,
						images: [
							'http://www.emeiji.com/photo/UREgE0pfe0xQCDNNWAk9AF0LegBWCHsBWAp7FkkJOwJdADBMUFF7UQtVY1UJXGxbD1RmUhYqZSB3VWUXWFUSMkhUIlZqEDIifQ8gW2ZEdVELVWNVCVxsWw9UZlIXDyQEZlZlU0FWZVM.jpg',
							'http://www.emeiji.com/photo/UREgE0pfe0xQCDNNWAk9AF0LegBWCHsBWAp7FkkJOwJdADBMUFF7VQ1RY1EJVWRRFiplIHdVZRJbIRkIclQWEEEqAzNWBAABZkR1VQ1RY1EJVWRRFFV5D0wHNQ1MSCdNUxUzPApUZBsKVGQ.jpg',
							'http://img0.imgtn.bdimg.com/it/u=3347969450,2605879496&fm=26&gp=0.jpg',
							'http://img2.imgtn.bdimg.com/it/u=3012120879,3377454015&fm=11&gp=0.jpg',
							'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg'
						],
						cover: 'http://img2.imgtn.bdimg.com/it/u=3012120879,3377454015&fm=11&gp=0.jpg',
						video: '',
						name: '【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝',
						desc: '2020新款中大儿童两件套帅洋气休闲韩版，各位可以参考一下，然后再做购买。价格合理，质量保证，欲购从速2020新款中大儿童两件套帅洋气休闲韩版，各位可以参考一下，然后再做购买。价格合理，质量保证，欲购从速…',
						price: 199,
						toppic_id: 1,
						topic: '今天又种草了新的穿搭',
						like_num: 2000,
						share_num: 2000,
						is_like: false,
					},
					related_products: [{
						id: 2,
						images: [
							'http://www.emeiji.com/photo/UREgE0pfe0xQCDNNWAk9AF0LegBWCHsBWAp7FkkJOwJdADBMUFF7UQtVY1UJXGxbD1RmUhYqZSB3VWUXWFUSMkhUIlZqEDIifQ8gW2ZEdVELVWNVCVxsWw9UZlIXDyQEZlZlU0FWZVM.jpg',
							'http://www.emeiji.com/photo/UREgE0pfe0xQCDNNWAk9AF0LegBWCHsBWAp7FkkJOwJdADBMUFF7VQ1RY1EJVWRRFiplIHdVZRJbIRkIclQWEEEqAzNWBAABZkR1VQ1RY1EJVWRRFFV5D0wHNQ1MSCdNUxUzPApUZBsKVGQ.jpg',
							'http://img0.imgtn.bdimg.com/it/u=3347969450,2605879496&fm=26&gp=0.jpg',
							'http://img2.imgtn.bdimg.com/it/u=3012120879,3377454015&fm=11&gp=0.jpg',
							'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg'
						],
						cover: 'http://img2.imgtn.bdimg.com/it/u=3012120879,3377454015&fm=11&gp=0.jpg',
						video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
						name: '【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝',
						desc: '2020新款中大儿童两件套帅洋气休闲韩版，各位可以参考一下，然后再做购买。价格合理，质量保证，欲购从速2020新款中大儿童两件套帅洋气休闲韩版，各位可以参考一下，然后再做购买。价格合理，质量保证，欲购从速…',
						price: 0,
						toppic_id: 1,
						topic: '今天又种草了新的穿搭',
						like_num: 2000,
						share_num: 2000,
						is_like: false,
					}, {
						id: 3,
						images: [
							'http://www.emeiji.com/photo/UREgE0pfe0xQCDNNWAk9AF0LegBWCHsBWAp7FkkJOwJdADBMUFF7UQtVY1UJXGxbD1RmUhYqZSB3VWUXWFUSMkhUIlZqEDIifQ8gW2ZEdVELVWNVCVxsWw9UZlIXDyQEZlZlU0FWZVM.jpg',
							'http://www.emeiji.com/photo/UREgE0pfe0xQCDNNWAk9AF0LegBWCHsBWAp7FkkJOwJdADBMUFF7VQ1RY1EJVWRRFiplIHdVZRJbIRkIclQWEEEqAzNWBAABZkR1VQ1RY1EJVWRRFFV5D0wHNQ1MSCdNUxUzPApUZBsKVGQ.jpg',
							'http://img0.imgtn.bdimg.com/it/u=3347969450,2605879496&fm=26&gp=0.jpg',
							'http://img2.imgtn.bdimg.com/it/u=3012120879,3377454015&fm=11&gp=0.jpg',
							'http://img1.imgtn.bdimg.com/it/u=1961855076,527375209&fm=26&gp=0.jpg'
						],
						cover: 'http://img2.imgtn.bdimg.com/it/u=3012120879,3377454015&fm=11&gp=0.jpg',
						video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
						name: '【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝【拉比树】0-3岁儿童夏季新款衬衫蓝色宝宝',
						desc: '2020新款中大儿童两件套帅洋气休闲韩版，各位可以参考一下，然后再做购买。价格合理，质量保证，欲购从速2020新款中大儿童两件套帅洋气休闲韩版，各位可以参考一下，然后再做购买。价格合理，质量保证，欲购从速…',
						price: 0,
						toppic_id: 1,
						topic: '今天又种草了新的穿搭',
						like_num: 2000,
						share_num: 2000,
						is_like: false,
					}]
				}, ]
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
.line{
	width:750rpx;
	height:20rpx;
	background:rgba(243,243,243,1);
}
</style>
