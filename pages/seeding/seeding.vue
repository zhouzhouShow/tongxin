<template>
	<view class="seeding">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :down="downOption" :up="{use:false,toTop:{src:''}}">
			<view @click="handleToUserPage(0)" class="seeding_user" style="background: url(https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200715/91ed7eb28826a27f108dfc6dd787646f.png	);">
				<view class="avatar">
					<image :src="userInfo.avatar" mode="scaleToFill"></image>
				</view>
				<view class="info">
					<view class="info_nickname">
						<text>{{userInfo.nickname}}</text>
					</view>
					<view class="info_num">
						<text>种草数 {{userInfo.article_num}}</text>
						<text>粉丝 {{userInfo.fans_num}}</text>
					</view>
				</view>
				<view class="icon">
					<image src="../../static/images/seeding/icon_arrow-right-white.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="seeding_banner">
				<image src="https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200715/e18f00e7d2de3ecf7f7ccef87b5d66ed.png" mode="widthFix"></image>
			</view>
			<view class="seeding_nav">
				<view class="box">
					<view @click="changeNav(index)" v-for="(item,index) in navList" :key="index" :class="['item',nowIndex==index?'active':'']">
						<text>{{item.text}}</text>
						<image src="../../static/images/seeding/icon_nav-active.png" mode="scaleToFill"></image>
					</view>
				</view>
				<!-- :class="['search',isSearch?'show':'hide']" -->
				<view  :class="['search',isSearch?'show':'hide']">
					<image @click="showSearch"  src="../../static/images/seeding/icon_search.png" mode="scaleToFill"></image>
					<input v-if="isSearch" :focus="isSearch" @blur.stop="searchBlur" @confirm="keywordSearch" type="text" v-model="searchText" placeholder="输入要搜索的内容" />
					<view @click="keywordSearch" class="text">
						<text>搜索</text>
					</view>
				</view>
			</view>
			<view class="seeding_list">
				<SeedingItem :list="list" :isTabBar="true" :userId="userInfo.id" @handleToDetail="handleToDetail" @handleDelete="handleDelete"
				 @handleToSeedingDetail="handleToSeedingDetail" @handleConcern="handleConcern" @previewImage="previewImage"
				 @handleToUserPage="handleToUserPage" @handleLike="handleLike"></SeedingItem>
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
		</mescroll-body>
	
		<comfooter :tabIdx="1"></comfooter>
		<view @click="handleToCreate" class="seeding_create">
			<image src="../../static/images/seeding/icon_create.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "mescroll-uni/mescroll-mixins.js";
	import comfooter from '@/components/com-footer.vue'
	import SeedingItem from '@/components/seedingItem.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		name: "seeding",
		mixins: [MescrollMixin],
		components: {
			SeedingItem,
			uniLoadMore,
			comfooter,
		},

		data() {
			return {
				loadingType: '1',
				searchText: '',
				isSearch: false,
				userInfo: {},
				navList: [{
					id: 1,
					text: '精选'
				}],
				nowIndex: 0,
				targetIndex: 0,
				list: [],
				page: 1,
				pageSize: 10,
				mescroll:null
			};
		},
	
		onReachBottom() {
			if (this.loadingType == 2 || this.loadingType == 3) return
			this.page++
			this.getFeaturedList()
		},
		mounted() {
			// console.log(MescrollMixin)
			// this.getPersonalCenterData()
			// this.getFeaturedList()
		},
		onReady() {
			uni.$on('changeFollow', info => {
				let id = info.userId
				let items = this.list.filter(v => v.user_id == id)
				items.forEach(el => {
					el.isfollow = info.isfollow
				})
			})

			uni.$on('changeLike', info => {
				let id = info.id
				let isfav = info.isfav
				let likenum = info.likenum
				let item = this.list.filter(v => v.id == id)
				item && item[0] && (item[0].isfav = isfav)
				item && item[0] && (item[0].likenum = likenum)
			})

			uni.$on('changeShare', info => {
				let id = info.id
				let sharenum = info.sharenum
				let item = this.list.filter(v => v.id == id)
				item && item[0] && (item[0].sharenum = sharenum)
			})

			uni.$on('deleteSeeding', id => {
				this.list.forEach((item, index) => {
					if (item.id == id) {
						this.list.splice(index, 1)
					}
				})
				this.userInfo.article_num = this.userInfo.article_num - 1
			})

			uni.$on('hasCreate', () => {
				this.userInfo.article_num = this.userInfo.article_num + 1
			})
		},
		onUnload() {
			uni.$off('changeFollow')
			uni.$off('changeLike')
			uni.$off('changeShare')
			uni.$off('deleteSeeding')
			uni.$off('hasCreate')
		},
		onShareAppMessage(res) {
			this.$help.isBtnShare = true
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
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			async downCallback() {
				this.page = 1
				this.list = []
				await this.getPersonalCenterData()
				await this.getFeaturedList()
				this.mescroll.endDownScroll()
				// this.mescroll.resetUpScroll();
			},
			getPersonalCenterData() {
				this.$fly.post(this.$api.personalCenterData).then(res => {
					this.userInfo = res.data || {}
				})
			},
			getFeaturedList() {
				this.loadingType = 2
				this.$fly.post(this.$api.getFeaturedList, {
					keyword: this.searchText,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					this.list = this.list.concat(res.data.list)
					if (res.data.list.length < this.pageSize) {
						this.loadingType = 3
					} else {
						this.loadingType = 1
					}
				})
			},
			changeNav(index) {
				if (index == this.nowIndex) return
				this.nowIndex = index
			},
			handleConcern(id) {
				let item = this.list.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingHandleFollow, {
					relateId: item.user_id,
					actionType: 0
				}).then(res => {
					item.isfollow = true
				})
			},
			handleShare(id) {
				let item = this.list.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingShare, {
					relateId: id
				}).then(res => {
					item.sharenum = item.sharenum + 1
				})
			},
			handleDelete(id) {
				uni.showLoading({
					title: "删除中..."
				})
				this.$fly.post(this.$api.deleteSeeding, {
					ids: id
				}).then(res => {
					this.list.forEach((item, index) => {
						if (item.id == id) {
							this.list.splice(index, 1)
							this.userInfo.article_num = this.userInfo.article_num - 1
						}
					})
					uni.showToast({
						title: '删除成功',
						duration: 1500
					})
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			handleToDetail(id) {
				wx.navigateTo({
					url: "../good/goodDetail?id=" + id,
				})
			},
			handleToSeedingDetail(id) {
				wx.navigateTo({
					url: "./productDetail?id=" + id,
				})
			},
			showSearch() {
				console.log('显示按钮')
				this.isSearch = true
			},
			searchBlur() {
				console.log(this.searchText)
				if (!this.searchText) {
					console.log('隐藏按钮')
					this.isSearch = false
				}else{
					this.isSearch = true
				}
			},
			keywordSearch() {
				this.page = 1
				this.list = []
				this.loadingType = 1
				this.getFeaturedList()
			},
			previewImage(item, num) {
				this.imgPreview(item, num)
			},
			handleLike(id) {
				let item = this.list.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingHandleLike, {
					relateId: id,
					actionType: item.isfav ? 1 : 0
				}).then(res => {
					item.isfav = !item.isfav
					item.likenum = item.isfav ? item.likenum + 1 : item.likenum - 1
				})
			},
			handleToUserPage(id) {
				wx.navigateTo({
					url: "./userpage?writer_id=" + id,
				})
			},
			// 图片预览
			imgPreview(list, idx) {
				// list：图片 url 数组
				if (list && list.length > 0) {
					let newList = []
					list.forEach(item => {
						newList.push(item.url)
					})
					uni.previewImage({
						current: newList[idx], //  传 Number H5端出现不兼容
						urls: newList
					});
				}
			},
			handleToCreate() {
				wx.navigateTo({
					url: "./release",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.seeding {
		width: 100%;
		min-height: 100%;
		padding-bottom: 100rpx;
		background-color: #F3F3F3;

		&_user {
			width: 750rpx;
			height: 200rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;

			.avatar {
				flex-basis: 100rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					border: 4rpx solid rgba(255, 255, 255, 0.4);
				}
			}

			.info {
				flex: 1;
				margin-left: 20rpx;

				&>view {
					margin: 17rpx 0;
				}

				&_nickname {
					height: 30rpx;
					width: 520rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					line-height: 30rpx;
				}

				&_num {
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 28rpx;

					text {
						margin-right: 108rpx;
					}
				}
			}

			.icon {
				flex-basis: 14rpx;

				image {
					width: 14rpx;
					height: 24rpx;
				}
			}
		}

		&_banner {
			padding: 30rpx 20rpx;
			width: 750rpx;
			height: 210rpx;
			background-color: #fff;
		}

		&_nav {
			padding: 30rpx 30rpx 10rpx 30rpx;
			background: #fff;
			display: flex;
			justify-content: space-between;

			.box {
				display: flex;
				align-items: flex-start;
			}

			.search {
				display: flex;
				height: 60rpx;
				align-items: center;
				background-color: #F3F3F3;
				border-radius: 30rpx;
				overflow: hidden;
				transition: all .5s;
				position: relative;

				&.hide {
					width: 60rpx;

					input {
						display: none;
					}
				}

				&.show {
					flex: 1;
				}

				image {
					flex-basis: 30rpx;
					width: 30rpx;
					height: 30rpx;
					padding: 0 15rpx;
				}

				input {
					flex: 1;
					font-size: 30rpx;
					height: 60rpx;
					line-height: 60rpx;
					padding-right: 120rpx;
				}

				.text {
					position: absolute;
					width: 90rpx;
					overflow: hidden;
					font-size: 30rpx;
					left: 485rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			.item {
				margin-right: 52rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				text {
					height: 36rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 36rpx;
				}

				image {
					margin-top: 6rpx;
					width: 33rpx;
					height: 15rpx;
					visibility: hidden;
				}

				&.active {
					text {
						font-weight: bold;
					}

					image {
						visibility: visible;
					}
				}
			}
		}

		&_list {}

		&_create {
			position: fixed;
			bottom: 170rpx;
			right: 30rpx;
			width: 90rpx;
			height: 90rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
