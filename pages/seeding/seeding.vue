<template>
	<view class="seeding">
		<view class="seeding_user" style="background: url(../../static/images/seeding/user_bg.png);">
			<view class="avatar">
				<image :src="userInfo.avatar" mode="scaleToFill"></image>
			</view>
			<view class="info" @click="handleToUserpage">
				<view class="info_nickname">
					<text>{{userInfo.nickname}}</text>
				</view>
				<view class="info_num">
					<text>种草数 {{userInfo.seeding}}</text>
					<text>粉丝 {{userInfo.fans}}</text>
				</view>
			</view>
			<view class="icon">
				<image src="../../static/images/seeding/icon_arrow-right-white.png" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="seeding_banner">
			<image src="../../static/images/seeding/top_banner.png" mode="widthFix"></image>
		</view>
		<view class="seeding_nav">
			<view class="box">
				<view @click="changeNav(index)" v-for="(item,index) in navList" :key="index" :class="['item',nowIndex==index?'active':'']">
					<text>{{item.text}}</text>
					<image src="../../static/images/seeding/icon_nav-active.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view @click="showSearch" :class="['search',isSearch?'show':'hide']">
				<image src="../../static/images/seeding/icon_search.png" mode="scaleToFill"></image>
				<input :focus="isSearch" @blur="searchBlue" type="text" v-model="searchText" placeholder="输入要搜索的内容" />
			</view>
		</view>
		<view class="seeding_list">
			<SeedingItem :list="list" :isTabBar="true" :userId="userInfo.id" @handleToDetail="handleToDetail" @handleDelete="handleDelete"
			 @handleConcern="handleConcern" @previewImage="previewImage" @handleLike="handleLike"></SeedingItem>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view @click="handleToCreate" class="seeding_create">
			<image src="../../static/images/seeding/icon_create.png" mode=""></image>
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
		name: "seeding",
		components: {
			SeedingItem,
			uniLoadMore
		},
		onShareAppMessage: function() {
			return {
				title: "商品名称",
				path: `/pages/seeding/seeding?id=${123456}`
			}
		},
		data() {
			return {
				loadingType: 'more',
				searchText: '',
				isSearch: false,
				userInfo: {
					id: 99,
					nickname: '呢子dayi',
					avatar: require('../../static/images/seeding/icon_avatar.png'),
					seeding: 2,
					fans: 3200,
					desc: ''
				},
				navList: [{
						id: 1,
						text: '精选'
					},
					{
						id: 2,
						text: '穿搭'
					}
				],
				nowIndex: 0,
				targetIndex: 0,
				list: seedingJson
			};
		},
		onReachBottom() {
			if (this.loadingType == 'loading' || this.loadingType == 'noMore') return
			this.loadingType = 'loading'
			setTimeout(() => this.loadingType = 'more', 3000)
		},
		methods: {
			changeNav(index) {
				if (index == this.nowIndex) return
				this.nowIndex = index
			},
			handleConcern(id) {
				let item = this.list.filter(v => v.id == id)[0] || {}
				item.master_info.is_follow = !item.master_info.is_follow
			},
			handleDelete(id) {
				this.list.forEach((item, index) => {
					if (item.id == id) {
						this.list.splice(index, 1)
					}
				})
			},
			handleToDetail(id) {
				wx.navigateTo({
					url: "./productDetail?id=" + id,
				})
			},
			showSearch() {
				this.isSearch = true
			},
			searchBlue() {
				console.log(this.searchText)
				if (!this.searchText) {
					this.isSearch = false
				}
			},
			previewImage(item, num) {
				this.imgPreview(item.product_info.images, num)
			},
			handleLike(id) {
				let item = this.list.filter(v => v.id == id)[0] || {}
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
			},
			handleToUserpage() {
				wx.navigateTo({
					url: "./userpage",
				})
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
			padding: 30rpx 30rpx 0 30rpx;
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

				&.hide {
					width: 60rpx;
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
			bottom: 70rpx;
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
