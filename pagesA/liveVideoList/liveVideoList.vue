<template>
	<div class="liveVideo" :style="{height: started?'': height }" :class="started?'SetH':''">
		<image class="topBg" src="https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200724/486995dd5e91b0c652046954dbfc9f64.png" mode=""></image>
		<div class="setPadd">
			<!-- <div class="container"> -->
			<div class="liveInfo" v-if = "liveInfo">
				<div class="poster">
					<image class="anchorImg" @click="previewDetailImg(1,liveInfo.share_img)" :src="liveInfo.share_img" alt=""></image>
					<p class="timeBox">
						<image class="timeIcon"  src="../../static/images/liveVideo/time.png" mode="aspectFill"></image>
						<block v-if="isEnd">
							距离开播还剩：-- : -- : --
						</block>
						<block v-else>
							距离开播还剩：{{timeData.day+'天'+timeData.hours+'时'+timeData.minutes+'分'+timeData.seconds+'秒'}}							
						</block>
					</p>
				</div>
				<div class="anchorInfoBox">
					<p class="roomName">{{liveInfo.name ? liveInfo.name : '暂无主播在直播' }}</p>
					<div class="anchorInfo">
						<p class="left"><image src="../../static/images/liveVideo/anchorIcon.png" mode=""></image><span>主播: {{liveInfo.anchor_name}}</span></p>
						<!-- <p class="right" style="display: none;">{{customTime ? customTime : '--'}}</p> -->
					</div>
					<div class="anchorInfo2">
						<p class="left"><image src="../../static/images/liveVideo/time2.png" mode=""></image><span>时间: {{startTimeStr +' - '+ endTimeStr}}</span></p>
					</div>
				</div>
			</div>
			<div class="distBox">
				<div class="titleBox">
					<p class="tips">直播简介</p>
				</div>
				<div class="dist">
					{{custom_desc}}                          
				</div>
			</div>
			
			<div class="joinIn" @click="toRoom()">进入直播</div>
				<!--  started : //是否开始直播了或者直播结束了,显示本次商品出来-->
			<div class="liveGood"  v-if="started"> 
				<div class="titleBox">
					<p class="tips">直播产品</p>
					<p class="num">今日直播产品: {{liveInfo.goods.length}}件</p>
				</div>
				<div class="goodList" v-if="liveInfo.goods.length">
					<block v-for="(item,index) in liveInfo.goods"  :key="index" >
						<!--  v-if="index<3||showAll" -->
					<div class="brand-scroll-item" :class="index<3||showAll?'show':'hide'" @click='toDetail(item.url)'>
					  <div class="b-i-img">
					    <img :src="item.cover_img"  mode='aspectFill' alt="">
					  </div>
					  <div class="b-i-text">
					    <div class="b-i-title clamp">{{item.name }}</div>
					    <div class="b-i-price">
					      <div class="good-price" style="display: inline-block;">
					     ¥ {{item.price/100}}
					        <!-- <span class="tag">钻石会员</span> -->
					        <!-- ¥ <oneGoodPrice :totalPrice='items.price_sale' :skuNum='items.sku_num' :isVipDiscount='true'></oneGoodPrice> -->
					      </div>
					      <!-- <div class="old-price">吊牌价: ¥{{items.price_market}}</div> -->
					    </div>
					  </div>
					</div>
					</block>
				</div>
			
				<div class="noData" v-else>
					亲,本次直播没有商品哦!
				</div>
				<!-- &&!showAll -->
				<div class="moreBtn" @click="showAllGood" v-if="liveInfo.goods.length>3">{{showAll?'收起列表':'展开全部'}}</div>
			</div>
				<!-- <button @click="toHistory">历史直播</button> -->
				<!-- <button @click="toRoom(3)">前往直播</button> -->
			<!-- </div> -->
			<!-- <load-more :loadMore="loadMore"></load-more> -->
		</div>
	</div>
</template>


