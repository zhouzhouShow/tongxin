<!-- 秋冬上新 -->
<template>
	<view class="season">
		<view class="notice flex-center">
			<view class="box">
				<image class="icon" src="../../static/images/icon/notice.png" mode=""></image>
				<swiper class="notice-swiper" vertical="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
					<swiper-item class="clamp">
						新品9折优惠，喜欢的亲们抓紧抢购！
					</swiper-item>
					<swiper-item class="clamp">
						新品9折优惠，喜欢的亲们抓紧抢购！
					</swiper-item>
				</swiper>
			</view>
		</view>
<!-- 		<view class="list-nav">
			<view class="scroll">
	
				<scroll-view scroll-x="true" style="white-space:nowrap">
					<image @click.stop="toDetail(item.goods_id)" class="img1" v-for="(item,index) in navList" :key="index"  :src="item.goods_images[0]" mode="aspectFill"></image>
				</scroll-view>
			</view>
			<view class="more" @click="showMore">
				<text>查看更多</text>
				<image class="icon" src="../../static/images/icon/getMore.png" mode=""></image>
			</view>
		</view> -->
	
		<view class="recommend-box">
			<view class="r-title flex-center">
				<image src="../../static/images/icon/lindang.png" mode=""></image>
				<span>热卖尖货</span>
				<image src="../../static/images/icon/lindang.png" mode=""></image>
			</view>
			<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<div class="item">
					<product :product="item"></product>
				</div>
			</block>
			</view>
			<load-more :status="loadMore"></load-more>
		</view>
		<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
	</view>
</template>

<script>
	import product from '@/components/product'
	import fixedIcon from '@/components/fixedIcon.vue'
	import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	import loadMoreData from '@/mixins/loadmore.js'
	export default {
		
		mixins: [loadMoreData],
		components: {
			product,
			fixedIcon,
			loadMore
		},
		data() {
			return {
				showItem: {
					cart: false,
					share: true,
					backTop: true,
				},
				page:1,
				pageSize:10,
				list: [],
				navList:[],
				type:3,//新品上架 :3  秋冬上新:4
			};
		},
		onLoad(option){
			this.type = option.type || 3
			
				uni.setNavigationBarTitle({
					title:this.type==3?'新品上架':'秋冬上新'
				})
	
			this.getGood()
			// this.navListFun()
		},
		methods: {
			showMore(){
				
			},
			share(e) {

			},
			toDetail(id){
				wx.navigateTo({
					url:'/pages/good/goodDetail?id='+id
				})
			},
			async navListFun(){
				this.$tip.loading()
					let params = {
						page: 1,
						pageSize: this.pageSize,
						goodsNav:this.type,
					}
					await this.$fly.post(this.$api.goodslist,params).then(res=>{
						let list = res.data.list
						if(list.length>0){
							this.navList = this.navList.concat(list)
						}
					})
					this.timeOutLoaded();
			},
			reachBottomCallBack(){
				this.getGood();
			},
			async getGood(){
				this.$tip.loading()
				let params = {
					page: this.page,
					pageSize: this.pageSize,
					goodsNav:this.type,
				}
				await this.$fly.post(this.$api.goodslist,params).then(res=>{
					let list = res.data.list
					this.loadMoreStatusDeal(list)
					if(list.length>0){
						this.list = this.list.concat(list)
					}
				})
				this.timeOutLoaded();
			},
		},
		onShareAppMessage(res) {
			this.$help.isBtnShare = true
			if (res.from === 'button') {
				// console.log(res.target);
			}
			return {
				title:this.type==3?'新品上架':'秋冬上架',
				path: '/pages/index/index?h=5&type='+this.type,
				success: function() {
					console.log('分享成功')
				}
			}
		}
	
	}
</script>

<style lang="scss" scoped>
	.season {
		background: #FBEEDC;
		padding-bottom: 30rpx;
		min-height: 100vh;
		.notice{
			height:130rpx;
			background:rgba(255,180,79,1);
			padding:0 20rpx;
			.box{
				background:rgba(255,255,255,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				height: 90rpx;
				width: 100%;
				.icon{
					padding-left:20rpx;
					padding-right:20rpx;
					width: 40rpx;
					height: 40rpx;
				}
				.notice-swiper{
					flex: 1;
					height: 50rpx;
					line-height: 50rpx;
					font-size:30rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
					.swiper-item{
						height: 100%;
					}
				}
			}
			
		}
		.list-nav{
			background: #fff;
			padding: 10rpx 0 10rpx 20rpx;
			display: flex;
			margin-bottom: 45rpx;
			.scroll{
				flex: 1;
				overflow: hidden;
			}
			.img1,.img2{
				display: inline-block;
				width: 320rpx;
				height: 320rpx;
				margin-right: 10rpx;
				border-radius:8rpx;
			}
			.more{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width:74rpx;
				margin-left:auto;
				height:320rpx;
				background:linear-gradient(0deg,rgba(252,57,67,1) 0%,rgba(247,45,126,1) 100%);
				border-radius:8rpx 0px 0px 8rpx;
				text{
					width: 27rpx;
					font-size:28rpx;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
				.icon{
					width: 20rpx;
					height: 20rpx;
					margin-top: 15rpx;
				}
			}
		}
		.recommend-box {
			padding: 0 20rpx;
			text-align: center;
			margin-top: 45rpx;
			.r-title {
				image {
					width: 35rpx;
					height: 35rpx;
				}

				image:nth-of-type(2) {
					transform: rotateY(180deg);
				}

				span {
					margin: 0 24rpx;
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #D09304;
				}

				margin-bottom: 38rpx;
			}
	
			.list{
				display: flex;
				flex-wrap:wrap;
				justify-content: space-between;
			}
			.item{
				width: 345rpx;
				margin-bottom: 28rpx;
				border-radius: 8rpx;
				.i-img{
					width:345rpx;
					height:345rpx;
					border-radius:8rpx;
					display: block;
				}
				.info{
					margin-top: 20rpx;
					.name{
						width:260rpx;
						text-align: left;
						font-size:24rpx;
						font-weight:400;
						color:rgba(51,51,51,1);
					}
					.n-price{
						font-size: 40rpx;
						font-weight:500;
						color:rgba(242,39,50,1);
						margin-right: 20rpx;
						.p-icon{
							font-size:24rpx;
						}
					}
					
				}
				
			}
		}

	}
</style>
