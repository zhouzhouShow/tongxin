<template>
	<view class="container">
		<view class="header-box" :style="{paddingTop:wechatNavBtnHeight+'px'}">
			<view class="header">
				<image class="logo-icon" src="@/static/images/icon/logo-icon.png" mode=""></image>
				<view class="search-input-container" @click.stop="toSearch">
					<view class="search-icon">
						<img  src="@/static/images/icon/search.png">
					</view>
					<text>在童心优选中选择</text>
				</view>
			</view>
			<view class="nav flex-align-center">
				<image class="nav-icon" src="/static/images/icon/logo-text.png"></image>
				<view class="nav-box flex-align-center">
					<text class="item" v-for="(item,index) in navList" :key="index">{{item.title}}</text>
				</view>
			</view>
			<view class="swiper-display-area"  >
				<swiper @change="swiperChange" v-if="banner.length>0" interval="3000" autoplay=true duration="500" circular=true>
					<view v-for="(item,index) in banner" :key="index" @click="toBrandDetail(item.ad_link)">
						<swiper-item>
							<img style="width:100%;height:388rpx;display:block;" :src="item.image">
						</swiper-item>
					</view>
				</swiper>
				<view class="dot-container" v-if="banner.length>0">
					<swiperDot :current='current' :length="banner.length"></swiperDot>
				</view>
				
				<!-- <img style="width:100%;height:330rpx;display:block;" src=""> -->
			</view>
			<view class="icons-list-container">
				<image class="bg" src="../../static/images/icon/nav-bg.png" mode=""></image>
				<view class="icons-box">
					<div class="icon-item" @click="nav(item.link)"  v-for="(item,index) in listItem" :key="index">
						<div class="icon-img">
							<img :src="item.img">
						</div>
						<div class="icon-title">{{item.title}}</div>
					</div>
				</view>
			
			</view>
		</view>
		<view class="miaosha">
			<view class="title">
				<image src="../../static/images/index/index_icon_1.png" mode=""></image>
				<text class="text">新品秒杀榜</text>
			</view>
			<view class="miaosha-good">
				<scroll-view scroll-x="true" style="white-space:nowrap">
						<view class="item" v-for="item in miaoshaList" :key="item">
							<view class="img-box">
								<image class="good-img" src="../../static/images/index/index_icon_1.png" mode=""></image>
								<view class="time">距结束02:02:02</view>
							</view>
							<view class="price-box">
								<text class="n-price">¥199.9</text>
								<text class="o-price">¥199.9</text>
							</view>
							<view class="getNum">
								<image src="../../static/images/index/zhuan.png" ></image>
								¥3.9
							</view>
						</view>
				</scroll-view>
			
			</view>
			
		
		</view>
		<view class="special">
			<view class="title">
				<image src="../../static/images/index/index_icon_2.png" mode=""></image>
				<text class="text">必逛专题</text>
			</view>
			<view class="content">
				<image src="https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200629/b68cb24fca8464dbaf34c8c74d2a0b0d.jpg" mode="aspectFill"></image>
				<view class="special-good">
					<view class="item" v-for="item in specialList" :key="item">
						<view class="img-box">
							<image class="good-img" src="../../static/images/icon/nav-item-3.png" mode=""></image>
							<view class="getMoney">
								<view class="position">
									<image class="bg" src="../../static/images/index/kz_bg.png" mode=""></image>
									<view class="tip-text">
										<text >可赚</text>
										<text class="num">10.59</text>
									</view>
								</view>
							</view>
						</view>
						<view class="good-name">草莓短袖女童连衣裙adfsadgasd宝宝夏装纯棉</view>
						<view class="price-box">
							<text class="n-price">¥199.9</text>
							<text class="o-price">¥199.9</text>
						</view>
			
					</view>
				</view>
			</view>
		</view>
		<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
		<comfooter :tabIdx="0" :centerAngle="payAngle"></comfooter>
	</view>
</template>

