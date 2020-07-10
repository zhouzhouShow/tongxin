<template>
	<view class="release">
		<view class="line"></view>
		<view class="reason">
			<textarea :maxlength="-1" v-model="seedingReason" placeholder="请描述你种草ta的理由" />
			</view>
		<view class="upload">
			<view v-if="video" class="video">
				<video :src="video" :controls="false"></video>
				<view @click="handleDeleteVideo" class="delete">
					<image src="../../static/images/seeding/icon_delete.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view v-for="(image, index) in images" :key="index" class="image">
				<image :src="image" mode="aspectFill"></image>
				<view @click="handleDelete(index)" class="delete">
					<image src="../../static/images/seeding/icon_delete.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view @click="chooseMedia" v-if="!video && images.length<9" class="btn">
				<image src="../../static/images/seeding/icon_upload.png" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="choose">
			<view @click="showThemePopup" class="theme">
				<view class="theme_box">
					<image :src="topic?require('../../static/images/seeding/icon_theme.png'):require('../../static/images/seeding/icon_theme_dark.png')" mode="scaleToFill"></image>
					<text>{{topic || '参与话题互动'}}</text>
				</view>
			</view>
			<view @click="showRelatePopup" class="relate">
				<image src="../../static/images/seeding/icon_add_dark.png" mode="scaleToFill"></image>
				<text>添加关联商品</text>
				<text>{{relateList.length}}/{{maxRelate}}</text>
			</view>
		</view>
		<view class="relates">
			<view @click.stop="handleToDetail(product.goods_id)" v-for="(product,idx) in relateList" :key="idx" class="item">
				<view class="image">
					<image :src="product.image" mode="aspectFit"></image>
				</view>
				<view class="info">
					<view class="title">
						<text>{{product.name}}</text>
					</view>
					<view class="price">
						<text>¥{{product.price}}</text>
					</view>
				</view>
				<view @click.stop="removeRelate(product.goods_id)" class="remove">
					<image src="../../static/images/seeding/icon_remove.png" mode=""></image>
				</view>
			</view>
		</view>
		<view @click="handleSubmit" class="release">
			<view>
				<text>发布</text>
			</view>
		</view>
		<uni-popup @change="themePopupChange" ref="themePopup" type="bottom">
			<view class="popup_header">
				<text class="title">参与话题</text>
				<image @click="hideThemePopup" class="close" src="@/static/images/seeding/icon_close.png" mode="scaleToFill"></image>
			</view>
			<view class="theme_list">
				<view @click="chooseTopic(theme)" v-for="(theme,num) in topicList" :key="num" class="theme_list_item">
					<image :src="theme.id==selectTopicId?require('../../static/images/seeding/icon_theme.png'):require('../../static/images/seeding/icon_theme_dark.png')" mode="scaleToFill"></image>
					<text :class="[theme.id==selectTopicId?'active':'']">{{theme.name}}</text>
				</view>
			</view>
			<view @click="sureTopic" class="theme_btn">
				<view><text>确定</text></view>
			</view>
		</uni-popup>
		<uni-popup @change="relatePopupChange" ref="relatePopup" type="bottom">
			<view class="popup_header">
				<text class="title">添加推荐商品</text>
				<image @click="hideRelatePopup" class="close" src="@/static/images/seeding/icon_close.png" mode="scaleToFill"></image>
			</view>
			<view class="relate_title">
				<text>您可以通过以下任意一种方式快速找到推荐商品</text>
			</view>
			<view class="relate_list">
				<view @click="handleToSearchRelate" class="relate_list_item">
					<view class="bg">
						<image src="../../static/images/seeding/icon_select_search.png" mode="scaleToFill"></image>
					</view>
					<view class="name">
						<text>搜索商品</text>
					</view>
				</view>
				<view @click="handleToBoughtRelate" class="relate_list_item">
					<view class="bg">
						<image src="../../static/images/seeding/icon_select_order.png" mode="scaleToFill"></image>
					</view>
					<view class="name">
						<text>已买到的</text>
					</view>
				</view>
				<view @click="handleToShoppingCarRelate" class="relate_list_item">
					<view class="bg">
						<image src="../../static/images/seeding/icon_select_car.png" mode="scaleToFill"></image>
					</view>
					<view class="name">
						<text>购物车内的</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {seedingJson} from '@/static/js/seedingJson.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name:"release",
		components:{
			uniPopup
		},
		data() {
			return {
				seedingReason:'',
				images:[],
				video:'',
				chooseType:[['image'],['video'],['image','video']],
				sourceType: ['album', 'camera'],
				relateList:[],
				relateIds:[],
				maxRelate:9,
				maxDuration:30,
				maxCount:9,
				topicList:[],
				topic:'',
				topicId:0,
				selectTopic:'',
				selectTopicId:0,
				submitUrl:[]
			};
		},
		mounted() {
			this.getTitleList()
		},
		onReady() {
			uni.$on('getRelateInfo',data=>{
				this.relateIds = data.relateIds
				this.relateList = data.relateList
			})
		},
		onUnload() {
			uni.$off('getRelateInfo')
		},
		methods:{
			getTitleList() {
				this.$fly.post(this.$api.getTitleList).then(res=>{
					this.topicList = res.data.list || []
				})
			},
			chooseMedia(){
				let _this = this
				let type = this.images.length>0?0:2
				uni.chooseMedia({
				  count: _this.maxCount,
				  mediaType: _this.chooseType[type],
				  sourceType: _this.sourceType,
				  maxDuration: _this.maxDuration,
				  camera: 'back',
				  success(res) {
						let type = res.type
						if(type=='video'){
							_this.video = res.tempFiles[0].tempFilePath
						}else{
							_this.images.push(res.tempFiles[0].tempFilePath)
						}
				  }
				})
			},
			handleDelete(index) {
				this.images.splice(index,1)
			},
			handleDeleteVideo() {
				this.video = ''
			},
			showThemePopup() {
				this.selectTopic = this.topic
				this.selectTopicId = this.topicId
				this.$refs.themePopup.open()
			},
			hideThemePopup() {
				this.selectTopicId = 0
				this.selectTopic = ''
				this.$refs.themePopup.close()
			},
			themePopupChange(e) {
				// console.log(e.show)
			},
			showRelatePopup() {
				this.$refs.relatePopup.open()
			},
			hideRelatePopup() {
				this.$refs.relatePopup.close()
			},
			relatePopupChange(e) {
				// console.log(e.show)
			},
			chooseTopic(theme){
				this.selectTopic = theme.name
				this.selectTopicId = theme.id
			},
			sureTopic() {
				this.topic = this.selectTopic
				this.topicId = this.selectTopicId
				setTimeout(()=>{
					this.selectTopicId = 0
					this.selectTopic = ''
					this.hideThemePopup()
				})
			},
			async handleSubmit() {
				if(!this.seedingReason){
					uni.showToast({
						title:'请描述你种草ta的理由',
						duration:1500
					})
				}else if(!this.video && !this.images){
					uni.showToast({
						title:'请上传照片/视频',
						duration:1500
					})
				}else if(this.relateList.length<=0){
					uni.showToast({
						title:'至少添加1个关联商品',
						duration:1500
					})
				}else{
					let loadingTitle = '';
					if(this.video){
						loadingTitle = '正在上传视频'
						let result = await this.$utils.uploadFile(this.video, loadingTitle);
						let data = JSON.parse(result.data);
						this.submitUrl.push({
							url:data.data.url,
							type:'video'
						});
						this.submitFn()
					}else{
						for (let i = 0; i < this.images.length; i++) {
							loadingTitle = '正在上传第' + (i + 1) + '/' + this.images.length + '张';
							let result = await this.$utils.uploadFile(this.images[i], loadingTitle);
							let data = JSON.parse(result.data);
							this.submitUrl.push({
								url:data.data.url,
								type:'img'
							});
						}
						this.submitFn()
					}
				}
			},
			submitFn() {
				uni.showLoading()
				this.$fly.post(this.$api.publishSeeding,{
					content:this.seedingReason,
					up_data:JSON.stringify(this.submitUrl),
					topid_ids:this.topicId,
					goods_ids:this.relateIds.join(',')
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:res.msg || '发布成功',
						icon:'success',
						duration:1500
					})
					wx.navigateBack()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			removeRelate(goods_id){
				this.relateIds.forEach((item,index)=>{
					if(item==goods_id){
						this.relateIds.splice(index,1)
					}
				})
				this.relateList.forEach((item,index)=>{
					if(item.goods_id==goods_id){
						this.relateList.splice(index,1)
					}
				})
			},
			handleToSearchRelate() {
				console.log('去搜索商品关联')
			},
			handleToShoppingCarRelate() {
				wx.navigateTo({
					url: "./shoppingCarRelate",
					success:res=>{
						this.hideRelatePopup()
						res.eventChannel.emit('relateInfo',{
							relateIds:this.relateIds,
							relateList:this.relateList
						})
					}
				})
			},
			handleToBoughtRelate() {
				wx.navigateTo({
					url: "./boughtRelate",
					success:res=>{
						this.hideRelatePopup()
						res.eventChannel.emit('relateInfo',{
							relateIds:this.relateIds,
							relateList:this.relateList
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}
.release{
	padding-bottom: 170rpx;
	.line{
		width:750rpx;
		height:20rpx;
		background:rgba(243,243,243,1);
	}
	.reason{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		padding: 30rpx 20rpx;
		textarea{
			width: 100%;
		}
	}
	.upload{
		width: 100%;
		padding: 0 10rpx 0 20rpx;
		display: flex;
		flex-wrap: wrap;
		.video{
			width:230rpx;
			height:230rpx;
			position: relative;
			video{
				width:100%;
				height:100%;
			}
			.delete{
				width:40rpx;
				height:40rpx;
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				image{
					width:100%;
					height:100%;
				}
			}
		}
		.image{
			width:230rpx;
			height:230rpx;
			position: relative;
			margin-bottom: 10rpx;
			margin-right: 10rpx;
			>image{
				width:100%;
				height:100%;
			}
			.delete{
				width:40rpx;
				height:40rpx;
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				image{
					width:100%;
					height:100%;
				}
			}
		}
		.btn{
			width:230rpx;
			height:230rpx;
			image{
				width:230rpx;
				height:230rpx;
			}
		}
	}
	.choose{
		padding: 30rpx 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		flex-direction: column;
		image{
			width: 50rpx;
			height: 50rpx;
		}
		text{
			height:24rpx;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:24rpx;
		}
		.theme{
			display: flex;
			&_box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height:60rpx;
				background:rgba(245,247,250,1);
				border-radius:30rpx;
				padding: 0 20rpx 0 5rpx;
				text{
					margin-left: 10rpx;
				}
			}
		}
		.relate{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width:274rpx;
			height:60rpx;
			background:rgba(245,247,250,1);
			border-radius:30rpx;
			padding: 0 20rpx 0 5rpx;
		}
	}
	.release{
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 30rpx;
		background-color: #fff;
		>view{
			width:690rpx;
			height:80rpx;
			background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
			border-radius:40rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:80rpx;
			text-align: center;
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
	.theme_list{
		padding: 40rpx 30rpx 0 30rpx;
		&_item{
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			text{
				margin-left: 20rpx;
				height:30rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:30rpx;
				&.active{
					color: #F74C55;
				}
			}
		}
	}
	.theme_btn{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 30rpx;
		>view{
			width:690rpx;
			height:80rpx;
			background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
			border-radius:40rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:80rpx;
			text-align: center;
		}
	}

	.relate_title{
		padding-top: 50rpx;
		height:80rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:30rpx;
		text-align: center;
	}
	.relate_list{
		padding: 40rpx 55rpx 50rpx 55rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&_item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.bg{
				width: 200rpx;
				height: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 120rpx;
					height: 120rpx;
				}
			}
			.name{
				margin-top: 8rpx;
				width:200rpx;
				height:60rpx;
				background:rgba(248,248,248,1);
				border-radius:8rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:60rpx;
				text-align: center;
			}
			
			&:nth-child(1){
				.bg{
					background-color: #FFF3E1;
				}
			}
			&:nth-child(2){
				.bg{
					background-color: #F5E1FF;
				}
			}
			&:nth-child(3){
				.bg{
					background-color: #FFE1E1;
				}
			}
		}
	}

	.relates{
		padding: 0 20rpx 0 20rpx;
		.item {
			margin-top: 30rpx;
			width: 690rpx;
			height: 100rpx;
			padding: 10rpx;
			background: rgba(248, 248, 248, 1);
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
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
					width: 580rpx;
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
			.remove{
				width: 33rpx;
				height: 32rpx;
				position: absolute;
				top: -12rpx;
				right: -8rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
