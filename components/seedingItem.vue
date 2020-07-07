<template>
	<view class="seeding_item">
		<view class="item" v-for="(item,index) in list" :key="item.id">
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
				<view v-if="userId==item.master_info.user_id" @click="mineControl(item.id)" class="ismine">
					<image src="@/static/images/seeding/icon_more.png" mode=""></image>
				</view>
				<view v-else-if="!item.master_info.is_follow && showFollow" @click="handleConcern(item.id)" class="concern">
					<image src="@/static/images/seeding/icon_concern.png" mode="scaleToFill"></image>
					<text>关注</text>
					<!-- <text>{{item.master_info.is_follow?'已关注':'关注'}}</text> -->
				</view>
			</view>
			<view class="item_show">
				<SeedingImages :imagesType="imagesType" :info="item" @previewImage="previewImage"></SeedingImages>
			</view>
			<view class="item_about">
				<view @click="handleToDetail(item.product_info.id)" v-if="item.related_products.length<=0" class="only">
					<view class="image">
						<image :src="item.product_info.cover" mode="aspectFit"></image>
					</view>
					<view class="info">
						<view class="title">
							<text>{{item.product_info.name}}</text>
						</view>
						<view class="price">
							<text>¥{{item.product_info.price}}</text>
						</view>
					</view>
				</view>
				<view @click="showPopup(item,index)" v-else class="more">
					<view class="images">
						<view v-for="img in item.related_products" :key="img.id" class="image">
							<image :src="img.cover" mode="aspectFit"></image>
						</view>
					</view>
					<view class="num">
						<text>{{item.related_products.length}}个关联商品</text>
						<image src="@/static/images/seeding/icon_arrow-right-grey.png" mode=""></image>
					</view>
				</view>
			</view>
			<view :class="['item_desc',showAllDesc?'':'ellipses']">
				<text>{{item.product_info.desc}}</text>
			</view>
			<view class="item_theme">
				<view class="left">
					<view class="icon">
						<image src="@/static/images/seeding/icon_theme.png" mode=""></image>
					</view>
					<view class="title">
						<text>{{item.product_info.topic}}</text>
					</view>
				</view>
				<view class="right">
					<view @click="handleLike(item.id)" class="like">
						<image :src="item.product_info.is_like?require('@/static/images/seeding/icon_like.png'):require('@/static/images/seeding/icon_unlike.png')"
						 mode="scaleToFill"></image>
						<text>({{item.product_info.like_num}})</text>
					</view>
					<view class="share">
						<image src="@/static/images/seeding/icon_share.png" mode="scaleToFill"></image>
						<text>({{item.product_info.share_num}})</text>
						<button open-type=“share></button>
					</view>
				</view>
			</view>
		</view>
		<uni-popup @change="popupChange" ref="popup" type="bottom">
			<view class="popup_header">
				<text class="title">{{list[targetIndex].related_products.length}}个关联商品</text>
				<image @click="hidePopup" class="close" src="@/static/images/seeding/icon_close.png" mode="scaleToFill"></image>
			</view>
			<view class="popup_list">
				<view  @click="handleToDetail(el.id)" v-for="(el,index) in list[targetIndex].related_products" :key="index" class="popup_list_item">
					<view class="left">
						<image :src="el.cover" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="top">
							<text>{{el.name}}</text>
						</view>
						<view class="bottom">
							<text class="type">¥</text>
							<text class="total">{{el.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup @change="btnPopupChange" ref="btnPopup" type="bottom">
			<view class="btn_popup">
				<view @click="handleDelete" class="delete">
					<text>删除</text>
				</view>
				<view @click="hideBtnPopup" class="calcel">
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

<style lang="scss">
	.seeding_item {
		.item {
			margin-bottom: 20rpx;
			padding: 30rpx 20rpx 40rpx 20rpx;
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
				margin-top: 30rpx;
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
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;

				.left {
					padding: 0 23rpx 0 5rpx;
					height: 60rpx;
					background: rgba(252, 238, 239, 1);
					border-radius: 30rpx;
					display: flex;
					align-items: center;

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