<script>
	import utils from "../../utils/index";
	// import loadMore from '../../components/loadMore';  //1上拉加载更多 2正在加载 3我们是有底线的
	export default {
		components:{
		},
		data() {
			return {
				start: 0, // 起始拉取房间，start = 0 表示从第 1 个房间开始拉取
				limit: 1, // 每次拉取的个数上限，不要设置过大，建议 100 以内
				loadMore: 1,
				liveInfo: null,
				startTime:0,
				startTimeStr:'',
				endTimeStr:'',
				endTime:0,
				timer:null,
				customTime:'',
				custom_desc:'',
				timeData:{
					day:0,
					hours:0,
					minutes:0,
					seconds:0,
				},
				height:0,
				started:false, //是否开始直播了或者直播结束了,显示本次商品出来
				isEnd:true, //是否结束了
				showAll:false //是否显示全部
			}
		},
		methods: {
			toRoom() {
				let roomId = this.liveInfo.roomid // 房间号
				let customParams = {
					path: 'pagesA/liveVideo/liveVideo',
					pid: 10
				} // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节
				wx.navigateTo({
					url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
				})
			},
			async getLiveInfo() {
				let params = {
					start:this.start,
					limit:this.limit
				}
				let data = await this.$fly.post(this.$api.getliveinfo)
				return data
			},
			toHistory(){
				uni.navigateTo({
					url:'/pagesA/historyList/historyList'
				})
			},
			toDetail(url){				
				console.log(url)
				wx.navigateTo({
					url:'/'+url
				})
			},
			getTimeStr(fmt, date){
				date = new Date(date*1000)
				let ret;
				const opt = {
						"Y+": date.getFullYear().toString(),        // 年
						"m+": (date.getMonth() + 1).toString(),     // 月
						"d+": date.getDate().toString(),            // 日
						"H+": date.getHours().toString(),           // 时
						"M+": date.getMinutes().toString(),         // 分
						"S+": date.getSeconds().toString()          // 秒
						// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
						ret = new RegExp("(" + k + ")").exec(fmt);
						// console.log(ret)
						if (ret) {
							
								fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
								
						};
				};
				// console.log(fmt)
				return fmt;
			},
			getCountDown(time) {
			      // 对传入的时间戳进行格式化 D Hh:Mm:Ss
				let nowTime = new Date().getTime() / 1000;
				let leftTime = time - nowTime;
				let defalutKey = 60 * 60 * 24  //一天的秒数
				// console.log(leftTime)
				// 如果已过期 则清空定时器 并返回已过期信息
				if (leftTime <= 0) {
					clearInterval(this.timer);
					this.timer = null;
					this.isEnd = true
					this.started = true //开始直播了,显示商品列表
					return "时间到了";
				}else{
					this.isEnd = false
					this.started = false //开始直播了,显示商品列表
				}
				let day = parseInt(leftTime / defalutKey % 31  )
				let hours = parseInt((leftTime % defalutKey) / (60 * 60))
				let minutes = parseInt((leftTime % (60 * 60)) / 60);
				let seconds = parseInt(leftTime % 60);
				// hours = hours >= 10 ? hours : "0" + hours;
				// minutes = minutes >= 10 ? minutes : "0" + minutes;
				// seconds = seconds >= 10 ? seconds : "0" + seconds;
	
				let data ={
					day,
					hours,
					minutes,
					seconds
				}
				this.timeData = data
				// return `${years>0 ? years+' 年 ' : '' }${months>0 ? months+' 月 ' : '' }${days>0 ? days+' 日 ' : ''}${hours} 时 ${minutes} 分 ${seconds} 秒`;
			},
			showAllGood(){
				this.showAll = !this.showAll
			},
			previewDetailImg(num,url){
				let list = [url]
				this.$utils.previewImage(list,num)
			},
		},
		async onLoad() {
			uni.getSystemInfo({
				success:(res)=>{
					// console.log(res.windowHeight);
					console.log((res.windowHeight - 98)+'rpx')
					this.height = (res.windowHeight - 49)+'px'
				}
			})
			this.$tip.loading() 
			let data = await this.getLiveInfo()
			if(data.code){
				this.liveInfo = data.data.room_info[0]
				this.startTime = this.liveInfo.start_time
				this.endTime = this.liveInfo.end_time
				this.customTime = data.data.custom_time
				this.custom_desc = data.data.custom_desc
				this.startTimeStr = this.getTimeStr('m月d日 HH:MM',this.startTime)
				this.endTimeStr = this.getTimeStr('m月d日 HH:MM',this.endTime)
				clearInterval(this.timer); // 清空定时器
				this.timer = setInterval(() => {
					// 绑定定时器到实例山
					// time--;
					this.getCountDown(this.startTime); 
				}, 1000);
			}
			
			this.$tip.loaded()
		},
		
	}
</script>

