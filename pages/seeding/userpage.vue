<template>
	<view class="userpage">
		<view class="userpage_info" style="background: url(../../static/images/seeding/userpage_bg.png) no-repeat;background-size: 100% 100%;">
			<view class="logo">
				<image :src="masterInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="nickname">
				<text>{{masterInfo.nickname}}</text>
			</view>
			<view class="desc">
				{{masterInfo.desc || '主任太懒了，什么也没留下'}}
			</view>
			<view class="number">
				<view class="left">
					<text>种草数 {{masterInfo.seeding}}</text>
				</view>
				<view class="line"></view>
				<view class="right">
					<text>粉丝 {{masterInfo.fans}}</text>
				</view>
			</view>
			<view class="edit" v-if="masterInfo.id==userInfo.id">
				<image src="../../static/images/seeding/icon_edit.png" mode="scaleToFill"></image>
				<text>编辑</text>
			</view>
		</view>
		<view class="userpage_nav">
			<view class="line"></view>
			<view @click="changeNav(idx)" v-for="(nav,idx) in navList" :key="idx" :class="['item',nowIndex==idx?'active':'']">
				<text v-if="idx===0">{{nav.text}}{{seedingLength>0?`（${seedingLength}）`:''}}</text>
				<text v-else>{{nav.text}}{{likeLength>0?`（${likeLength}）`:''}}</text>
				<image v-if="nowIndex==idx" src="../../static/images/seeding/icon_nav-active.png" mode=""></image>
			</view>
		</view>
		<view class="userpage_list">
			<SeedingItem :list="nowIndex==0?seedingList:likeList" :isTabBar="false" :userId="masterInfo.id" @handleToDetail="handleToDetail"
			 @handleDelete="handleDelete" :showFollow="nowIndex==1?true:false" @handleConcern="handleConcern" @previewImage="previewImage" @handleLike="handleLike"></SeedingItem>
			 <uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="masterInfo.id!=userInfo.id" class="userpage_btn">
			<view @click="handleConcernUser" :class="[masterInfo.is_follow?'':'active']">
				<text>{{masterInfo.is_follow?'已关注':'关注'}}</text>
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
				loadingType: 'more',
				userInfo: {
					id: 99,
					nickname: '呢子dayi',
					avatar: require('../../static/images/seeding/icon_avatar.png'),
					seeding: 2,
					fans: 3200,
					desc: ''
				},
				masterInfo:{
					id: 98,
					nickname: '呢子dayi',
					avatar: require('../../static/images/seeding/icon_avatar.png'),
					seeding: 2,
					fans: 3200,
					desc: '',
					is_follow:false
				},
				navList: [{
						id: 1,
						text: '种草'
					},
					{
						id: 2,
						text: '喜欢'
					}
				],
				nowIndex: 0,
				seedingList: seedingJson,
				seedingLength:3,
				likeList: seedingJson,
				likeLength:10
			};
		},
		onReachBottom() {
			if (this.loadingType == 'loading' || this.loadingType == 'noMore') return
			this.loadingType = 'loading'
			setTimeout(() => this.loadingType = 'more', 3000)
		},
		methods: {
			changeNav(idx) {
				if (idx == this.nowIndex) return
				this.nowIndex = idx
			},
			handleConcern(id) {
				let list = this.nowIndex==0?this.seedingList:this.likeList
				let item = list.filter(v => v.id == id)[0] || {}
				item.master_info.is_follow = !item.master_info.is_follow
			},
			handleConcernUser() {
				this.masterInfo.is_follow = !this.masterInfo.is_follow
			},
			handleDelete(id) {
				let list = this.nowIndex==0?this.seedingList:this.likeList
				list.forEach((item, index) => {
					if (item.id == id) {
						list.splice(index, 1)
					}
				})
			},
			handleToDetail(id) {
				wx.navigateTo({
					url: "./productDetail?id=" + id,
				})
			},
			previewImage(item, num) {
				this.imgPreview(item.product_info.images, num)
			},
			handleLike(id) {
				let list = this.nowIndex==0?this.seedingList:this.likeList
				let item = list.filter(v => v.id == id)[0] || {}
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
		}
	}
</script>

<style lang="scss">
	page {
		view {
			box-sizing: border-box;
		}
	}
	.userpage {
		padding-bottom: 140rpx;
		&_info {
			width: 750rpx;
			height: 422rpx;
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
				margin-top: 17rpx;
				height: 24rpx;
				font-size: 24rpx;
				line-height: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, .8);
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
	
		&_btn{
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 140rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			&>view{
				width:690rpx;
				height:80rpx;
				border-radius:40rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:400;
				line-height: 80rpx;
				text-align: center;
				background-color: #EEEEEE;
				color: #666666;
				&.active{
					background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
					color:rgba(255,255,255,1);
				}
			}
		}
	}
</style>
