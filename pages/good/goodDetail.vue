<template>
	<view class="good-detail" v-if="detail">
		<!-- 轮播图 -->
		<view class="good-swiper-container">
			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="3000" @change="swiperChange" :duration="1000"
			 indicator-active-color="#FF0000" class="good-swiper">
				<view>
					<swiper-item class="good-swiper-item" v-if="detail.goods_base.video_url">
						<video class="video-swiper-item" :src="detail.goods_base.video_url"></video>
					</swiper-item>
				</view>
				<view v-for="(item,index) in detail.goods_images" :key="index">
					<swiper-item class="good-swiper-item">
						<img  @click.stop="previewImage(index)" :src="item" class="slide-image" />
					</swiper-item>
				</view>
			</swiper>
			<view class="dot-container" v-if="detail.goods_images.length>0">
				<swiperDot :current='current' :length="detail.goods_images.length"></swiperDot>
			</view>
		</view>
		<!-- 秒杀 -->
		<view class="sec-kill "  :class="detail.islimit ? 'sec-kill-common': 'sec-no-common'">
			<view class="sec-kill-title">
				<text>¥</text>
				<text >{{detail.price_last}}</text>
				<text >¥{{detail.price_market}}</text>
				<image class="zhuan-icon" src="../../static/images/index/zhuan.png" mode=""></image>
				<text class="zhuan">¥{{detail.commission}}</text>
			</view>
			<view class="sec-kill-con ">
				<block v-if="detail.islimit && detail.islimit">
					<view class="sec-kill-text " style="line-height: 1;margin-bottom: 10rpx;"><text class="title-tips">距结束</text></view>
					<view class="flex-box">
						<view class="sec-kill-time"><text>{{formateDeadline.days}}</text></view>
						<view class="sec-kill-text"><text>:</text></view>
						<view class="sec-kill-time"><text>{{formateDeadline.hours}}</text></view>
						<view class="sec-kill-text"><text>:</text></view>
						<view class="sec-kill-time"><text>{{formateDeadline.minutes}}</text></view>
					</view>
				</block>
				<block v-else>
					<view class="sec-kill-text" >即将开抢,敬请期待!</view>
				</block>
			</view>
		</view>
		<view class="good-name-box">
			<view class="good-name clamp-two">
				{{detail.goods_title}}
			</view>
			<view class="like-box">
				<image class="like" @click.stop="collectOrLikeGood(1,detail.is_collect == 0? 0 : 1)" :src="detail.is_collect == 0 ?'../../static/images/good/d-like.png':'../../static/images/good/like.png'" mode=""></image>
				<!-- <image class="like" src="../../static/images/good/like.png" mode=""></image> -->
				<text>{{detail.likenum}}</text>
			</view>
		</view>
		<view class="good-area text-column-box" style="padding:40rpx 0">
			<view class="tips-box">
				温馨提示：新疆，西藏地区不发货
			</view>
			<view class="area">
				<view class="from-area">
					<text class="label">发货</text>
					<view class="tip-box2">
						<image src="../../static/images/icon/location.png" mode=""></image>
						<text src="">广东广州</text>
					</view>
					<text class="line">|</text>
					<text class="tip2">两件起包邮</text>
				</view>
				<view class="from-area">
					<text class="label">送至</text>
					<view class="tip-box2">
						<text src="">上海 浦东</text>
					</view>
					<text class="iconfont iconyoujiantou" ></text>
				</view>
			</view>
		</view>
		<view class="support text-column-box">
			<view class="row-box">
				<text class="label">支持</text>
				<text class="text">支持7天无理由退货</text>
			</view>
		</view>
		<view class="color-box text-column-box">
			<view class="row-box" @click="showPopFun">
				<text class="label">选择</text>
				<text class="text">{{(colorChooseIndex ===-1 && sizeChooseIndex ===-1) ? '请选择颜色尺码' :(colorArr[colorChooseIndex].item +sizeArr[sizeChooseIndex].item) }} </text>
				<text class="iconfont iconyoujiantou" ></text>
			</view>
			<view class="setMargin row-box">
				<text class="label">参数</text>
				<text class="text">品牌 适用年龄</text>
				<text class="iconfont iconyoujiantou" ></text>
			</view>
		</view>
		<view class="brand row-box " v-if="detail.brandinfo" @click.stop="toBrand">
			<image class="b-img" :src="detail.brandinfo.brand_logo[0]" mode="aspectFill"></image>
			<view class="name-box">
				<text class="name">{{detail.brandinfo.brand_name}}</text>
				<!-- <text class="area">中国</text> -->
			</view>
			<view class="r-text">进入品牌</view>
			<text style="margin-left:0" class="iconfont iconyoujiantou" ></text>
		</view>
		<view class="seeding row-box" @click="toSeeding">
			<view class="seeding-img" >
				<image class="b-img" v-if="grassmanList[0] && grassmanList[0].avatar" :src="grassmanList[0].avatar" mode=""></image>
				<image class="b-img" v-if="grassmanList[1] && grassmanList[1].avatar" :src="grassmanList[1].avatar" mode=""></image>
				<image class="b-img" v-if="grassmanList[2] && grassmanList[2].avatar" :src="grassmanList[2].avatar" mode=""></image>
			</view>
			<text class="tips" >大家都在种草</text>
			<view class="r-text">去看看</view>
			<text style="margin-left:0" class="iconfont iconyoujiantou" ></text>
		</view>
		<view class="recommend" v-if="recommendList.length">
			<view class="r-title">店铺推荐</view>
			<!-- <view class="good-box"> -->
			<scroll-view class="good-box" scroll-x="true" style="white-space: nowrap;"  >
				<view class="item" v-for="(item,index) in recommendList" :key="index" @click.stop="toDetail(item.good_id)">
					<image :src="item.goods_images[0]" mode="aspectFill"></image>
					<view class="good-name clamp">{{item.goods_title}}</view>
					<view class="price">¥{{item.price_last}}</view>
				</view>
			</scroll-view>
			<!-- </view> -->
		</view>
		<!-- 产品详情 -->
		<div class="good-info">
			<div class="detail-tips-title"> — 商品详情 —</div>
			<!--  <img v-for="(item,index) in goodsDetailImgs"
		        style="margin-bottom:10rpx;"
		        @click="previewDetailImg(index)"
		       :key="index" 
		       :src="item"
		       mode="widthFix"
		       width="100%"
		       alt=""> -->
			<parser :html="detail.goods_detail" :selectable="true"></parser>
			<!-- <rich-text :nodes="detail.goods_detail" class="richClass"></rich-text> -->
		</div>
		<div class="buy-fixed-btn">
			<div class="kefu" @click="toCart">
				<img class="kefu-icon" src="/static/images/good/good-cart.png" alt="">
				<div>购物车</div>
			</div>
			<div class="kefu">
				<img class="kefu-icon" src="/static/images/good/kefu.png" alt="">
				<div>客服</div>
				<button class="kefu-button" open-type="contact"></button>
			</div>
			<div class="operation flex-center">
				<div  class="buy-btn" @click.stop="showPopFun(1)">
					立即购买
				</div>
				<div class="add-shopcart isCanNotbuy"  @click.stop="showPopFun(1)">
					加入购物车
				</div>
			</div>
		</div>
		<div class="buy-pop" @touchmove.stop="">
			<div class="buy-pop-mask-box" v-if="showPopChoice" @click.stop="closePop"></div>
		
			<!-- <div class="buy-pop-box"  v-if="goodStock.colorarr && curColorKey"> -->
			<div class="buy-pop-box" :class="showPopChoice?'showPop':'hidePop'">
				<div class="choose-good-box">
					<div class="img-box">
						<image :src="chooseImg" mode=""></image>
					</div>
					<div class="info-box">
							<p class="price"><span class="p-icon">¥</span>{{detail.price_last}}
							<!-- <oneGoodPrice :totalPrice='detail.killgood.price' :skuNum='goodUnit'></oneGoodPrice> -->
							</p>
						<p class="store">库存: {{ inventoryNum || 0 }}</p>
						<p>已选: {{ colorChooseIndex == -1? '未选择': colorArr[colorChooseIndex].item}}</p>
					</div>
				</div>
				<div class="buy-pop-box-color" style="padding: 0rpx 30rpx 5rpx 30rpx;">
					<div class="color-title">
						{{colorTitle}}选择({{colorArr.length}})
					</div>
					<div class="color-list" v-if="colorArr.length">
						<div class="color-item" v-for="(value,index) in colorArr" :class="{ 'color_active' : index == colorChooseIndex}"
						 @click.stop="curColorKeyFun('color',index)" :key="index">
						 <image class="color-img" :src="value.img" mode=""></image>
							<span>{{value.item}}</span>
							<!-- <span class="nums" v-if="value.choiceNum">{{value.choiceNum}}</span> -->
						</div>
					</div>
				</div>
				<div class="buy-pop-box-color">
					<div class="color-title">
						{{sizeTitle}}
					</div>
					<div class="color-list" v-if="sizeArr.length">
						<div class="color-item size-color"  v-for="(value,index) in sizeArr" :class="{ 'active' : index == sizeChooseIndex}"
						 @click.stop="curColorKeyFun('size',index)" :key="index">
							<span >{{value.item}}</span>
							<!-- <span class="nums" v-if="value.choiceNum">{{value.choiceNum}}</span> -->
						</div>
					</div>
				</div>
				<div class="number-box">
					<span class="num-tips">购买数量</span>
					<div class="num-right-box">
						<!-- <span class="inventory">库存: {{ inventoryNum || 0 }}</span> -->
						<div>
						<uni-number-box :value='1' :min="1" :max="inventoryNum" @change="getNumberValue"
						 :onlyKey="123"></uni-number-box>
						
						</div>
					</div>
				</div>
				<div class="buy-sure-btn-container">
					<div class="buy-sure-btn">
						<div class="add-cart" @click.stop="subAddShopCart(2)">加入购物车</div>
						<div class="buy-now" @click.stop="subAddShopCart(1)">立即购买</div>
					</div>
				</div>
			</div>
		
			
		</div>
		<!-- <div class="share-pop"> -->
			<popup ref="popup" :show="sharePop" :maskClick="false" type="bottom">
				<div class="share-pop">
					<div class="title flex-center">
						<span>分享</span>
						<span class="iconfont iconchacha" @click="sharePop=false"></span>
					</div>
					<div class="share-type">
						<button  open-type="share"  class="" >
							<image src="../../static/images/good/share_wechat.png" mode=""></image>
							<p>分享群/好友</p>
						</button>
						<div class="" @click.stop="saveImg">
							<image src="../../static/images/good/share_download.png" mode=""></image>
							<p>保存图片</p>
						</div>
					</div>
					<div class="cancel"  @click="sharePop=false">取消</div>
				</div>
			</popup>
		<!-- </div> -->
		<fixedIcon @share="share" type="special" ref="backTop" :showItem='showItem'></fixedIcon>
	</view>
