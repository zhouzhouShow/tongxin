<template>
	<view class="container">
		<view class="header-box">
			<view class="header">
				<image class="logo-icon" src="@/static/images/icon/logo-icon.png" mode=""></image>
				<view class="search-input-container">
					<view class="search-icon">
						<img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/search.png">
					</view>
					<text>在童心优选中选择</text>
				</view>
			</view>
			<view class="nav flex-align-center">
				<image class="nav-icon" src="/static/images/icon/logo-text.png"></image>
				<view class="nav-box flex-align-center">
					<text class="item">婴童会场</text>
					<text class="item">婴童会场</text>
					<text class="item">婴童会场</text>
					<text class="item">婴童会场</text>
				</view>
			</view>

			<view class="swiper-display-area">
				<swiper v-if="banner.length>0" interval="3000" autoplay=true duration="500" circular=true>
					<view v-for="(item,index) in banner" :key="index" @click="toBrandDetail(item.ad_link)">
						<swiper-item>
							<img style="width:100%;height:388rpx;display:block;" :src="item.image">
						</swiper-item>
					</view>
				</swiper>
				<!-- <img style="width:100%;height:330rpx;display:block;" src=""> -->
			</view>
			<view class="icons-list-container">
				<image class="bg" src="../../static/images/icon/nav-bg.png" mode=""></image>
				<div class="icon-item" @click="nav(item.link)"  v-for="(item,index) in listItem" :key="index">
					<div class="icon-img">
						<img :src="item.img">
					</div>
					<div class="icon-title">{{item.title}}</div>
				</div>
			
			</view>
			<view class=""></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				banner: [{
					image: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200629/b68cb24fca8464dbaf34c8c74d2a0b0d.jpg'
				}],
				listItem: [{
					img: require("@/static/images/icon/nav-item-1.png"),
					title: '晴妈推荐',
					link: ''
				},{
					img: require("@/static/images/icon/nav-item-2.png"),
					title: '爆款好物',
					link: ''
				},{
					img: require("@/static/images/icon/nav-item-3.png"),
					title: '限时抢购',
					link: ''
				},{
					img: require("@/static/images/icon/nav-item-4.png"),
					title: '新品上架',
					link: ''
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		display: flex;
		// margin: 24rpx;
		padding: 24rpx 30rpx 30rpx;
		height: 65rpx;

		.nav-icon {
			width: 130rpx;
			height: 63rpx;
			margin-right: 20rpx;
		}

		.nav-box {
			flex: 1;
			justify-content: space-between;

			.item {
				font-size: 28rpx;
				font-weight: 400;
				color: #fff;
			}
		}
	}

	.swiper-display-area {
		padding: 0 30rpx;
		position: relative;

		z-index: 1;
		height: 388rpx;

		swiper {
			width: 100%;
			height: 100%;

			image {
				border-radius: 10rpx;
			}
		}
	}

	.icons-list-container {
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			right: 0;
			width: 100%;
			height: 131rpx;
			z-index: 1;
		}

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		// align-items: center;
		width: 100%;
		// height: 165rpx;
		box-sizing: border-box;
		padding: 0 15rpx;
		padding-bottom: 15px;

		.icon-item {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 2;
			margin-top: -72rpx;

			.icon-img {
				img {
					width: 100%;
					height: 100%;
				}

				width:88rpx;
				height:88rpx;
				padding: 24rpx 0 6rpx;
			}

			.icon-title {
				font-size: 26rpx;
				font-weight: 500;
				color: #666666;
			}
		}
	}

	.container {}

	.header-box {
		background: #DF464E;
		padding-top: 50rpx;
	}

	.header {
		display: flex;
		align-items: center;

		padding: 0 216rpx 0 30rpx;

		.logo-icon {
			width: 135rpx;
			height: 50rpx;
			margin-right: 30rpx;
		}

		.search-input-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 340rpx;
			height: 62rpx;
			font-size: 26rpx;
			font-weight: 400;
			background-color: #fff;
			color: #666666;
			// border:2rpx solid #FF0000;
			border-radius: 28rpx;

			.search-icon {
				width: 31rpx;
				height: 31rpx;
				flex-grow: 0;
				padding: 0 10rpx 0 20rpx;
			}


		}
	}
</style>
