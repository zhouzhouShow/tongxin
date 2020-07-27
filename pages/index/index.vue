<template>
	<view class="container">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :down="downOption" :up="{use:false,toTop:{src:''}}">
			<view class="header-box" :style="{paddingTop:wechatNavBtnHeight+'px'}">
				<view class="header">
					<image class="logo-icon" src="@/static/images/icon/logo.png" mode=""></image>
					<navigator url="/pages/search/search">
						<view class="search-input-container">
							<view class="search-icon">
								<img src="@/static/images/icon/search.png">
							</view>
							<text>在童创优选中选择</text>
						</view>
					</navigator>
				</view>
				<view class="nav flex-align-center">
					<!-- <image class="nav-icon" src="/static/images/icon/logo-text.png"></image> -->
					<view class="nav-box flex-align-center">
						<text @click="nav(item.link)"  class="item" :class="index==0?'blodS' : ''" v-for="(item,index) in navList" :key="index">{{item.title}}</text>
					</view>
				</view>
				<view class="swiper-display-area">
					<swiper @change="swiperChange" v-if="banner.length>0" interval="3000" autoplay=true duration="500" circular=true>
						<view v-for="(item,index) in banner" :key="index" @click="nav(item.ad_link)">
							<swiper-item>
								<img style="width:100%;height:388rpx;display:block;"  mode="aspectFill"  :src="item.image">
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
						<div class="icon-item" @click="nav(item.link)" v-for="(item,index) in listItem" :key="index">
							<div class="icon-img">
								<img :src="item.img">
							</div>
							<div class="icon-title">{{item.title}}</div>
						</div>
					</view>

				</view>
			</view>
			<view class="miaosha">
				<view class="title flex-center">
					<image src="../../static/images/index/index_icon_1.png" mode=""></image>
					<text class="text">新品推荐</text>
				</view>
				<view class="miaosha-good">
					<scroll-view scroll-x="true" style="white-space:nowrap">
						<view class="miaosha-item" v-if="miaoshaList.length" v-for="(item,index) in miaoshaList" :key="index" @click="toDetail(item.goods_id)">
							<miaoshaItem :itemHeight="218" :item="item"></miaoshaItem>
						</view>
					</scroll-view>

				</view>


			</view>
			<view class="special">
				<view class="title flex-center">
					<image src="../../static/images/index/index_icon_2.png" mode=""></image>
					<text class="text">必逛专题</text>
				</view>
				<view class="content" v-for="(item ,index) in specialList" :key="index">
					<image class="banner" mode="aspectFill" :src="item.brand_banner[0]" @click.stop="toBrand(item.id)"></image>
					<view class="special-good">
						<view v-for="(gItem ,gIndex) in item.goodlist" :key="gIndex" @click="toDetail(gItem.goods_id)">
							<brandGoodItem :item="gItem"></brandGoodItem>
						</view>
					</view>
				</view>
				<load-more :status="loadMore"></load-more>
			</view>
		</mescroll-body>
		<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
		<comfooter :tabIdx="0" :centerAngle="payAngle"></comfooter>
	</view>
</template>