</template>

<script>
	import fixedIcon from '@/components/fixedIcon.vue'
	import parser from "@/components/jyf-Parser/index.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import popup from '@/components/uni-popup/uni-popup.vue'
	import swiperDot from '@/components/index/swiper-dot.vue'
	export default {
		components:{
			parser,
			uniNumberBox,
			popup,
			swiperDot,
			fixedIcon
		},
		data() {
			return {
				id:'',
				recommendList:[],
				showPopChoice:false,
				inventoryNum:100, //库存
				colorChooseIndex:0,
				sizeChooseIndex:0,
				sharePop:false,
				chooseNum:1,
				colorArr:[],
				sizeArr:[],
				skuStr:'', //sku
				skuId:'', //skuId
				products_list:[], //规格列表
				chooseImg:'',
				sizeTitle:'',//尺寸title
				colorTitle:'', // 颜色title
				detail: {},
				timer:null,
				deadline:0,//秒杀倒计时
				grassmanList:[],//随机种草人
				current:0,
				showItem:{ //
					share:true
				},
				userIsAgent:false,//是否为代理
			};
		},
		onShareAppMessage(res) {
			help.isBtnShare = true
			if (res.from === 'button') {
				// console.log(res.target);
			}
			return {
				title: this.detail.goods_title,
				path: '/pages/index/index?good=' + this.good_id,
				imageUrl: this.detail.goods_images[0],
				success: function() {
					console.log('分享成功')
				}
			}
		},
		async onLoad(option){
			this.id = option.id
			this.$tip.loading()
			let data = await this.getDetail()
			this.detail = data.data
			this.colorArr = this.detail.specList[0].specChildList
			this.sizeArr = this.detail.specList[1].specChildList
			this.colorTitle = this.detail.specList[0].name
			this.sizeTitle = this.detail.specList[1].name
			this.products_list = this.detail.products_list
			if(this.detail.islimit){
				this.deadline = this.detail.limitgoods.deadline
			}
			uni.setNavigationBarTitle({
				title:this.detail.goods_title
			})
			this.getSkuImg(this.colorArr,this.sizeArr,this.products_list)
			// 获取库存
			this.getSkuAndStock(this.colorArr[0].id+'_'+this.sizeArr[0].id)
			this.chooseImg = this.colorArr[0].img
			// 倒计时
			this.timer = setInterval(() => {
				this.deadline = this.deadline - 1
				if (this.deadline <= 0) {
					clearInterval(this.timer)
					this.timer = null
				}
			}, 1000)
			// 获取用户是不是代理
			this.$user.getInfo('is_agent').then(res=>{
				console.log(res)
				this.showItem.share = res==0 ? false : true
			})
			this.$tip.loaded()
			this.recommendList =  await this.recommondGoodslist()
			this.grassmanList  = await this.grassman()
		},
		computed:{
			formateDeadline() {
				let leftTime = this.deadline*1000; //计算剩余的毫秒数
				// console.log(leftTime)
				let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
				let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
				let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
				let seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
				days = this.checkTime(days);
				hours = this.checkTime(hours);
				minutes = this.checkTime(minutes);
				seconds = this.checkTime(seconds);
				
				// return days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
				return {
					days,
					hours,
					minutes,
					seconds
				}
			},
		},
	
		methods:{
			saveImg(){
				let img = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg"
				this.$utils.saveImgToPhotosAlbum(img)
			},
			 shareImg(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 2,
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
				 console.log(1)
				 this.$utils.shareImg("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg")
			 },
			// 分享
			share(){
				this.sharePop = true
				// this.$refs.popup.open()
			},
			toBrand(id){
				wx.navigateTo({
					url:'/pages/index/brandDetail?id='+this.detail.brandinfo.id
				})
			},
			swiperChange(e){
				this.current = e.detail.current
			},
			toSeeding(id){
				wx.switchTab({
					url:'/pages/seeding/seeding'
				})
			},
			toDetail(id){
				wx.navigateTo({
					url:"/pages/good/goodDetail?id="+id
				})
			},
			checkTime(number) { //将0-9的数字前面加上0，例1变为01
				if (number < 10) {
					number = "0" + number;
				}
				return number;
			},
			async grassman(){
				let data = await this.$fly.post(this.$api.grassman,{goods_id:this.id})
				return data.data
			},
			async recommondGoodslist(){
				let data = await this.$fly.post(this.$api.goodslist,{goodsNav:0,page:1,pageSize:10,is_recommend:1})
				return data.data.list
			},
			// 通过color和size 的id  拿sku的图片
			getSkuImg(colorArr,sizeArr,skulist){
				colorArr.forEach((itemC)=>{
					sizeArr.forEach((itemS)=>{
						let skuKey = itemC.id+'_'+itemS.id
						for(let itemK of skulist){
							if(itemK.sku == skuKey){
								console.log(itemK.goods_images[0])
								itemC.img = itemK.goods_images[0]
							}
						}
					})
				})
			},
			getSkuAndStock(strSku){ //获取sku和库存
			let obj = {
				inventoryNum :0,
				sku : ''
			}
				this.products_list.forEach(item=>{
					if(item.sku == strSku){
						this.inventoryNum = item.stock
						this.skuStr = item.sku
						this.skuId = item.id
						// obj.sku = item.sku
						// obj.stock = item.stock
						
					}
				})
				return obj
			},
			curColorKeyFun(type,index){
				if(type === 'size'){
					this.sizeChooseIndex = index
				}else if (type === 'color'){
					this.colorChooseIndex = index
				}
				// 获取库存
				this.getSkuAndStock(this.colorArr[this.colorChooseIndex].id+'_'+this.sizeArr[this.sizeChooseIndex].id)
			},
			/* 添加购物车 */
			async subAddShopCart(optionType) {
				let choiceGoods = [];
				let goodObj = {
					'color_id': 0,
					'size_id': 0
				}
				if(this.sizeChooseIndex ==-1){
						return this.$tip.toast('请选择身高!')
						return
				}
				if(this.colorChooseIndex ==-1){
						return this.$tip.toast('请选择颜色!')
				}
				if(!this.skuStr || !this.skuId){
					return this.$tip.toast('规格错误!')
				}
					goodObj.product_id = this.skuId
					goodObj.goods_num = this.chooseNum 
					goodObj.goods_id = this.detail.goods_id
					goodObj.sku = this.skuStr
					goodObj.size_id = this.sizeArr[this.sizeChooseIndex].size_id
					goodObj.color_id = this.colorArr[this.colorChooseIndex].color_id
					// let strKey = this.curColorKey + '-' + this.goodStock.sizeArr[0].size_id
					// goodObj.sku = this.goodStock.stockarr[strKey].sku
				
				choiceGoods.push(goodObj)
				console.log(choiceGoods)
			
				if (this.inventoryNum == 0) {
					return this.$tip.toast('库存不足')
				}
			
				this.showPopChoice = false;
				this.$tip.loading('添加中')
			
				this.$fly.post(this.$api.addCart, {
					jsonstr: JSON.stringify(choiceGoods),
					type: optionType == 2 ? 1 : 2  // 1 添加  2编辑
				}).then(res => {
					console.log(optionType)
					this.$tip.loaded()
					if (optionType == 2) { //加入购物车 
						this.$tip.toast('添加成功!')
						// this.inventoryNum -= this.chooseNum //把库存减去
					} else { //立即购买
						this.$fly.post(this.$api.addressDefault).then(result => {
							if (result.data.provName == null || !result.data) {
								//跳转添加地址
								wx.navigateTo({
									url: "/pages/center/address/address?isShop=1&cart_ids=" + res.data.cart_id
								});
							} else {
								wx.navigateTo({
									url: '/pages/shopCart/submitOrder?cart_ids=' + res.data.cart_id + '&address_id=' +
										result.data.id
								})
							}
						})
						// this.goShopCart();
			
					}
				}).catch(e => {
					this.$tip.loaded()
				})
			},
			toCart(){
				wx.navigateTo({
					url:'/pages/shopCart/shopCart2'
				})
			},
			previewImage(num) {
				let list = this.detail.goods_images
				list.forEach((item, index) => {
					list[index] = item
				})
				this.$tools.previewImage(this.detail.goods_images, num)
			},
			getNumberValue(e){
				this.chooseNum = e.value
			},
			// 收藏或者喜欢商品
			collectOrLikeGood(type, collect_type) {
				this.$fly.post(this.$api.addCollection, {
					relateId: this.id,
					type: type,
					actionType: collect_type
				}).then(res => {
					this.detail.is_collect =  collect_type == 0 ? 1 : 0
				})
			},
			closePop() {
				this.showPopChoice = false
			},
			showPopFun(){
				this.showPopChoice = true
			},
			async getDetail(){
				
				let data =  await this.$fly.post(this.$api.goodInfo,{goods_id:this.id})
				
				return data
			},
		},
		
	}
