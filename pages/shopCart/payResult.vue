<template>
  <div class="pay-result-container">
    <div class="pay-result-header">
      <img :src="resultStatus == 1 ? successIcon:failIcon">
      <span class="result-tip">{{resultStatus == 1 ? "支付成功":"支付失败"}}</span>
      <div>
        <span class="back-to-home" @click.stop="backToHome">返回首页</span>
        <span class="check-order" @click.stop="checkOrder">查看订单</span>
      </div>
    </div>
    <div class="pay-result-recommend">
      <div class="recommend-header">
        <img src="@/static/images/recommend-more.png">
      </div>
      <div class="recommend-more-container">
        <block v-for="(product,productIndex) in recommendData" :key="productIndex">
          <div class="recommend-row-container">
            <product :product="product"></product>
          </div>
        </block>
      </div>
      <div class="load-more-container">
        <load-more :load-more="loadMore"></load-more>
      </div>
    </div>
  </div>
</template>

<script>

  import loadMore from "@/components/uni-load-more/uni-load-more";
  import product from "@/components/product";

  export default {
    name: "payResult",

    components: {
      loadMore, product
    },

    data() {
      return {
        resultStatus: 1,
        orderId: 0,
        loadMore: 1,
        recommendPage: 1,
        recommendPageSize: 8,
        recommendData: [{
						pic_urls: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
						stocksnum: 10,
						goods_type: 1,
						price_market: 123,
						code: 123213,
						title: '张阿第三方第大师法撒旦个单方事故第三方三方飞',
						price: '123',
						nub: 123
					},
					{
							pic_urls: 'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200616/56b78d7f092c22e89d2608c8ac56b44c.jpg',
							stocksnum: 10,
							goods_type: 1,
							price_market: 123,
							code: 123213,
							title: '张阿第三方第大师法撒旦个单方事故第三方三方飞',
							price: '123',
							nub: 123
						},
				],
        successIcon: require("@/static/images/pay-success-icon.png"),
        failIcon: require("@/static/images/pay-fail-icon.png")
      };
    },

    methods: {
      async recommendMore() {
        return await this.$fly.post(this.$api.collection, {
            page: this.recommendPage,
            pageSize: this.recommendPageSize,
            type: 2
        });
      },
      backToHome() {
        uni.reLaunch({
        	url: "/pages/index/index",
        })
      },
      checkOrder() {
        uni.redirectTo({
          url: "/pages/shopAndOrder/settlement/orderDetail?order_id="+this.orderId
        });
      }
    },

    async onLoad(option) {
      this.resultStatus = option.status;
      this.orderId = option.order_id;
      var result = await this.recommendMore();
      this.recommendData = this.recommendData.concat(result.data.list);
    },

    async onReachBottom() {

      if (this.loadMore != 3) {
        this.recommendPage++;
        this.loadMore = 2;
        var result = await this.recommendMore();
        if (result.data.list.length > 0) {
          this.recommendData = this.recommendData.concat(result.data.list);
          this.loadMore = 1;
        } else {
          this.loadMore = 3;
        }
      }

    }


  };
</script>

<style lang="scss" scoped>

  page {
    height: 100%;
  }

  .pay-result-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .pay-result-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: rpx(399);
      flex-shrink: 0;
      background: #fff;

      > img {
        width: rpx(95);
        height: rpx(85);
        margin-top: rpx(75);
      }

      .result-tip {
        font-size: rpx(36);
        font-weight: 500;
        color: #333;
        margin-top: rpx(17);
      }

      > div {

        display: flex;
        flex-direction: row;
        width: rpx(475);
        margin-top: rpx(40);
        align-items: flex-start;
        justify-content: space-between;

        .back-to-home {
          display: flex;
          justify-content: center;
          align-items: center;
         width: rpx(150);
         height: rpx(50);
          color: #666;
          font-size: rpx(28);
          font-weight: 400;
          border:1rpx solid rgba(221,221,221,1);
          border-radius:25rpx;
        }

        .check-order {
          display: flex;
          justify-content: center;
          align-items: center;
          width: rpx(150);
          height: rpx(50);
					color: #666;
          font-size: rpx(28);
          font-weight: 400;
          border:1rpx solid rgba(221,221,221,1);
          border-radius:25rpx;
        }
      }

    }

    .pay-result-recommend {
		
      flex-grow: 1;
      background-color: #f3f3f3;

      .recommend-header {
        width: 100%;
        height: rpx(130);
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
          width: rpx(236);
          height: rpx(50);
        }
      }

      .recommend-more-container {
				padding: 0 20rpx;
       display: flex;
       flex-wrap:wrap;
       justify-content: space-between;

        .recommend-row-container {
          width: 345rpx;
          margin-bottom: 28rpx;
          border-radius: 8rpx;
        }

      }
    }

  }

</style>
