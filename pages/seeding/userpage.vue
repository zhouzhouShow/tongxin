<template>
	<view class="userpage">
		<view class="userpage_info" style="background: url(https://txyxx.oss-cn-shenzhen.aliyuncs.com/uploads/20200715/f7064ac0b12abd39e5d3b86226eeb8d7.png) no-repeat;background-size: 100% 100%;">
			<view class="logo">
				<image :src="masterInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="nickname">
				<text>{{masterInfo.nickname}}</text>
			</view>
			<view class="desc">
				<!-- {{masterInfo.bio || '主人太懒了，什么也没留下'}} -->
				<textarea auto-height :focus="isEdit" :class="[isEdit?'active':'']" :disabled="!isEdit" placeholder-style="color:rgba(255,255,255,.8)"
				 type="text" v-model="masterInfo.bio" placeholder="主人太懒了,什么也没留下" />
				</view>
			<view class="number">
				<view class="left">
					<text>种草数 {{masterInfo.article_num}}</text>
				</view>
				<view class="line"></view>
				<view class="right">
					<text>粉丝 {{masterInfo.fans_num}}</text>
				</view>
			</view>
			<view @click="changeEdit" class="edit" v-if="masterInfo && !userId">
				<image src="../../static/images/seeding/icon_edit.png" mode="scaleToFill"></image>
				<text>{{isEdit?'完成':'编辑'}}</text>
			</view>
		</view>
		<view class="userpage_nav">
			<view class="line"></view>
			<view @click="changeNav(idx)" v-for="(nav,idx) in navList" :key="idx" :class="['item',nowIndex==idx?'active':'']">
				<text v-if="idx===0">{{nav.text}}{{masterInfo.article_num}}</text>
				<text v-else>{{nav.text}}{{masterInfo.fav_num}}</text>
				<image v-if="nowIndex==idx" src="../../static/images/seeding/icon_nav-active.png" mode=""></image>
			</view>
		</view>
		<view class="userpage_list">
			<SeedingItem :list="nowIndex==0?seedingList:likeList" :isTabBar="false" :userId="userId==0?masterInfo.id:undefined" :canDelete="nowIndex==1?false:true"
			 @handleToDetail="handleToDetail" @handleToSeedingDetail="handleToSeedingDetail" @handleDelete="handleDelete"
			 @handleConcern="handleConcern" @previewImage="previewImage" @handleLike="handleLike"></SeedingItem>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="masterInfo && userId" class="userpage_btn">
			<view @click="handleConcernUser" :class="[masterInfo.isfollow?'':'active']">
				<text>{{masterInfo.isfollow?'已关注':'关注'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		seedingJson
	} from '@/static/js/seedingJson.js'
	import SeedingItem from '@/components/seedingItem.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		name: "userpage",
		components: {
			SeedingItem,
			uniLoadMore
		},
		data() {
			return {
				loadingType: '1',
				userId: 0,
				isEdit:false,
				masterInfo: {},
				navList: [{
						id: 1,
						text: '种草'
					},
					{
						id: 2,
						text: '喜欢'
					}
				],
				page: 0,
				pageSize: 10,
				nowIndex: 0,
				seedingList: [],
				likeList: [],
			};
		},
		onReachBottom() {
			if (this.loadingType == 2 || this.loadingType == 3) return
			this.page++
			if (this.nowIndex == 0) {
				this.getSeedingCenterSeeding()
			} else {
				this.getSeedingCenterLike()
			}
		},
		async onLoad(options) {
			this.eventChannel = this.getOpenerEventChannel()
			if (options.writer_id) {
				this.userId = options.writer_id
			} else {
				this.userId = 0
			}
			let id = await this.getPersonalCenterData()
			this.getSeedingCenterSeeding()
		},
		onReady() {
			uni.$on('changeFollow', info => {
				console.log(1)
				let id = info.userId
				let list = this.nowIndex == 0 ? this.seedingList : this.likeList
				let fansNum = info.fansNum
				let items = list.filter(v => v.user_id == id) || []
				items.forEach(el=>{
					el.isfollow = info.isfollow
				})
				if(this.userId==id){
					this.masterInfo.isfollow = info.isfollow
					this.masterInfo.fans_num = fansNum
				}
			})
		
			uni.$on('changeLike', info => {
				let id = info.id
				let isfav = info.isfav
				let likenum = info.likenum
				let list = this.nowIndex == 0 ? this.seedingList : this.likeList
				let item = list.filter(v => v.id == id) || []
				item && item[0] && (item[0].isfav = isfav)
				item && item[0] && (item[0].likenum = likenum)
			})
		
			uni.$on('changeShare', info => {
				let id = info.id
				let sharenum = info.sharenum
				let list = this.nowIndex == 0 ? this.seedingList : this.likeList
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
					path: '/pages/seeding/productDetail?id=' + data.id,
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
				// title: '开普勒小程序',
				path: "/pages/seeding/userpage?writer_id=" + this.userId,
				// imageUrl: '/images/aikepler-logo.jpeg'
			};
		},
		methods: {
			getPersonalCenterData() {
				return new Promise((res, rej) => {
					let data = this.userId > 0 ? {
						writer_id: this.userId
					} : {}
					uni.showLoading()
					this.$fly.post(this.$api.personalCenterData, data).then(rs => {
						this.masterInfo = rs.data || {}
						uni.hideLoading()
						res(rs.data)
					}).catch(err => {
						uni.hideLoading()
						rej(err)
					})
				})
			},
			getSeedingCenterSeeding() {
				this.loadingType = 2
				this.$fly.post(this.$api.getSeedingCenterSeeding, {
					page: this.page,
					pageSize: this.pageSize,
					writer_id: this.masterInfo.id
				}).then(res => {
					this.seedingList = this.seedingList.concat(res.data.list)
					if (res.data.list.length < this.pageSize) {
						this.loadingType = 3
					} else {
						this.loadingType = 1
					}
				})
			},
			getSeedingCenterLike() {
				this.loadingType = 2
				this.$fly.post(this.$api.getSeedingCenterLike, {
					page: this.page,
					pageSize: this.pageSize,
					writer_id: this.masterInfo.id
				}).then(res => {
					this.likeList = this.likeList.concat(res.data.list)
					if (res.data.list.length < this.pageSize) {
						this.loadingType = 3
					} else {
						this.loadingType = 1
					}
				})
			},
			changeNav(idx) {
				if (idx == this.nowIndex) return
				this.nowIndex = idx
				this.page = 0
				this.loadingType = 1
				if (this.nowIndex == 0) {
					this.seedingList = []
					this.getSeedingCenterSeeding()
				} else {
					this.likeList = []
					this.getSeedingCenterLike()
				}
			},
			handleShare(id) {
				let list = this.nowIndex == 0 ? this.seedingList : this.likeList
				let item = list.filter(v => v.id == id)[0] || {}
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
				let list = this.nowIndex == 0 ? this.seedingList : this.likeList
				let item = list.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingHandleFollow, {
					relateId: item.user_id,
					actionType: 0
				}).then(res => {
					item.isfollow = true
					if (item.user_id == this.userId) {
						this.masterInfo.isfollow = !this.masterInfo.isfollow
						this.masterInfo.fans_num = this.masterInfo.isfollow?this.masterInfo.fans_num+1:this.masterInfo.fans_num-1
					}
					uni.$emit('changeFollow', {
						userId: item.user_id,
						isfollow: item.isfollow,
						fansNum:this.masterInfo.fans_num
					})
				})
			},
			handleConcernUser() {
				this.masterInfo.is_follow = !this.masterInfo.is_follow
				this.$fly.post(this.$api.seedingHandleFollow, {
					relateId: this.userId,
					actionType: this.masterInfo.isfollow ? 1 : 0
				}).then(res => {
					this.masterInfo.isfollow = !this.masterInfo.isfollow
					this.masterInfo.fans_num = this.masterInfo.isfollow?this.masterInfo.fans_num+1:this.masterInfo.fans_num-1
					let list = this.nowIndex == 0 ? this.seedingList : this.likeList
					list.forEach(item => {
						if (item.user_id == this.masterInfo.id) {
							item.isfollow = this.masterInfo.isfollow
						}
					})
					uni.$emit('changeFollow', {
						userId: this.userId,
						isfollow: this.masterInfo.isfollow,
						fansNum:this.masterInfo.fans_num
					})
				})
			},
			handleDelete(id) {
				uni.showLoading({
					title:"删除中..."
				})
				this.$fly.post(this.$api.deleteSeeding,{
					ids:id
				}).then(res=>{
					let list = this.nowIndex == 0 ? this.seedingList : this.likeList
					list.forEach((item, index) => {
						if (item.id == id) {
							list.splice(index, 1)
							this.masterInfo.article_num = this.masterInfo.article_num - 1
						}
					})
					uni.showToast({
						title:'删除成功',
						duration:1500
					})
					uni.hideLoading()
					uni.$emit('deleteSeeding',id)
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			changeEdit(){
				this.isEdit = !this.isEdit
				if(!this.isEdit){
					uni.showLoading({
						title:'更新中...'
					})
					this.$fly.post(this.$api.updateCenterPageDesc,{
						word:this.masterInfo.bio
					}).then(res=>{
						uni.hideLoading()
						uni.showToast({
							title:'更新成功',
							duration:1500
						})
					}).catch(err=>{
						this.isEdit = true
						uni.showToast({
							title:'更新失败，请重试',
							duration:1500
						})
					})
				}
			},
			handleToDetail(id) {
				wx.navigateTo({
					url: "../good/goodDetail?id=" + id,
				})
			},
			handleToSeedingDetail(id) {
				wx.navigateTo({
					url: "./productDetail?id=" + id + '&fansNum=' + this.masterInfo.fans_num,
				})
			},
			previewImage(item, num) {
				this.imgPreview(item, num)
			},
			handleLike(id) {
				let list = this.nowIndex == 0 ? this.seedingList : this.likeList
				let item = list.filter(v => v.id == id)[0] || {}
				this.$fly.post(this.$api.seedingHandleLike, {
					relateId: id,
					actionType: item.isfav ? 1 : 0
				}).then(res => {
					item.isfav = !item.isfav
					item.likenum = item.isfav ? item.likenum + 1 : item.likenum - 1
					if (this.userId <= 0) {
						if (this.nowIndex == 0) {
							this.masterInfo.fav_num = item.isfav ? this.masterInfo.fav_num + 1 : this.masterInfo.fav_num - 1
						} else {
							this.masterInfo.fav_num = this.masterInfo.fav_num - 1
							this.likeList.forEach((item, index) => {
								if (item.id == id) {
									this.likeList.splice(index, 1)
								}
							})
						}
					}
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
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.userpage {
		padding-bottom: 140rpx;
		min-height: 100%;
		background-color: #fff;

		&_info {
			width: 750rpx;
			min-height: 422rpx;
			padding: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			.logo {
				width: 130rpx;
				height: 130rpx;
				background: rgba(220, 236, 243, 1);
				border: 4rpx solid rgba(255, 255, 255, 0.4);
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.nickname {
				margin-top: 20rpx;
				height: 30rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 30rpx;
			}

			.desc {
				width: 100%;
				display: flex;
				textarea {
					margin-top: 17rpx;
					width: 100%;
					text-align: center;
					font-size: 24rpx;
					line-height: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, .8);
					&.active{
						// border: 1rpx solid #fff;
					}
				}
			}	

			.number {
				width: 750rpx;
				margin-top: 60rpx;
				display: flex;
				align-items: center;

				.left,
				.right {
					flex: 1;
					height: 28rpx;
					font-size: 28rpx;
					line-height: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					display: flex;
					justify-content: center;
				}

				.line {
					width: 1rpx;
					height: 24rpx;
					background: rgba(255, 255, 255, 1)
				}
			}

			.edit {
				position: absolute;
				width: 100rpx;
				height: 50rpx;
				border: 2rpx solid rgba(255, 255, 255, 1);
				border-radius: 25rpx;
				top: 65rpx;
				right: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 27rpx;
					height: 28rpx;
				}

				text {
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 24rpx;
					margin-left: 5rpx;
				}
			}
		}

		&_nav {
			width: 750rpx;
			height: 90rpx;
			background: rgba(248, 248, 248, 1);
			display: flex;
			align-items: flex-start;
			position: relative;

			.line {
				position: absolute;
				width: 1rpx;
				height: 24rpx;
				background: rgba(221, 221, 221, 1);
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 1;
			}

			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 30rpx;

				text {
					height: 32rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
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

		&_btn {
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 140rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;

			&>view {
				width: 690rpx;
				height: 80rpx;
				border-radius: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 80rpx;
				text-align: center;
				background-color: #EEEEEE;
				color: #666666;

				&.active {
					background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
</style>
