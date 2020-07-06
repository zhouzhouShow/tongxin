<template>
  <div :class="itemtype=='fenhuo'?'fenhuo_container':'goodscomponent-item-container'" @click="toGoodsDetail(item)">
		<block v-if="itemtype !='fenhuo'">
			<div class="goodscomponent-item-img">
				<img class="pic-url" mode="aspectFill" :lazy-load="true" :src="item.pic_urls[0]">
				<img v-if="hasVideo" class="video-icon" mode="aspectFill" :lazy-load="true" src="../static/images/play-btn.png">
				<!-- <div v-if="(iteitemtypemtype=='miaosha'||itemtype=='limit')&&item.stocksnum==0" class="saleout-img"> -->
				<!-- 秒杀和限时特惠 已抢光 -->
				<div v-if="item.stocksnum==0&&(itemtype=='limit'||itemtype=='miaosha'||itemtype=='activity')" class="saleout-img">
					<img src="../static/images/saleout.png">
				</div>
				<div v-else-if="item.stocksnum==0" class="saleout-img">
					<img src="../static/images/saleout1.png">
				</div>
				<div v-if="deadline&&itemtype=='limit'" class="limit-time">
					{{ formateDeadline }}
				</div>
			</div>
			<div class="goodscomponent-item-text-container">
				<div class="goodscomponent-item-title ">{{item.title}}</div>
				<div class="price-container">
					<div class="current-price">
						<span class="tag">钻石会员</span>
						
						<span><span class="current-price-text"> ￥</span>{{onePrice}}</span>
						
						<!-- <span class="current-price-text">.{{detail.fen}}</span> -->
					</div>
					<div class="prev-price"><span>吊牌价: ￥{{item.price_market}}</span></div>
				</div>
				<div class="goodscomponent-item-info">
					<!-- <div v-if="itemtype!='limit'" class="goodscomponent-item-code">{{item.code}}</div> -->
					<div v-if="itemtype=='limit'" class="prev-price"><span>原价￥{{item.price_market}}</span></div>
					<div v-if="itemtype=='miaosha'" @click="qianggouEvent" class="qianggou-btn">抢购</div>
					<!-- <div v-else class="love-number-container">
						<div class="heart-img">
							<img src="@/static/images/icon/heart.png">
						</div>
						<div class="love-number">{{item.viewnum}}</div>
					</div> -->
				</div>
			</div>
		</block>
		<blcok v-else>
			<div class="item"  >
				<p class="title">{{item.title}}</p>
				<div class="good-box">
					<image  class="good-img" :src="item.pic_urls[0]" mode=""></image>
					<div class="info">
						<p class="price">
							<span class="level-name">钻石会员</span>
							<span class="price-icon">¥</span>
							<span class="price-num">{{getOnePrice(item.preferPrice,vipDiscounts)}}</span>
						</p>
						<p class="tag">
							<span>品牌：{{item.brand_name}}</span>
							<span>季节：{{item.seasion_name}}</span>
						</p>
						<p class="tag">
							<span>风格：{{item.style_name}}</span>
							<span>产地：{{item.area_name}}</span>
						</p>
						<div class="segment-list">
							<span class="tip-span">码段:</span>
							
							<div class="list-size">
								<!-- <span class='spanActive'>100-105</span> -->
								<span v-for="(item2,index2) in item.stockarr.sizearr" :key="index2">{{item2.size}}</span>
							</div>
						</div>
						<div class="segment-list" >
							<span class="tip-span">件数:</span>
							<div class="list" @click.stop="">
								<!-- <span class='spanActive'>100-105</span> -->
								<span @click.stop='changColor(index2,item,item2.color)' :class="item.colorChooseIndex==index2?'spanActive': ''" v-for="(item2,index2) in item.stockarr.colorarr" :key="index2">{{item2.color+'件/份'}}</span>
							</div>
						</div>
						<div class="desc"  @click.stop="ellipsis(index)">
							<span class="tips">比例: </span>
							<p class="desc-text" :class="!item.descShow?'descShow':''">{{item.kind_ratio}}</p>
							<image :src="item.descShow?'../static/images/icon/arrow-top-active.png':'../static/images/icon/arrow-bottom-active.png'" class="btn-show" mode=""></image>
						</div>
					</div>
				</div>
			</div>
		</blcok>
  </div>
</template>

<script>

