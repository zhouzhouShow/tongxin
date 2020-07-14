<!--产品组件-->
<template>
  <div class="product1-goods-item"
       v-if="product.goods_title"
       @click="goProductDetail()">
    <div class="good-show">
      <img mode="aspectFill" :lazy-load="true" class="good-show-img" v-if="product.goods_images[0]"
           :src="product.goods_images[0]"/>
			<img mode="aspectFill"
			     src="http://fulanpifa.oss-cn-shenzhen.aliyuncs.com/uploads/20180904/7f8cd2124f0a791b1e6626bce0e299d9.gif"
			     v-else>
			<!-- <img v-if="!hasVideo" class="video-icon" mode="aspectFill" :lazy-load="true" src="../static/images/play-btn.png"> -->
     
      <div class="video-icon" v-if="product.video_url">
        <img class="video-play-icon" src="../static/images/play-btn.png" alt="">
      </div>
    </div>
    <div class="good-content">
      <div class="good-desc">
        <div class="good-desc-part1">
					<span class="p-box"><span class="p-icon">¥</span>{{product.price_sale}}</span>
					<span class="mark-price">¥{{product.price_market}}</span>
        </div>
				<div class="like">
					<image src="../static/images/good/d-like.png" mode=""></image>
					{{product.likenum}}
				</div>
      </div>
			<div class="good-title clamp">{{product.goods_title}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'product',
    props: {
      'product': {
        type: Object,
        default() {
          return {}
        }
      },
      "isBargains": {
        type: Boolean,
        default: false
      },
      'isLimit': {
        type: Boolean,
        default: false
      },
      'isClickable': {
        type: Boolean,
        default: true
      },
      'type': {
        type: Number,
        default: 0
      },
			hasVideo:{
				type:Boolean,
				default:false
			}
    },
    data() {
      return {
        deadline: this.$props.product.limit_deadline,
        timer: null,
        yuan: 0,
        fen: '00',
        // isSale:true,
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
      onePrice(){
        if(this.product.price_sale){
          return  Number(Number((this.product.price_sale/this.product.sku_num)*this.diamondVip/100).toFixed(1)).toFixed(2) //价格 / 一手件 * 钻石折扣 / 100
        }
      },
      diamondVip(){
        // console.log('折扣',this.$store.state.vipDiscounts)
        return this.$store.state.vipDiscounts
      }
    },
    methods: {
      checkTime(number) { //将0-9的数字前面加上0，例1变为01
        if (number < 10) {
          number = "0" + number;
        }
        return number;
      },
      goProductDetail() {
        if (this.isClickable) {
          var id = this.product.goods_id;
          var sku = this.product.sku || "";
          wx.navigateTo({
            url: '/pages/good/goodDetail?id='+id+'&sku='+sku,
          })
        }
      },
    },
    mounted() {
      if (this.deadline) {
        this.timer = setInterval(() => {
          this.deadline = this.deadline - 1
          if (this.deadline <= 0) {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      // this.detail = JSON.parse(JSON.stringify(this.product));
      var price = this.product.price_limit ? this.product.price_limit : this.product.price_sale;
      if(price){
        var tempstr = price.split(".");
        this.yuan = tempstr[0];
        this.fen = tempstr[1] ? tempstr[1] : '';
      }
    },
    destroyed() {
      clearInterval(this.timer)
      this.timer = null
    }
  }
</script>

<style lang="scss" scoped>
  .product1-goods-item {
    border-radius: 8rpx;
    overflow: hidden;
    background: #fff;
    position: relative;
    border:1rpx solid #eee;
    padding-bottom:20rpx;
    .good-show {
      /*padding-bottom: 100%;*/
      overflow: hidden;
      position: relative;
			padding:10rpx 10rpx 0;
			.video-icon{
				position: absolute;
				bottom: 10rpx;
				right:10rpx;
				width:80rpx;
				height: 80rpx;
			}
      .good-show-img {
				border-radius:8rpx;
        height: 325rpx;
        width: 325rpx;
        vertical-align: middle;
      }
    }
    .good-tag {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 50;
      width: rpx(84);
      height: rpx(84);
    }
    .saleout {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 49;
      background: rgba(0, 0, 0, .2);
      border-top-left-radius: rpx(10);
      border-top-right-radius: rpx(10);
      display: flex;
      justify-content: center;
      align-items: center;
      .saleout-icon {
        width: rpx(186);
        height: rpx(186);
      }
    }
    .video-icon {
      position: absolute;
      width: rpx(80);
      height: rpx(80);
      right: rpx(12);
      bottom: rpx(10);
      z-index: 41;
      background: rgba(0, 0, 0, .2);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .video-play-icon {
        width: rpx(80);
        height: rpx(80);
      }
    }
    .saleout-img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      background: #A0A0A0;
      opacity: 0.57;
      top: 0;
      img {
        width: rpx(184);
        height: rpx(184);
        border-radius: 50%;
        background: #515151;
        opacity: 1;
      }
    }
    .good-content {
      padding: rpx(8) 20rpx ;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .good-title {
        margin:20rpx 0 0;
        font-size: rpx(26);
        color: #3F3F3F;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 2;
        overflow: hidden;
      }
			.good-desc {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 20rpx 0 0;
			  .good-desc-part1 {
			    display: flex;
			    align-items: center;
			
					font-weight:500;
					color:#999999;
					.p-box{
						color: #F22631;
						font-size:40rpx;
						.p-icon{
							font-size:24rpx;	
						}
					}
					.mark-price{
						margin-left:20rpx;
						font-size:24rpx;
						text-decoration:line-through;
					}
			  }
				.like{
					image{
						width:20rpx;
						height:18rpx;
						margin-right: 5rpx;
					}
					font-size:24rpx;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			  .marketBox {
			    font-size: rpx(22);
			    color: #BABABA;
			    text-decoration: line-through;
			  }
			  
			}
    }
    
  }
</style>