<style lang="scss">
	$themeColor:#505588;
	$font-color-base: #1E1F20;
	
	.distBox{
		padding: 20rpx 20rpx 45rpx;
		background: #fff;
		box-shadow:0px 13rpx 20rpx 0rpx rgba(227,227,227,0.24);
		border-radius:12rpx;
		// margin-bottom: 20rpx;
		.titleBox{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 35rpx;
			.tips{
				position: relative;
				color: #333;
			}
			.tips:after{
				content: '';
				position: absolute;
				bottom:-8rpx;
				left:50%;
				margin-left:-27rpx;
				width:54rpx;
				height:6rpx;
				background:#F62A8A;
				border-radius:3rpx;
			}
		}
	}
	
	page{
		width:100%;
		height: 100%;
		background: #F3F3F3;
	}
	.SetH{
		min-height: 100%;
	}
	.liveVideo{
		// min-height: 100%;
		// background-image:url(../../static/images/liveVideo/live_bg.png);
		// background-size:100% 100%;
		// background-repeat:no-repeat; 
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		margin-bottom: 98rpx;
		position: relative;
	}
	.topBg{
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height: 300rpx;
		image{
			width:100%;
			height: 100%;
		}
	}
	.setPadd{
		padding: 40rpx 30rpx 30rpx 30rpx;
		// background: #F5F2F5
	}
	.liveInfo{
		height:640rpx;
		border-radius:12rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		background: #fff;
		.poster{
			width:100%;
			height:388rpx;
			position: relative;
			.anchorImg{
				width:100%;
				height: 100%;
			}
			.timeBox{
				width: 100%;
				position:absolute ;
				bottom: 0;
				height:74rpx;
				line-height:74rpx;
				background:#910627;
				color: #fff;
				display: flex;
				align-items: center;
				.timeIcon{
						width: 33rpx;
						height: 39rpx;
						margin:0 27rpx 0 31rpx;
				}
			}
		}
		.anchorInfoBox{
			width:631rpx;
			margin:40rpx auto 0;
			padding-bottom:30rpx;
			// border-bottom: 1rpx solid #F3F3F3;
			
		}
		.roomName{
			width:100%;
			margin-bottom: 30rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			
		}
		.anchorInfo{
			width:100%;
			display: flex;
			align-items: center;
			line-height: 1;
			justify-content: space-between;
			color: #666;
			margin-bottom:26rpx;
			.left{
				display: flex;
				align-items:center;
				padding-left: 6rpx;
				image{
					width: 46rpx;
					height: 36rpx;
					margin-right:26rpx;
				}
			}
		}
		.anchorInfo2{
			width:100%;
			display: flex;
			align-items: center;
			line-height: 1;
			justify-content: space-between;
			color: #666;
			.left{
				display: flex;
				align-items:center;
				padding-left: 6rpx;
				image{
					width: 43rpx;
					height:43rpx;
					margin-right:31rpx;
				}
			}
		}
		
	}
	.joinIn{
		width:274rpx;
		height:88rpx;
		line-height: 88rpx;
		margin:45rpx auto 34rpx;
		background:linear-gradient(141deg,rgba(252,56,67,1),rgba(246,42,138,1));
		box-shadow:0px 6rpx 8rpx 0px rgba(255,93,36,0.24);
		border-radius:44rpx;
		color: #fff;
		text-align: center;
	}
	.liveGood{
		padding: 20rpx;
		background: #fff;
		box-shadow:0px 13rpx 20rpx 0rpx rgba(227,227,227,0.24);
		border-radius:12rpx;
		.titleBox{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40rpx;
			.tips{
				position: relative;
				color: #333;
			}
			.tips:after{
				content: '';
				position: absolute;
				bottom:-8rpx;
				left:50%;
				margin-left:-27rpx;
				width:54rpx;
				height:6rpx;
				background:#F62A8A;
				border-radius:3rpx;
			}
			.num{
				font-size: 28rpx;
			}
		}
	}
	.goodList{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goodList::after{
		content: '';
		width: 210rpx;
		height: 0;
		margin-bottom:20rpx;
	}
	.hide{	
		height: 0rpx !important;
		opacity: 0 !important;
		margin-bottom:0 !important;
		display: none !important;
		.b-i-img{
			height: 0rpx !important;
		}
		
	}
	.show{
		height: 324rpx !important;
		opacity: 1 !important;
		margin-bottom:20rpx !important;
		display: inline-block !important;
		.b-i-img{
			height: 222rpx !important;			
		}
	}
	.brand-scroll-item {
		width: 210rpx;
		// height: 100%;
		height: 324rpx ;
		opacity: 1;
		transition: all .5s;
		margin-bottom:20rpx;
		// margin-right:23rpx;
		display: inline-block;
	
		.b-i-img {
			width:200rpx;
			height:222rpx;
			border-radius:10rpx;
			margin-bottom: 15rpx;
			overflow: hidden;
	     img{
	      width:100%;
	      height:100%;
	    }
		}
	
		.b-i-text {
			.b-i-title {
				font-size: 26rpx;
				color: $font-color-base;
				margin-bottom: 12rpx;
	      text-overflow: ellipsis;
	      overflow: hidden;
	      white-space: nowrap;
			}
	
			.b-i-price {
	      // display: flex;
	      // justify-content: space-between;
	      // align-items: center;
	      .old-price{
	        font-size:24rpx;
	        color:#999;
	        font-weight:300;
	        text-decoration: line-through;
	      }
	      .good-price{
	        font-size:26rpx;
	        color: #F23030;
	        font-weight:500;
	      }
	      .tag{
	          font-size: rpx(24);
	          border-radius: 10rpx;
	          background: #FE0400;
	          display: inline-block;
	          text-align: center;
	          padding:4rpx 10rpx;
						margin-right:10rpx;
	          color: #fff;
	      }
			}
		}
	}
	.moreBtn{
		
		width:142rpx;
		height:52rpx;
		line-height:52rpx;
		margin:0 auto;
		text-align: center;
		font-size:24rpx;
		color:rgba(153,153,153,1);
		border:1rpx solid rgba(204,204,204,1);
		border-radius:8rpx;
		// margin-top:40rpx;
	}
	.noData{
		padding:30rpx;
		text-align: center;
	}
	
	
</style>