export default {
  name: "goodsItem",
  props: {
    item:{
      type:Object,
      default(){
        return {}
      },
    },
		hasVideo:{
			type:Boolean,
			default:false
		},
    itemtype:{
      type:String,
      default:'default',
    },
		myIndex:{
			type:Number,
			default:0,
		}
  },
  computed: {
    formateDeadline() {
      let leftTime = this.deadline * 1000; //计算剩余的毫秒数
      let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
      let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
      let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
      days = this.checkTime(days);
      hours = this.checkTime(hours);
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds);
      return days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
    },
    goodsType(){
      if(this.item.goods_type==1){
        return '捆';
      }else if(this.item.goods_type==2){
        return '包';
      }else{
        return '';
      }
    },
    onePrice(){
      if(this.detail.price_sale){
        return Number(Number((this.detail.price_sale/this.detail.sku_num)*this.diamondVip/100).toFixed(1)).toFixed(2) //价格 / 一手件 * 钻石折扣 / 100
      }
    },
		vipDiscounts(){
			return this.$store.state.vipDiscounts/100
		},
     diamondVip(){
        // console.log('折扣',this.$store.state.vipDiscounts)
        return this.$store.state.vipDiscounts
      }
  },
  data () {
    return {
      detail:{},
      deadline: this.$props.item.limit_deadline,
    }
  },
  methods: {
		ellipsis(){
			this.$emit('fhChangeEllipsis',this.myIndex)
		},
		changColor(index2,item,num){
			this.$emit('fhChangeColor',this.myIndex,index2,item,num)
		},
		// 份货方法
		getOnePrice(val,v){
			return (val*v).toFixed(2)
		},
		// 挑款方法
    checkTime(number) { //将0-9的数字前面加上0，例1变为01
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    },
    /* 抢购事件 */
    qianggouEvent(){
      // this.$emit('qianggouEvent')
      console.log('qianggouEvent')
    },
    /* 商品详情跳转 */
    toGoodsDetail(item){
      var id=item.id||"";
      var sku=item.sku||"";
      uni.navigateTo({
        url:'/pages/good/goodDetail?id='+id+'&sku='+sku,
      })
    },
    /* 分割元和分 */
    separateNumber(){
      this.detail = JSON.parse(JSON.stringify(this.item));
      var price = this.detail.price_limit ? this.detail.price_limit : this.detail.price_sale/this.detail.sun_num;
      if(price){
        var tempstr=price.split(".");
        this.$set(this.detail,'yuan',tempstr[0])
        this.$set(this.detail,'fen',tempstr[1])
      }
      /* if(typeof this.item.price_limit=='string'){
        var tempstr=this.item.price_limit.split(".");
        this.item.price_limit={};
        this.item.price_limit.yuan=tempstr[0];
        this.item.price_limit.fen=tempstr[1];
        // this.$set(this.item.price_limit,'yuan',tempstr[0])
        // this.$set(this.item.price_limit,'fen',tempstr[1])
      }else if(typeof this.item.price_sale=='string'){
        var tempstr=this.item.price_sale.split(".");
        this.item.price_sale={};
        this.item.price_sale.yuan=tempstr[0];
        this.item.price_sale.fen=tempstr[1];
        // this.$set(this.item.price_sale,'yuan',tempstr[0])
        // this.$set(this.item.price_sale,'fen',tempstr[1])
      } */
    }
  },
  mounted(){
    this.separateNumber();
    /* 倒计时 */
    if (this.deadline) {
      this.timer = setInterval(() => {
        this.deadline = this.deadline - 1
        if (this.deadline <= 0) {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.goodscomponent-item-container{
  width:342rpx;
  height:500rpx;
  background:#FFFFFF;
  border:1px solid #EBEBEB;
  border-radius:15rpx;
  .goodscomponent-item-img{
    position: relative;
    width:342rpx;
    height:342rpx;
    border-radius: 15rpx 15rpx 0 0;
    .pic-url{
      width:342rpx;
      height:342rpx;
      border-radius: 15rpx 15rpx 0 0;
      display: block;
    }
		.video-icon{
			position: absolute;
			bottom: 10rpx;
			right:10rpx;
			width:80rpx;
			height: 80rpx;
		}
    .saleout-img{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 15rpx 15rpx 0 0;
      position: absolute;
      z-index: 2;
      background:#A0A0A0;
      opacity:0.57;
      top: 0;
      img{
        width:185rpx;
        height:185rpx;
        border-radius:50%;
        background:#515151;
        opacity:1;
      }
    }
    .limit-time {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      line-height: rpx(40);
      font-size: rpx(24);
      background: rgba(0, 0, 0, .25);
      text-align: center;
      color: #fff;
    }
  }
  .goodscomponent-item-text-container{
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 20rpx 0;
    margin-top:30rpx;
    .goodscomponent-item-title{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size:26rpx;
      font-weight:400;
      color:#3F3F3F;
      height: rpx(40);
      line-height: rpx(35);
    }
    .price-container{
      // display: flex;
      // flex-direction: row;
      // align-items: center;
      .current-price{
        font-size:30rpx;
        font-weight:500;
        color:#FF0000;
        .tag{
          font-size: rpx(24);
          border-radius: 10rpx;
          background: #FE0400;
          display: inline-block;
          text-align: center;
          padding:4rpx 10rpx;
          color: #fff;
        }
        padding-right: 12rpx;
        .current-price-text{
          font-size: 20rpx;
        }
      }
      .prev-price{
        font-size:26rpx;
        font-weight:300;
        text-decoration:line-through;
        color:#999;
      }
    }
    .goodscomponent-item-info{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width:100%;
      .prev-price{
        font-size:22rpx;
        font-weight:400;
        text-decoration:line-through;
        color:#BABABA;
      }
      .goodscomponent-item-code{
        font-size:22rpx;
        font-weight:400;
        color:#999999;
      }
      .love-number-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        .heart-img{
          width: 20rpx;
          height: 20rpx;
          padding: 0 5rpx 0 0;
          img{
            width:20rpx;
            height:20rpx;
            display:block;
          }
        }
        .love-number{
          font-size:22rpx;
          font-weight:400;
          color:#BAB9B9;
        }
      }
      .qianggou-btn{
        width:92rpx;
        height:36rpx;
        background:#FF5656;
        border-radius:7rpx;
        font-size:22rpx;
        font-weight:400;
        color:#ffffff;
        line-height: 36rpx;
        text-align: center;
      }
    }
  }
}
.fenhuo_container{
	.item{
			background: #fff;
			padding:30rpx 30rpx 30rpx 20rpx;
			border-radius:16rpx;
			margin-bottom:20rpx;
			.title{
				font-size:28rpx;
				color: #1E1F20;
				margin-bottom:30rpx;
			}
			.good-box{
				display: flex;
				.good-img{
					width:200rpx;
					height:200rpx;
					border-radius:16rpx;
					margin-right:20rpx;
				}
				.info{
					font-size:24rpx;
					font-weight:400;
					color: #666666;
					flex: 1;
					p{
						font-size:24rpx;
						font-weight:400;
						color: #666666;
					}
					.price{
						color: #F23030;
						margin-bottom: 20rpx;
						.level-name{
							display: inline-block;
							text-align: center;
							width:100rpx;
							height:33rpx;
							line-height:33rpx;
							background:rgba(242,48,48,1);
							border-radius:8rpx;
							font-size:22rpx;
							font-weight:400;
							color: #fff;
							margin-right:10rpx;
						}
						.price-icon{
							font-size: 22rpx;
						}
						.price-num{
							font-size: 30rpx;
						}
					}
					.tag{
						display: flex;
						justify-content: space-between;
						margin-bottom: 20rpx;
					}
					
					.segment-list{
						display: flex;
						flex-direction: row;
						// align-items: center;
						margin-bottom: 10rpx;
						.tip-span{
							width:60rpx;
						}
						.list-size{
							display: flex;
							flex-wrap: wrap;
							flex: 1;
							span{
								color: #333333;
								// width:100rpx;
								padding:0 12rpx;
								text-align: center;
								font-size: 20rpx;
								height:36rpx;
								line-height:36rpx;
								border:1rpx solid rgba(187,187,187,1);
								border-radius:8rpx;
								margin-left:18rpx;
								margin-bottom: 10rpx;
							}
							.spanActive{
								color: #F23030;
								border:1px solid rgba(242,48,48,1);
							}
						}
						.list{
							display: flex;
							flex-wrap: wrap;
							flex: 1;
							span{
								color: #333333;
								// width:100rpx;
								padding:0 10rpx;
								text-align: center;
								font-size: 20rpx;
								height:36rpx;
								line-height:36rpx;
								border:1rpx solid rgba(187,187,187,1);
								border-radius:8rpx;
								margin-left:18rpx;
								margin-bottom: 10rpx;
							}
							.spanActive{
								color: #F23030;
								border:1px solid rgba(242,48,48,1);
							}
						}
					}
					.desc{
						position: relative;
						display: flex;
						.tips{
							margin-right:20rpx;
						}
						.desc-text{
							width:316rpx;
						}
						.descShow{
							white-space: nowrap;
							overflow:hidden;
							text-overflow: ellipsis;
						}
						.btn-show{
							position: absolute;
							top: 14rpx;
							right: 11rpx;
							width:16rpx;
							height:9rpx;
						}
						
						
					}
				}
			}
		}
}

</style>