<script>
	import fixedIcon from '@/components/fixedIcon.vue'
	import comfooter from'@/components/com-footer.vue'
	import swiperDot from '@/components/index/swiper-dot.vue'
	export default {
		components:{
			fixedIcon,
			comfooter,
			swiperDot
		},
		data() {
			return {
				title: 'Hello',
				wechatNavBtnHeight:0, //胶囊按钮距离顶部位置
				navList:[{
					title:'童婴会场',
					link:'/pages/index/xinma-recommend',
				},{
					title:'女童会场',
					link:'/pages/index/xinma-recommend',
				},{
					title:'男童会场',
					link:'/pages/index/xinma-recommend',
				},{
					title:'秋冬上新',
					link:'/pages/index/season',
				}],
				banner: [{
					image: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200629/b68cb24fca8464dbaf34c8c74d2a0b0d.jpg'
				},{
					image: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200629/b68cb24fca8464dbaf34c8c74d2a0b0d.jpg'
				}],
				listItem: [{
					img: require("@/static/images/icon/nav-item-1.png"),
					title: '晴妈推荐',
					link: '/pages/index/xinma-recommend'
				},{
					img: require("@/static/images/icon/nav-item-2.png"),
					title: '爆款好物',
					link: '/pages/index/hot'
				},{
					img: require("@/static/images/icon/nav-item-3.png"),
					title: '限时抢购',
					link: '/pages/index/timeLimitedGood'
				},{
					img: require("@/static/images/icon/nav-item-4.png"),
					title: '新品上架',
					link: ''
				}],
				miaoshaList:[1,2,3,4,5,5],
				specialList:[1,2,3],
				showItem:{
					backTop:false
				},
				current:0
			}
		},
		 onLoad() {
			this.banner = this.getBanner()
			this.wechatNavBtnHeight = wx.getMenuButtonBoundingClientRect().top+1
		},
		onPageScroll(e) {
			if (this.sTimer) {
				clearTimeout(this.sTimer)
			}
			this.sTimer = setTimeout(() => {
				if (e.scrollTop > 200) {
					this.showItem.backTop = true
					this.showItem.share = true
				} else {
					this.showItem.backTop = false
				}
			}, 300)
		
		},
		methods: {
			async getBanner(){
				let data = await this.$fly.post(this.$api.indexAdlist)
				return data.data
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			swiperChange(e){
				this.current = e.detail.current
			},
			share(){
				// 分享
				
			},
			toBrandDetail (){
				console.log(123)
				uni.navigateTo({
					url:'pages/search/search'
				})
			},
			nav(url){
				uni.navigateTo({
					url:url
				})
			},
			scrollTop() {
				this.$refs['backTop'].backTop()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.special{
		padding-top: 50rpx;
		margin-bottom:40rpx;
		.title{
			text-align: center;
			font-size:36rpx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			margin-bottom: 40rpx;
			image{
				width: 42rpx;
				height: 40rpx;
				margin-right: 18rpx;
				vertical-align: text-top;
			}
		}
		.content{
			padding:0 30rpx;
			.banner{
				height: 330rpx;
				margin-bottom: 20rpx;
			}
			.special-good{
				display: flex;
				justify-content: space-between;
			}
			.item{
				display: flex;
				flex-direction: column;
				margin-right: 18rpx;
				width: 218rpx;
				.img-box{
					position: relative;
					margin-bottom: 20rpx;
					.good-img{
						width: 218rpx;
						height: 218rpx;
					}
					.getMoney{
						position: absolute;
						bottom: 0;
						left:0;
						height: 68rpx;
						width: 67rpx;
						.position{
							position: relative;
							font-size:20rpx;
							font-weight:400;
							color:rgba(255,255,255,1);
							text-align: center;
							.bg{
								position: absolute;
								left:0;
								top:0;
								width: 68rpx;
								height: 68rpx;
								z-index: 1;
							}
							view.tip-text{
								z-index: 2;
								position: absolute;
								left:0;
								top:0;
								display: flex;
								flex-direction: column;
								justify-content: center;
								// align-items: center;
								width: 68rpx;
								height: 68rpx;
							}
						}
					}
				}
				.good-name{
					margin-bottom: 20rpx;
					width:190rpx;
					font-size:24rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:30rpx;
					text-overflow: ellipsis;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.price-box{
					display: flex;
					justify-content: space-between;
					font-weight:500;
					color:rgba(242,39,50,1);
					line-height:36rpx;
					margin-bottom: 10rpx;
					.n-price{
						font-size:30rpx;
					}
					.o-price{
						font-size:26rpx;
						color: #999999;
						text-decoration: line-through;
					}
				}
				
			}
		}
	}
	.miaosha{
		background:linear-gradient(to bottom, #fbe1e7 0%,#fff 50%,#fff 100%);
		padding-top: 45rpx;
		.title{
			text-align: center;
			font-size:36rpx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			margin-bottom: 40rpx;
			image{
				width: 42rpx;
				height: 40rpx;
				margin-right: 18rpx;
				vertical-align: text-top;
			}
		}
		.miaosha-good{
			padding-left:30rpx;
			.item{
				display: inline-block;
				margin-right: 18rpx;
				width: 200rpx;
				.img-box{
					position: relative;
					margin-bottom: 20rpx;
					.good-img{
						width: 200rpx;
						height: 200rpx;
					}
					.time{
						position: absolute;
						bottom: 0;
						left:0;
						height: 30rpx;
						line-height: 30rpx;
						width: 150rpx;
						text-align: center;
						border-radius:0px 10rpx 0px 0px;
						background:rgba(242,39,50,1);
						font-size:20rpx;
						font-weight:400;
						color:rgba(255,255,255,1);
					}
				}
				.price-box{
					display: flex;
					justify-content: space-between;
					font-weight:500;
					color:rgba(242,39,50,1);
					line-height:36rpx;
					margin-bottom: 10rpx;
					.n-price{
						font-size:30rpx;
					}
					.o-price{
						font-size:26rpx;
						color: #999999;
						text-decoration: line-through;
					}
				}
				.getNum{
					font-size:26rpx;
					font-weight:400;
					color:rgba(255,180,79,1);
					display: flex;
					align-items: center;
					image{
						width: 28rpx;
						height: 28rpx;
						margin-right: 4rpx;
					}
				}
			}
		}
	}
	
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
		.dot-container{
			position: absolute;
			left: 85px;
			bottom: 30rpx;
		}
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
		padding: 0 !important;
		height: 131rpx;
		.bg {
			position: absolute;
			left: 0;
			right: 0;
			width: 100%;
			height: 131rpx;
			z-index: 1;
		}
		.icons-box{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			position: absolute;
			left:0;
			top:-30rpx;
			// align-items: center;
			width: 100%;
			// height: 165rpx;
			box-sizing: border-box;
			padding: 0 15rpx;
			.icon-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				z-index: 2;
				// margin-top: -34rpx;
			
				.icon-img {
					img {
						width: 100%;
						height: 100%;
					}
			
					width:100rpx;
					height:100rpx;
					padding: 0 0 6rpx;
				}
			
				.icon-title {
					font-size: 26rpx;
					font-weight: 500;
					color: #666666;
				}
			}
		}
	
		padding-bottom: 15px;

		
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
				img{
					width: 31rpx;
					height: 31rpx;
					display:block;
				}
				
			}
			text{
				// margin-left:37rpx
			}

		}
	}
</style>
