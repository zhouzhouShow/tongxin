<template>
	<view class="good-detail" v-if="detail">
		<!-- 轮播图 -->
		<view class="good-swiper-container">
			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 indicator-active-color="#FF0000" class="good-swiper">
				<view>
					<swiper-item class="good-swiper-item" v-if="detail.goods_base.video_url">
						<video class="video-swiper-item" :src="detail.goods_base.video_url"></video>
					</swiper-item>
				</view>
				<view v-for="(item,index) in detail.goods_img" :key="index">
					<swiper-item class="good-swiper-item">
						<img  @click.stop="previewImage(index)" :src="item" class="slide-image" />
					</swiper-item>
				</view>
			</swiper>
		</view>
		<!-- 秒杀 -->
		<view class="sec-kill sec-kill-common" v-if="detail.iskill">
			<view class="sec-kill-title">
				<text>¥</text>
				<text >{{detail.killgood.price}}</text>
				<text >¥{{detail.member_price[0].price}}</text>
				<image class="zhuan-icon" src="../../static/images/index/zhuan.png" mode=""></image>
				<text class="zhuan">¥13.6</text>
			</view>
			<view class="sec-kill-con">
				<block v-if="detail.iskill && detail.killgood.isdoing">
					<view class="sec-kill-text" style="line-height: 1;margin-bottom: 10rpx;"><text>距结束</text></view>
					<view class="flex-box">
						<view class="sec-kill-time"><text>{{formateDeadline.hours}}</text></view>
						<view class="sec-kill-text"><text>:</text></view>
						<view class="sec-kill-time"><text>{{formateDeadline.minutes}}</text></view>
						<view class="sec-kill-text"><text>:</text></view>
						<view class="sec-kill-time"><text>{{formateDeadline.seconds}}</text></view>
					</view>
				</block>
				<block v-else>
					<view class="sec-kill-text" style="padding-right:32rpx;">即将开抢,敬请期待!</view>
				</block>
			</view>
		</view>
		<view class="good-name-box">
			<view class="good-name clamp-two">
				【巴拉巴拉】草莓短袖女童连衣裙宝宝夏装纯棉背心裙2020新款儿童童装仔上衣仔上衣仔上衣仔上衣裙… 仔上衣
			</view>
			<view class="like-box">
				<image class="like" src="../../static/images/icon/icon_clear.png" mode=""></image>
				<text>2000</text>
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
						<image src="../../static/images/icon/icon_clear.png" mode=""></image>
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
			<view class="row-box">
				<text class="label">选择</text>
				<text class="text">支持7请选择颜色尺码</text>
				<text class="iconfont iconyoujiantou" ></text>
			</view>
			<view class="row-box setMargin">
				<text class="label">参数</text>
				<text class="text">支持7品牌 适用年龄</text>
				<text class="iconfont iconyoujiantou" ></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					goods_base: '',
					goods_img: [
						'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
						'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg'
					]
				}
			};
		},
		onLoad(){
			let a ={"status":1,"msg":"\u83b7\u53d6\u6210\u529f","data":{"goods_img":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200616\/9700375b1229b042803ae80042376f61.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200616\/1b60c1c8682d7254e92242096fe5178c.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200616\/cd97ab49dd62dd1a2a7b017a4c09c3b4.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200616\/56b78d7f092c22e89d2608c8ac56b44c.jpg"],"goods_base":{"id":"33030","brand_id":"197","class_id":"545","code":"dbk0616","comment_num":"0","every_pack":"","goods_type":"3","level_limit":"","level_limit_time":"0","price_market":"356.00","price_purchase":"10.00","price_sale":"29.90","price_wholesale":"0.00","salenum":"11123","shelves":"2","title":"\u8fea\u8d1d\u514b\u4e28\u4f11\u95f2\u65f6\u5c1a\u79cb\u5b63\u7cfb\u5217\u7ae5\u88c580-104,100-140","top_tpl":"0","bottom_tpl":"0","video_url":"","viewnum":"1467","wholesale_num":"1","is_free_shipping":"0","weight":"0.10","ext_attr":null,"kind_ratio":"\u88e4\u5b5031%\uff0c\u4e0a\u886364%\uff0c\u5916\u59575%","year_area_id":"30","child_gender_id":"3","brand_area_id":"45","brand_material_id":"25","season_id":"3","style":"10"},"goods_detail":"<p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/9700375b1229b042803ae80042376f61.jpg\" data-filename=\"filename\" style=\"width: 600px;\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/1b60c1c8682d7254e92242096fe5178c.jpg\" data-filename=\"filename\" style=\"width: 600px;\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/cd97ab49dd62dd1a2a7b017a4c09c3b4.jpg\" data-filename=\"filename\" style=\"width: 600px;\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/56b78d7f092c22e89d2608c8ac56b44c.jpg\" data-filename=\"filename\" style=\"width: 600px;\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/e305d3b844b7ffcbd5c0f661a7a9fd96.jpg\" style=\"width: 600px;\" data-filename=\"filename\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/5d503baecfb6ab92c73698286d9a394d.jpg\" style=\"width: 600px;\" data-filename=\"filename\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/6d564d4203a243adcba5862a9b6fe187.jpg\" data-filename=\"filename\" style=\"width: 600px;\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/66b780f5d83d2345f7740c5c7410402b.jpg\" data-filename=\"filename\" style=\"width: 600px;\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/3e1207d57665484389fb4fc5bff07159.jpg\" style=\"width: 600px;\" data-filename=\"filename\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/6a0994307bc5d0a954f87b734b61c03c.jpg\" style=\"width: 600px;\" data-filename=\"filename\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/bd3ef67bb8fd728bb7b310e1fc9fe21a.jpg\" style=\"width: 600px;\" data-filename=\"filename\"><\/p><p><br><\/p><p><img src=\" http:\/\/img.yoyoxp.com\/uploads\/20200616\/dfcda2abcbabf076215d81c6b54353d1.jpg\" style=\"width: 600px;\" data-filename=\"filename\"><\/p><p> <\/p>         ","goods_style":"\u4f11\u95f2","member_price":[{"level_name":"\u767d\u94f6\u4f1a\u5458","level":"7","price":29.9,"rate":"100"},{"level_name":"\u9ec4\u91d1\u4f1a\u5458","level":"10","price":29.3,"rate":"98"},{"level_name":"\u94c2\u91d1\u4f1a\u5458","level":"11","price":28.41,"rate":"95"},{"level_name":"\u94bb\u77f3\u4f1a\u5458","level":"12","price":26.91,"rate":"90"}],"seasion_name":"\u79cb","brand_name":"\u8fea\u8d1d\u514b","brand_info":{"id":"197","brand_name":"\u8fea\u8d1d\u514b","goods_class_id":"50","brand_logo":"","brand_description":"","sort":"0","recommend":"0","create_time":"1592297307","update_time":"1592460973","letter":"","brand_banner":"","video_url":"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200618\/42b45bcf2a22740587419fad47f2fbd9.mp4","video_description":"","status":"0","path":null},"brand_area":"\u5c71\u4e1c","brand_material":"\u68c9","is_like":0,"is_collect":0,"iskill":1,"killgood":{"id":"2785","main_id":"1329","goods_id":"33030","price":"8.80","time_slot":"09:00","start_time":"1593997200","end_time":"1594051199","goods_type":"3","stock":"600","sale_num":"300","type":"1","limitnum":"0","deadline":23187,"isdoing":1},"lastmoney":29.3,"level_name":"\u9ec4\u91d1\u4f1a\u5458","level_id":"10"}}
			this.detail = a.data
		},
	}
</script>

<style lang="scss" scoped>
	.good-detail {
		background: #f3f3f3;
	}

	.good-swiper-container {
		background: #fff;

		.good-swiper {
			width: 100%;
			height: 650rpx;
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
	.support{
		
	}
	.color-box{
	
	}
	.setMargin{
		margin-top: 47rpx;
	}
	.row-box{
		display: flex;
		font-size:28rpx;
		font-weight:400;
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
	
			.sec-kill-text,
			.sec-kill-time {
				text {
					color: #FB120F;
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
</style>
