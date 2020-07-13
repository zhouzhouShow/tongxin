<template>
	<view class="seeding_item">
		<view @click.stop="handleToSeedingDetail(item.id)" class="item" v-for="(item,index) in list" :key="item.id">
			<view class="item_master">
				<view @click.stop="handleToUserPage(item.user_id)" class="info">
					<view class="info_avatar">
						<image :src="item.userinfo.avatar" mode="scaleToFill"></image>
					</view>
					<view class="info_about">
						<text>{{item.userinfo.nickname}}</text>
						<text>{{item.userinfo.bio}}</text>
					</view>
				</view>
				<view v-if="userId==item.userinfo.id" @click.stop="mineControl(item.id)" class="ismine">
					<image src="@/static/images/seeding/icon_more.png" mode=""></image>
				</view>
				<view v-else-if="!item.isfollow && showFollow" @click.stop="handleConcern(item.id)" class="concern">
					<image src="@/static/images/seeding/icon_concern.png" mode="scaleToFill"></image>
					<text>关注</text>
					<!-- <text>{{item.master_info.is_follow?'已关注':'关注'}}</text> -->
				</view>
			</view>
			<view class="item_show">
				<SeedingImages :imagesType="imagesType" :info="item.up_data" @previewImage="previewImage"></SeedingImages>
			</view>
			<view class="item_about">
				<view @click.stop="handleToDetail(item.goodsinfo[0].goods_id)" v-if="item.goodsinfo.length<=1" class="only">
					<view class="image">
						<image :src="item.goodsinfo[0].goods_images[0]" mode="aspectFit"></image>
					</view>
					<view class="info">
						<view class="title">
							<text>{{item.goodsinfo[0].goods_title}}</text>
						</view>
						<view class="price">
							<text>¥{{item.goodsinfo[0].price_last}}</text>
						</view>
					</view>
				</view>
				<view @click.stop="showPopup(item,index)" v-else class="more">
					<view class="images">
						<view v-for="img in item.goodsinfo" :key="img.id" class="image">
							<image :src="img.goods_images[0]" mode="aspectFit"></image>
						</view>
					</view>
					<view class="num">
						<text>{{item.goodsinfo.length}}个关联商品</text>
						<image src="@/static/images/seeding/icon_arrow-right-grey.png" mode=""></image>
					</view>
				</view>
			</view>
			<view :class="['item_desc',showAllDesc?'':'ellipses']">
				<text>{{item.content}}</text>
			</view>
			<view class="item_theme">
				<view :class="['left',item.topicinfo.length<=0?'hide':'']">
					<view v-if="item.topicinfo.length>0" class="icon">
						<image src="@/static/images/seeding/icon_theme.png" mode=""></image>
					</view>
					<view v-if="item.topicinfo.length>0" class="title">
						<text>{{item.topicinfo[0].name}}</text>
					</view>
				</view>
				<view class="right">
					<view @click.stop="handleLike(item.id)" class="like">
						<image :src="item.isfav?require('@/static/images/seeding/icon_like.png'):require('@/static/images/seeding/icon_unlike.png')"
						 mode="scaleToFill"></image>
						<text>({{item.likenum}})</text>
					</view>
					<view @click.stop="handleShare(item.id)" class="share">
						<image src="@/static/images/seeding/icon_share.png" mode="scaleToFill"></image>
						<text>({{item.sharenum}})</text>
						<button open-type="share" :data-id="item.id"></button>
					</view>
				</view>
			</view>
		</view>
		<uni-popup @change="popupChange" ref="popup" type="bottom">
			<view class="popup_header">
				<text class="title">{{list[targetIndex].goodsinfo.length}}个关联商品</text>
				<image @click.stop="hidePopup" class="close" src="@/static/images/seeding/icon_close.png" mode="scaleToFill"></image>
			</view>
			<view class="popup_list">
				<view  @click.stop="handleToDetail(el.goods_id)" v-for="(el,index) in list[targetIndex].goodsinfo" :key="index" class="popup_list_item">
					<view class="left">
						<image :src="el.goods_images[0]" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="top">
							<text>{{el.goods_title}}</text>
						</view>
						<view class="bottom">
							<text class="type">¥</text>
							<text class="total">{{el.price_last}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup @change="btnPopupChange" ref="btnPopup" type="bottom">
			<view class="btn_popup">
				<view @click.stop="handleDelete" class="delete">
					<text>删除</text>
				</view>
				<view @click.stop="hideBtnPopup" class="calcel">
					<text>取消</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import SeedingImages from './seedingImages.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: "SeedingItem",
		components: {
			SeedingImages,
			uniPopup
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			userId:{
				type:String|Number,
				default:0
			},
			type:{
				type:String,
				default:'seeding'
			},
			imagesType:{
				type:String,
				default:'default'
			},
			isTabBar: {
				type:Boolean,
				default:false
			},
			showAllDesc:{
				type:Boolean,
				default:false
			},
			showFollow:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				targetIndex: 0,
				deleteId:0
			};
		},
		methods: {
			handleToDetail(id){
				this.$emit('handleToDetail',id)
			},
			handleConcern(id) {
				this.$emit('handleConcern', id)
			},
			previewImage(list, num) {
				this.$emit('previewImage', list, num)
			},
			handleLike(id) {
				this.$emit('handleLike', id)
			},
			handleToSeedingDetail(id){
				this.$emit('handleToSeedingDetail', id)
			},
			handleToUserPage(id) {
				this.$emit('handleToUserPage',id)
			},
			handleShare(id) {
				this.$emit('handleShare',id)
			},
			showPopup(item, index) {
				this.targetIndex = index || 0
				this.isTabBar && wx.hideTabBar()
				setTimeout(() => this.$refs.popup.open())
			},
			hidePopup() {
				this.$refs.popup.close()
			},
			popupChange(e) {
				if (!e.show) {
					setTimeout(() => this.isTabBar && wx.showTabBar())
				}
			},
			handleDelete() {
				let id = this.deleteId
				this.$emit('handleDelete',id)
				this.hideBtnPopup()
			},
			mineControl(id) {
				this.deleteId = id
				this.isTabBar && wx.hideTabBar()
				setTimeout(() => this.$refs.btnPopup.open())
			},
			hideBtnPopup() {
				this.deleteId = 0
				this.$refs.btnPopup.close()
			},
			btnPopupChange(e) {
				if (!e.show) {
					setTimeout(() => this.isTabBar && wx.showTabBar())
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.seeding_item {
		view{
			box-sizing: border-box;
		}
		.item {
			// margin-bottom: 20rpx;
			padding: 30rpx 20rpx 40rpx 20rpx;
			background-color: #fff;
			border-bottom: 20rpx solid #F3F3F3;

			&_master {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info {
					flex: 1;
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
						width: 448rpx;
						margin-left: 20rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;

						text:nth-child(1) {
							display: block;
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							height: 30rpx;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							line-height: 30rpx;
						}

						text:nth-child(2) {
							display: block;
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
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
				
				.ismine{
					width: 58rpx;
					height: 60rpx;
					display: flex;
					padding-right: 20rpx;
					align-items: center;
					image{
						width: 38rpx;
						height: 8rpx;
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

			&_show {
				margin-top: 20rpx;
				width: 710rpx;
				height: 702rpx;
			}

			&_about {
				margin-top: 20rpx;
				width: 710rpx;
				height: 100rpx;
				padding: 10rpx;
				background: rgba(248, 248, 248, 1);
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.only {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.image {
						flex-basis: 80rpx;
						width: 80rpx;
						height: 80rpx;
						background: rgba(255, 255, 255, 1);
						border-radius: 4rpx;
						overflow: hidden;

						image {
							max-width: 100%;
							max-height: 100%;
						}
					}

					.info {
						margin-left: 10rpx;
						flex: 1;

						.title {
							width: 600rpx;
							height: 28rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
							line-height: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.price {
							margin-top: 20rpx;
							height: 30rpx;
							font-size: 30rpx;
							font-family: DINPro;
							font-weight: 400;
							color: rgba(242, 39, 50, 1);
							line-height: 30rpx;
						}
					}
				}

				.more {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.images {
						display: flex;
						align-items: center;

						.image {
							width: 80rpx;
							height: 80rpx;
							background: rgba(255, 255, 255, 1);
							border-radius: 4rpx;
							margin-right: 10rpx;

							image {
								max-width: 100%;
								max-height: 100%;
							}
						}
					}

					.num {
						padding-right: 20rpx;
						height: 28rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 28rpx;

						image {
							width: 14rpx;
							height: 23rpx;
							margin-left: 24rpx;
						}
					}
				}
			}

			&_desc {
				// margin-top: 30rpx;
				padding: 30rpx 0 50rpx 0;
				width: 100%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 42rpx;
				&.ellipses{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}

			&_theme {
				// margin-top: 50rpx;
				display: flex;
				justify-content: space-between;

				.left {
					padding: 0 23rpx 0 5rpx;
					height: 60rpx;
					background: rgba(252, 238, 239, 1);
					border-radius: 30rpx;
					display: flex;
					align-items: center;
					
					&.hide{
						opacity: 0;
					}

					.icon {
						width: 50rpx;
						height: 50rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.title {
						margin-left: 10rpx;
						height: 24rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(247, 76, 85, 1);
						line-height: 24rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
					}

					text {
						height: 24rpx;
						font-size: 24rpx;
						font-family: DINPro;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						margin-left: 15rpx;
						line-height: 24rpx;
					}

					.share {
						margin-left: 48rpx;
						display: flex;
						align-items: center;
						position: relative;

						button {
							position: absolute;
							left: 0;
							top: 0;
							right: 0;
							bottom: 0;
							opacity: 0;
						}
					}

					.like {
						display: flex;
						align-items: center;
					}
				}
			}
		}

		.popup_header {
			width: 750rpx;
			height: 100rpx;
			background: rgba(248, 248, 248, 1);
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			.title {
				height: 100rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 100rpx;
				text-align: center;
			}

			.close {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.popup_list {
			padding: 10rpx 0;

			&_item {
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				margin: 20rpx 0;
				height: 219rpx;

				.left {
					flex-basis: 218rpx;
					width: 218rpx;
					height: 219rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					height: 219rpx;
					flex: 1;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.top {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 42rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
					}

					.bottom {
						.type {
							height: 29rpx;
							font-size: 24rpx;
							font-family: DINPro;
							font-weight: 500;
							color: rgba(242, 39, 50, 1);
						}

						.total {
							height: 29rpx;
							font-size: 40rpx;
							font-family: DINPro;
							font-weight: 500;
							color: rgba(242, 39, 50, 1);
						}
					}
				}
			}
		}
		
		.btn_popup{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			&>view{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:400;
				&:nth-child(1){
					color: #F22732;
					border-bottom: 10rpx solid #F3F3F3;
				}
				&:nth-child(2){
					color: #333333;
				}
			}
		}
	}
</style>
