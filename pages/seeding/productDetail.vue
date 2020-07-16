<template>
	<view class="product-detail">
		<view class="line"></view>
		<SeedingItem :list="productDetail" :showAllDesc="true" :userId="userInfo.id" @handleDelete="handleDelete" imagesType='swiper'
		 @handleConcern="handleConcern" @previewImage="previewImage" @handleLike="handleLike" @handleShare="handleShare" @handleToDetail="handleToDetail" @handleToUserPage="handleToUserPage">
		</SeedingItem>
	</view>
</template>

<script>
	// TODO: seeding、productDetail、userPage间的数据同步
	import {
		seedingJson
	} from '@/static/js/seedingJson.js'
	import SeedingItem from '@/components/seedingItem.vue'
	export default {
		name: "productDetail",
		components: {
			SeedingItem,
		},
		data() {
			return {
				userInfo: {},
				productDetail: [],
				fansNum:0
			};
		},
		onLoad(options) {
			let id = options.id
			let fansNum = options.fansNum
			this.fansNum = fansNum
			this.getSeedingDetail(id)
		},
		onReady() {
			uni.$on('changeFollow', info => {
				let id = info.userId
				let list = this.productDetail
				let items = list.filter(v => v.user_id == id) || []
				items.forEach(el=>{
					el.isfollow = info.isfollow
				})
			})
		
			uni.$on('changeLike', info => {
				let id = info.id
				let isfav = info.isfav
				let likenum = info.likenum
				let list = this.productDetail
				let item = list.filter(v => v.id == id) || []
				item && item[0] && (item[0].isfav = isfav)
				item && item[0] && (item[0].likenum = likenum)
			})
		
			uni.$on('changeShare', info => {
				let id = info.id
				let sharenum = info.sharenum
				let list = this.productDetail
				let item = list.filter(v => v.id == id) || []
				item && item[0] && (item[0].sharenum = sharenum)
			})
		},
		// onUnload() {
		// 	uni.$off('changeFollow')
		// 	uni.$off('changeLike')
		// 	uni.$off('changeShare')
		// },
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 通过按钮触发
				var data = res.target.dataset
				return {
					// title: `${this.userInfo.nickname}给你分享种草精选`,
					path: '/pages/index/index?h=7&id=' + data.id,
					success(res) {
						// 转发成功
						this.handleShare(data.id)
						console.log('转发成功')
					},
					fail(res) {
						// 转发失败
						console.log('转发失败')
					}
				}
			}
			//通过右上角菜单触发
			return {
				// title: '',
				path: '/pages/seeding/productDetail?id=' + data.id,
				// imageUrl: '/images/aikepler-logo.jpeg'
			};
		},
		methods: {
			getSeedingDetail(id) {
				uni.showLoading({
					title: "请稍后..."
				})
				this.$fly.post(this.$api.getSeedingDetail, {
					id: id
				}).then(res => {
					uni.hideLoading()
					this.productDetail = [res.data]
					this.userinfo = this.productDetail.userinfo
				}).catch(err => {
					uni.hideLoading()
				})
			},
			handleToDetail(id) {
				wx.navigateTo({
					url: "../good/goodDetail?id=" + id,
				})
			},
			handleShare(id) {
				let item = this.productDetail.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingShare, {
					relateId: id
				}).then(res => {
					item.sharenum = item.sharenum + 1
					uni.$emit('changeShare', {
						id: id,
						sharenum: item.sharenum
					})
				})
			},
			handleConcern(id) {
				let item = this.productDetail.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingHandleFollow, {
					relateId: item.user_id,
					actionType: 0
				}).then(res => {
					item.isfollow = true
					uni.$emit('changeFollow', {
						userId: item.user_id,
						isfollow: item.isfollow,
						needUpdateFansNum:true,
						fansNum:this.fansNum + 1
					})
				})
			},
			handleDelete(id) {
				uni.showLoading({
					title: "删除中..."
				})
				this.$fly.post(this.$api.deleteSeeding, {
					ids: id
				}).then(res => {
					this.productDetail.forEach((item, index) => {
						if (item.id == id) {
							this.productDetail.splice(index, 1)
						}
					})
					uni.showToast({
						title: '删除成功',
						duration: 1500
					})
					uni.$emit('deleteSeeding',id)
					uni.hideLoading()
					wx.navigateBack()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			handleToUserPage(id) {
				wx.navigateTo({
					url: "./userpage?writer_id=" + id,
				})
			},
			previewImage(item, num) {
				this.imgPreview(item, num)
			},
			handleLike(id) {
				let item = this.productDetail.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingHandleLike, {
					relateId: id,
					actionType: item.isfav ? 1 : 0
				}).then(res => {
					item.isfav = !item.isfav
					item.likenum = item.isfav ? item.likenum + 1 : item.likenum - 1
					uni.$emit('changeLike', {
						id: id,
						isfav: item.isfav,
						likenum: item.likenum
					})
				})
			},
			// 图片预览
			imgPreview(list, idx) {
				// list：图片 url 数组
				if (list && list.length > 0) {
					let newList = []
					list.forEach(item=>{
						newList.push(item.url)
					})
					uni.previewImage({
						current: newList[idx], //  传 Number H5端出现不兼容
						urls: newList
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.line {
		width: 750rpx;
		height: 20rpx;
		background: rgba(243, 243, 243, 1);
	}
</style>
