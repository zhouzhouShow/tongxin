<template>
	<view class="seeding">
		<view class="seeding_user" style="background: url(../../static/images/seeding/user_bg.png);">
			<view class="avatar">
				<image :src="userInfo.avatar" mode="scaleToFill"></image>
			</view>
			<view class="info">
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
			<view @click="changeNav(index)" v-for="(item,index) in navList" :key="index" :class="['item',nowIndex==index?'active':'']">
				<text>{{item.text}}</text>
				<image src="../../static/images/seeding/icon_nav-active.png" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="seeding_list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="item_master">
					<view class="info">
						<view class="info_avatar">
							<image :src="item.master_info.avatar" mode="scaleToFill"></image>
						</view>
						<view class="info_about">
							<text>{{item.master_info.nickname}}</text>
							<text>{{item.master_info.title}}</text>
						</view>
					</view>
					<view @click="handleConcern(item)" class="concern">
						<image src="../../static/images/seeding/icon_concern.png" mode="scaleToFill"></image>
						<text>{{item.master_info.is_follow?'已关注':'关注'}}</text>
					</view>
				</view>
				<view class="item_show">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickname: '呢子dayi',
					avatar: require('../../static/images/seeding/icon_avatar.png'),
					seeding: 2,
					fans: 3200
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
				list: [{
					id: 1,
					master_info: {
						avatar: require('../../static/images/seeding/icon_avatar.png'),
						nickname: '呢子dayi',
						title: '种草达人',
						is_follow: false
					},
					product_info: {
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
					},
					related_products: [{
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
				}]
			};
		},
		methods: {
			changeNav(index) {
				if (index == this.nowIndex) return
				this.nowIndex = index
			},
			handleConcern(item){
				item.master_info.is_follow = !item.master_info.is_follow
			}
		}
	}
</script>

<style lang="scss">
	.seeding {
		width: 100%;
		height: 100%;
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
			padding: 30rpx;
			background: #fff;
			display: flex;
			align-items: center;

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

		&_list {
			.item {
				padding: 0 20rpx;
				background-color: #fff;

				&_master {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.info {
						display: flex;
						align-items: center;

						&_avatar {
							width: 100rpx;
							height: 100rpx;

							image {
								width: 100rpx;
								height: 100rpx;
								border-radius: 50%;
								border: 1px solid #EEEEEE;
							}
						}

						&_about {
							margin-left: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;

							text:nth-child(1) {
								height: 30rpx;
								font-size: 30rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: rgba(51, 51, 51, 1);
								line-height: 30rpx;
							}

							text:nth-child(2) {
								height: 28rpx;
								line-height: 28rpx;
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								margin-top: 19rpx;
							}
						}
					}

					.concern {
						padding: 0 24rpx;
						height: 50rpx;
						background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
						border-radius: 25rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 32rpx;
							height: 32rpx;
						}

						text {
							margin-left: 6rpx;
							height: 28rpx;
							font-size: 28rpx;
							line-height: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
			}
		}
	}
</style>