</script>

<style lang="scss" scoped>
	.good-detail {
		background: #f3f3f3;
		padding-bottom: 100rpx;
	}
	.share-pop{
		height: 536rpx;
		.title{
			height: 100rpx;
			background: #f8f8f8;
			text-align: center;
			position: relative;
			.iconchacha{
				position: absolute;
				right: 20rpx;
				top:20rpx;
				font-size: 60rpx;
				color: red;
			}
		}
		.share-type{
			padding: 70rpx 0;
			display: flex;
			justify-content: center;
			button{
				background: transparent;
				border: none;
				box-shadow: none;
				padding: 0;
				margin: 0;
				margin-right: 245rpx;
				text-align: center;
				line-height: inherit;
			}
			div,button{
				
				image{
					width: 110rpx;
					height: 110rpx;
				}
				p{
					margin-top:30rpx;
					font-size:28rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
		}
		.cancel{
			width:690rpx;
			height:80rpx;
			line-height:80rpx;
			margin:0 auto;
			text-align: center;
			background:rgba(238,238,238,1);
			opacity:0.8;
			border-radius:40rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
		}
	}
	.good-swiper-container {
		background: #fff;
		position: relative;
		.good-swiper {
			width: 100%;
			height: 650rpx;
		}
		.dot-container{
			position: absolute;
			right: 30px;
			bottom: 20rpx;
		}
		.slide-image {
			width: 100%;
			height: 650rpx;
		}

		.video-swiper-item {
			width: 100%;
			height: 650rpx;
		}
	}
	.text-column-box{
		padding: 40rpx 30rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}
	.good-info {
		width: 100%;
		background: #fff;
		margin-bottom: 20rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
	
		.detail-tips-title {
			text-align: center;
			padding: 39rpx 0 30rpx 0;
		}
	
		image {
			width: 100% !important;
			display: block;
		}
	}
	.row-box{
		display: flex;
		font-size:28rpx;
		font-weight:400;
		align-items: center;
		.label{
			color: #999999;
			margin-right: 45rpx;
		}
		.text{
			color: #333333;
		}
		.iconyoujiantou{
			margin-left:auto;
			color: #ddd;
			font-size: 47rpx;
		}
	}
	.recommend{
		padding:40rpx 30rpx;
		margin-bottom: 20rpx;
		background: #fff;
		.r-title{
			font-size:30rpx;
			font-weight:400;
			margin-bottom: 30rpx;
		}
		.good-box{
			.item{
				width:200rpx ;
				margin-right: 20rpx;
				display: inline-block;
				image{
					width: 200rpx;
					height: 200rpx;
					margin-bottom: 20rpx;
				}
				.good-name{
					font-size:24rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 18rpx;
				}
				.price{
					font-size:30rpx;
					font-weight:500;
					color:rgba(242,39,50,1);
				}
			}
		}
		// <view class="r-title">店铺推荐</view>
		// <view class="good-box">
		// 	<view class="item">
		// 		<image src="../../static/images/icon/nav-item-3.png" mode=""></image>
		// 		<view class="good-name">草莓短袖女童连衣裙adfsadgasd宝宝夏装纯棉</view>
		// 		<view class="price">¥199.9</view>
		// 	</view>
		// </view>
	}
	.seeding{
		padding:20rpx 30rpx;
		background: #fff;
		margin-bottom: 20rpx;
		.seeding-img{
			position: relative;
			margin-right: 20rpx;
			width: 120rpx;
			height: 55rpx;
			image:nth-child(1){
				left: 0;
			}
			image:nth-child(2){
				left: 30rpx;
			}
			image:nth-child(3){
				left: 60rpx;
			}
			image{
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				top:0;
				border-radius: 50%;
			}
		}
		.tips{
			font-size:28rpx;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.r-text{
			margin-left:auto;
			margin-right: 20rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		
	}
	.brand{
		padding:30rpx 30rpx 35rpx;
		margin-bottom: 20rpx;
		background: #fff;
		.b-img{
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
		}
		.name-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			
			.name{
				margin-bottom: 27rpx;
				font-size:32rpx;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.area{
				font-size:26rpx;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
		.r-text{
			margin-left:auto;
			margin-right: 20rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		
	}
	.support{
		
	}
	.color-box{
	
	}
	.setMargin{
		margin-top: 47rpx;
	}
	
	.good-area{
		background: #fff;
		margin-bottom: 20rpx;
		.tips-box{
			padding:0 0 20rpx 30rpx ;
			border-bottom: 1rpx solid #eee;
			font-size:24rpx;
			font-weight:400;
			color:rgba(242,39,50,1);
		}
		.area{
			.from-area{
				padding: 0 30rpx;
				font-size:28rpx;
				font-weight:400;
				display: flex;
				align-items: center;
				margin-top: 33rpx;
				.label{
					color: #999999;
					margin-right: 47rpx;
				}
				.tip-box2{
					image{
						width: 24rpx;
						height: 27rpx;
						margin-right: 16rpx;
					}
					text{
						font-size:28rpx;
						color: #333;
					}
				}
				.iconyoujiantou{
					margin-left:auto;
					color: #ddd;
					font-size: 47rpx;
				}
				.line{
					margin: 0 30rpx;
				}
				.tip2{
					font-size:28rpx;
					color: #333;
				}
					
			}
		}
	}
	.good-name-box{
		display: flex;
		padding: 40rpx 30rpx;
		background: #fff;
		margin-bottom: 20rpx;
		.good-name{
			width:538rpx;
			font-size:30rpx;
			font-weight:500;
			line-height:46rpx;
		}
		.like-box{
			display: flex;
			align-items: center;
			margin-left:48rpx;
			.like{
				width: 34rpx;
				height: 34rpx;
				margin-right: 13rpx;
			}
			text{
				font-size:24rpx;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
		}
	}
	
	// 秒杀
	.sec-kill {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		padding-right: 12rpx;
		background: #FF5656;
		color: #fff;
		height: 100rpx;
		box-sizing: border-box;
	
		&-common {
			background: url(../../static/images/seckill_bg_common.png) top center no-repeat;
			background-size: 100% 100%;
			text.title-tips{
				color: #F12732 !important;
			}
			.sec-kill-text,
			.sec-kill-time {
				text {
					font-weight: 400;
					color: #fff;
				}
			}
		}
	
		.sec-kill-title {
			font-size: 32rpx;
			font-weight: 500;
	
			text:first-child {
				font-size: 30rpx;
			}
	
			text:nth-child(2) {
				font-size: 60rpx;
			}
	
			text:nth-child(3) {
				margin-left: 30rpx;
				font-size: 30rpx;
				text-decoration: line-through;
			}
			.zhuan-icon{
				margin-left: 15rpx;
				margin-right: 4rpx;
				width: 28rpx;
				height: 28rpx;
				vertical-align: middle;
			}
			.zhuan{
				// display: inline-block;
				font-size: 26rpx;
				color: #FBDF98;
				
			}
		}
		.flex-box{
			font-weight: bold;
			display: flex;
			align-items: center;
		}
		.sec-kill-con {
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
		}
	
		.sec-kill-text {
			font-size: 28rpx;
			text-align: center;
		}
	
		.sec-kill-time {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40rpx;
			height: 40rpx;
			background: #000;
			border-radius: 4rpx;
			color: #333333;
			margin: 0 10rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 26rpx;
		}
	}
	.sec-no-common{
		background: #fff;
		.sec-kill-title {
			
			text:first-child {
				color:#F22732 ;
			}
			
			text:nth-child(2) {
				color:#F22732 ;
			}
			
			text:nth-child(3) {
				color: #999999;
			}
			.zhuan-icon{
				margin-left: 15rpx;
				margin-right: 4rpx;
				width: 28rpx;
				height: 28rpx;
				vertical-align: middle;
			}
			.zhuan{
				// display: inline-block;
				font-size: 26rpx;
				color: #FBDF98;
				
			}
		}
	}
	// 购买按钮
	.buy-fixed-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 98rpx;
		z-index: 100;
		padding-left:42rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		text-align: center;
	
		.index,
		.kefu,
		.collect {
			font-size: 20rpx;
			font-weight: bold;
			color: #999999;
			padding: 0 30rpx;
			position: relative;
		}
	
		.kefu-button {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			opacity: 0;
		}
	
		.index {
			.index-icon {
				width: 48rpx;
				height: 48rpx;
			}
		}
	
		.kefu-icon {
			width: 48rpx;
			height: 48rpx;
		}
	
		.collect-icon {
			width: 48rpx;
			height: 48rpx;
		}
		.operation{
			width:420rpx;
			margin-right: 30rpx;
			.buy-btn {
				width:210rpx;
				height:80rpx;
				background:linear-gradient(90deg, #F77312 0%,#FAA638 100%);
				border-radius:40rpx 0px 0px 40rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #fff;
				line-height: 80rpx;
			}
			.add-shopcart {
				width:210rpx;
				height:80rpx;
				background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
				border-radius:0px 40px 40px 0px;
				font-size: 32rpx;
				color: #fff;
				line-height: 80rpx;
			}
		}
		
	
		.disable {
			width: 450rpx;
			background: #ccc;
		}
	
		
	}
	// 购买规格选择
	.buy-pop {
		// position: fixed;
		// top: 0;
		// left: 0;
		// right: 0;
		// bottom: 0;
		// z-index: 1000;
	
		.buy-pop-mask-box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 99;
			background: rgba(0, 0, 0, .5);
		}
	
	
		.buy-pop-box {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1000;
			background: #fff;
			min-height: 550rpx;
			transition: all .5s;
			// border-radius: 10rpx 10rpx 0px 0px;
	
			.choose-good-box {
				padding: 20rpx 20rpx 0;
				display: flex;
				margin-bottom: 40rpx;
	
				.img-box {
					width: 186rpx;
					height: 192rpx;
					// overflow: hidden;
					image {
						width: 100%;
						height: 100%;
						// border-radius: 10rpx;
					}
				}
	
				.info-box {
					margin-left: 20rpx;
					color: #666666;
					font-size: 24rpx;
					padding-top: 20rpx;
					font-weight: 400;
					.price {
						font-size: 48rpx;
						color: rgba(242, 48, 48, 1);
						margin-bottom: 20rpx;
						.p-icon{
							font-size: 30rpx;
						}
					}
	
					.store {
						margin-bottom: 15rpx;
					}
				}
	
				.close {
					width: 27rpx;
					height: 27rpx;
					position: absolute;
					right: 20rpx;
					top: 30rpx;
				}
			}
	
			.buy-pop-box-header {
				padding: 0 30rpx;
				margin-top: -30rpx;
				display: flex;
				align-items: flex-end;
	
				.buy-pop-good-img {
					width: 250rpx;
					height: 250rpx;
					background: #fff;
					border: 2rpx solid #CCCCCC;
					border-radius: 10rpx;
					margin-right: 20rpx;
					overflow: hidden;
	
					.good-img {
						width: 250rpx;
						height: 250rpx;
					}
				}
	
				.buy-pop-good-info {
					.buy-pop-origin-price {
						color: #EB3636;
						font-size: 40rpx;
						font-weight: 400;
	
						// line-height:111rpx;
						span {
							font-size: 27rpx;
						}
					}
				}
			}
	
			.buy-pop-stock {
				margin: 10rpx 0;
			}
	
			.buy-pop-stock,
			.buy-pop-choiced {
				font-size: 26rpx;
				font-weight: 400;
				color: #222222;
			}
	
			.number-box {
				padding: 0 15rpx 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				.num-tips {
					font-size: 30rpx;
					color: #333;
					font-weight: 500;
				}
	
				.num-right-box {
					display: flex;
					align-items: center;
	
					.inventory {
						font-size: 22rpx;
						margin-right: 20rpx;
					}
				}
			}
	
			.total-box {
				text-align: right;
				color: #333333;
				font-size: 24rpx;
				padding: 0 22rpx 35rpx;
				display: flex;
	
				span:nth-child(1) {
					font-size: 400;
				}
	
				justify-content: space-between;
	
			}
	
			.buy-pop-box-color {
				padding: 20rpx 30rpx 5rpx 30rpx;
	
				// border-bottom: 1px solid #EEEEEE;
				.color-title {
					color: #333;
					font-size: 30rpx;
					font-weight: 500;
				}
	
				.color-list {
					display: flex;
					flex-wrap: wrap;
					padding: 30rpx 0rpx;
					box-sizing: border-box;
					div.size-color {
						border: 1px solid rgba(238, 238, 238, 1);
						border-radius: 8rpx;
						span{
							background: #fff;
						}
					}
					.color_active{
						border:1rpx solid rgba(242,39,50,1);
						color: #F22732;
					}
					.color-item {
						box-sizing: border-box;
						width:200rpx;
						margin-right: 20rpx;
						border-radius:8rpx;
						font-size: 24rpx;
						font-weight: 400;
						overflow: hidden;
						text-align: center;
						margin-bottom: 12rpx;
						color: #333;
						position: relative;
						.color-img{
								width: 100%;
								height: 200rpx;
								background:rgba(230,231,233,1);
								margin-bottom: 8rpx;
						}
						span{
							width: 100%;
							display: inline-block;
							height:60rpx;
							line-height:60rpx;
							background:rgba(248,248,248,1);
							border-radius:8rpx;
						}
				
	
						&.active {
							background: rgba(254, 239, 239, 1);
							color: #F23030;
							border:1rpx solid rgba(242,39,50,1);
						}
					}
				}
			}
	
			.buy-pop-spec {
				padding: 30rpx;
	
				.spec-title {
					color: #222222;
					font-size: 28rpx;
					font-weight: bold;
				}
	
				.spec-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
	
					.spec-item-left {
						width: 200rpx;
						min-height: 67rpx;
						padding: 10rpx;
						background: #F2F2F2;
						border-radius: 8rpx;
						text-align: center;
						// line-height: 67rpx;
						font-size: 26rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						word-break: break-all;
	
						span {
							flex: 1;
						}
	
						&.active {
							background: #BFBFBF;
						}
	
						&.disabled {
							color: #666;
						}
					}
	
					.spec-item-center {
						font-size: 24rpx;
						font-weight: 400;
					}
	
					.size-num {
						display: flex;
						width: 260rpx;
						height: 70rpx;
						background: #F2F2F2;
						border-radius: 10rpx;
	
						.minus,
						.plus {
							width: 70rpx;
							height: 70rpx;
							text-align: center;
							line-height: 70rpx;
							font-size: 56rpx;
							color: #CCCCCC;
	
						}
	
						.option-number {
							flex: 1;
							color: #222222;
							font-size: 36rpx;
							text-align: center;
							line-height: 70rpx;
							background: #fff;
	
							.option-number-input {
								border: none;
								width: 100%;
								outline: none;
								text-align: center;
								height: 70rpx;
								line-height: 70rpx;
								color: #222222;
								font-size: 34rpx;
							}
						}
					}
				}
			}
		}
	
		.buy-pack-pop-box {
			height: 658rpx;
		}
	
		.buy-sure-btn-container {
			text-align: center;
			background: #fff;
			color: #333333;
			display: flex;
			justify-content: center;
			height: 100rpx;
			padding-bottom: 10rpx;
			.add-cart,.buy-now{
				width:345rpx;
				height:80rpx;
				line-height:80rpx;
			}
			.add-cart{
				border-radius:40px 0px 0px 40px;
				background:linear-gradient(90deg,rgba(251,172,60,1) 0%,rgba(247,114,16,1) 100%);
			}
			.buy-now{
				border-radius:0px 40rpx 40rpx 0px;
				background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
			}
			.buy-sure-btn {
				width: 690rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				border-radius: 40rpx;
				overflow: hidden;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
			}
		}
	
	}
	.showPop{
		transform:translateY(0);
		visibility: inherit;
	}
	.hidePop{
		transform: translateY(100%);
		visibility: hidden;
	}
	
</style>