<script>
	import fixedIcon from '@/components/fixedIcon.vue'
	import comfooter from '@/components/com-footer.vue'
	import swiperDot from '@/components/index/swiper-dot.vue'
	import brandGoodItem from '@/components/index/brandGoodItem.vue'
	import miaoshaItem from '@/components/index/miaoshaItem.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	import MescrollMixin from "mescroll-uni/mescroll-mixins.js";
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		mixins: [loadMoreData, MescrollMixin],
		components: {
			fixedIcon,
			comfooter,
			swiperDot,
			miaoshaItem,
			brandGoodItem,
			loadMore
		},
		data() {
			return {
				title: 'Hello',
				wechatNavBtnHeight: 0, //胶囊按钮距离顶部位置
				pageSize: 6,
				navList: [{
					title: '首页',
					link: '',
				},{
					title: '童婴会场',
					link: '/pages/index/session?title=童婴会场&goodsAge=1',
				}, {
					title: '女童会场',
					link: '/pages/index/session?title=女童会场&goodsAge=3',
				}, {
					title: '男童会场',
					link: '/pages/index/session?title=男童会场&goodsAge=2',
				}, {
					title: '秋冬上新',
					link: '/pages/index/season?type=4',
				}],
				banner: [],
				listItem: [{
					img: require("@/static/images/icon/nav-item-1.png"),
					title: '晴妈推荐',
					link: '/pages/index/xinma-recommend'
				}, {
					img: require("@/static/images/icon/nav-item-2.png"),
					title: '爆款好物',
					link: '/pages/index/hotGood'
				}, {
					img: require("@/static/images/icon/nav-item-3.png"),
					title: '限时抢购',
					link: '/pages/index/timeLimitedGood'
				}, {
					img: require("@/static/images/icon/nav-item-4.png"),
					title: '新品上架',
					link: '/pages/index/season?type=3'
				}],
				miaoshaList: [],
				specialList: [],
				showItem: {
					backTop: false,
					share : true
				},
				current: 0,
				mescroll:null,
			}
		},
		onUnload() {
			// this.mescroll.setBounce(true)
		},
		onShow() {
			// let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}
			// console.log(extConfig)
			setTimeout(() => {
				uni.hideTabBar({})
			}, 100)
		
			// this.$nextTick(() => {
					setTimeout(()=>{
						this.$share.shareLinkTo().then((data) => {
							console.log(data)
							if (data.id) {
								data.path += ('?id=' + data.id)
							}
							if(data.h==5){ //上新,秋冬,
								data.path+='?type='+data.type
							}
							if (data.isTab) {
								uni.switchTab({
									url: data.path
								})
							} else {
								console.log(data.path)
								setTimeout(()=>{
									wx.navigateTo({
										url: data.path
									});
								},500)
							}
							this.isGetPageQuery = false;
							uni.removeStorageSync('routerData');
						})
					},1000)
			// })
		},
		onShareAppMessage() {
			this.$help.isBtnShare = true
			return {
				title:'童创优选',
				path: '/pages/index/index?h=1',
			}
		},
		async onLoad() {
	
		},
		onPageScroll(e) {
			if (this.sTimer) {
				clearTimeout(this.sTimer)
			}
			this.sTimer = setTimeout(() => {
				if (e.scrollTop > 200) {
					this.showItem.backTop = true
				} else {
					this.showItem.backTop = false
				}
			}, 300)

		},
		methods: {
			toBrand(id){
				wx.navigateTo({
					url:'/pages/index/brandDetail?id='+id
				})
			},
			mescrollInit(mescroll) {
				setTimeout(() => {
					uni.hideTabBar({})
				}, 200)
				this.mescroll = mescroll;
				this.wechatNavBtnHeight = wx.getMenuButtonBoundingClientRect().top + 1
			},
			async downCallback() {
				this.specialList = []
				this.page = 1
				this.$loginIntercept.loginCallback(async () => {
					this.$tip.loading()
					this.banner = await this.getBanner()
					this.brandlist()
					this.miaoshaList = await this.newGoodslist() //上新
					this.$tip.loaded()
					this.mescroll.endDownScroll()
					this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				})
			},

			toDetail(id) {
				console.log(id)
				wx.navigateTo({
					url: '/pages/good/goodDetail?id=' + id
				})
			},
			// 轮播
			async getBanner() {
				let data = await this.$fly.post(this.$api.indexAdlist, {
					posId: 1
				})
				return data.data.list
			},
			// 小分类
			async getIndexcatlist() {
				let data = await this.$fly.post(this.$api.indexcatlist)
				return data.data
			},
			// 上新
			async newGoodslist() {
				let data = await this.$fly.post(this.$api.goodslist, {
					goodsNav: 3,
					page: 1,
					pageSize: 10
				})
				return data.data.list
			},

			// 品牌列表
			async brandlist() {
				if (this.page == 1) {

				} else {
					this.$tip.loading();
				}
				this.$fly.post(this.$api.brandlist, {
					page: this.page,
					pageSize: this.pageSize,
				}).then((res) => {
					this.timeOutLoaded();
					var list = res.data.list;
					this.loadMoreStatusDeal(res.data.list)
					if (list.length > 0) {
						this.specialList = this.specialList.concat(list)
					}
				})
			},

			toSearch() {
				wx.navigateTo({
					url: '/pages/search/search'
				})
			},
			swiperChange(e) {
				this.current = e.detail.current
			},
			share() {
				// 分享

			},
			onShareAppMessage() {
				return {
					title: '童创优选',
					path: '/pages/index/index'
				}
			},
			toBrandDetail() {
				wx.navigateTo({
					url: '/pages/search/search'
				})
			},
			nav(url) {
				if(url=='no'){
					return this.$tip.toast('正在建设中!')
				}
				wx.navigateTo({
					url: url
				})
			},
			scrollTop() {
				this.$refs['backTop'].backTop()
			},
			reachBottomCallBack() {
				this.brandlist();
			},


		},

	}
</script>

<style lang="scss" scoped>
	.special {
		padding-top: 50rpx;
		margin-bottom: 40rpx;

		.title {
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin-bottom: 40rpx;

			image {
				width: 42rpx;
				height: 40rpx;
				margin-right: 18rpx;
				vertical-align: text-top;
			}
		}

		.content {
			padding: 0 30rpx;
			margin-bottom: 30rpx;

			.banner {
				height: 330rpx;
				margin-bottom: 20rpx;
			}

			.special-good:after {
				content: '';
				width: 218rpx;
			}

			.special-good {
				display: flex;
				justify-content: space-between;
			}

		}
	}

	.miaosha {
		background: linear-gradient(to bottom, #fbe1e7 0%, #fff 50%, #fff 100%);
		padding-top: 45rpx;

		.title {
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin-bottom: 40rpx;

			image {
				width: 42rpx;
				height: 40rpx;
				margin-right: 18rpx;
				vertical-align: text-top;
			}
		}

		.miaosha-good {
			padding-left: 30rpx;
			.miaosha-item{
				display: inline-block;
			}
		}
	}

	.nav {
		display: flex;
		// margin: 24rpx;
		padding: 24rpx 30rpx 30rpx;
		// height: 65rpx;

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
			.blodS{
				font-size:32rpx;
				font-weight:bold;
			}
		}
	}

	.swiper-display-area {
		padding: 0 30rpx;
		position: relative;

		z-index: 1;
		height: 388rpx;

		.dot-container {
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

		.icons-box {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			position: absolute;
			left: 0;
			top: -35rpx;
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

	.container {
		padding-bottom: 90rpx;
	}

	.header-box {
		background: #DF464E;
		padding-top: 50rpx;
	}

	.header {
		display: flex;
		align-items: center;

		padding: 0 216rpx 0 20rpx;

		.logo-icon {
			width: 210rpx;
			height: 62rpx;
			margin-right: 18rpx;
		}

		.search-input-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 295rpx;
			height: 62rpx;
			font-size: 26rpx;
			font-weight: 400;
			background-color: #fff;
			color: #666666;
			// border:2rpx solid #FF0000;
			border-radius: 31rpx;

			.search-icon {
				width: 31rpx;
				height: 31rpx;
				flex-grow: 0;
				padding: 0 10rpx 0 20rpx;

				img {
					width: 31rpx;
					height: 31rpx;
					display: block;
				}

			}

			text {
				// margin-left:37rpx
			}

		}
	}
</style>
