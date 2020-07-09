<template>
  <div class="logisticsContainer">
    <div class="logisticsHeader">
      <div class="logisticsText">物流单号：{{logistics.nu? logistics.nu :'暂无'}}</div>
      <div class="logisticsText">物流公司：{{logistics.com ? logistics.com :'暂无'}}</div>
    </div>
    <div class="logisticsProgress">
      <block v-if="logistics.data && logistics.data.length > 0">
        <div class="time-line">  
            <div class="time-line-item" v-for="(item,index) in logistics.data" :key="index">
              <div class="time-line-dot " :class="{'active' : index == 0}"></div>
              <div class="time-line-con">
                {{item.context}}
              </div>
              <div class="time-line-time">
                {{item.ftime}}
              </div>
              <div class="line" v-if="index != (logistics.data.length - 1)" ></div>
            </div>
        </div>
      </block>  
      <block wx:else>
          <div class="no-data">
            暂无物流信息
          </div>
      </block>
    </div>
  </div>
</template>

<script>
  import utils from '../../../utils/index'

  export default {
    name: "logistics",
    components: {},
    data() {
      return {
        logistics: {},
        order_id: ''
      }
    },
    methods: {
      //获取订单信息
      getOrderData() {
        this.loadMore = 2;
        this.$fly.post(this.$api.getLogistics, {
          order_id: this.order_id
        }).then(res => {
          this.logistics = res.data.lastResult
        })
      },
    },
    onLoad(option) {
      this.order_id = option.order_id;
      this.logistics = [];
      this.getOrderData();
    }
  }
</script>

<style lang="scss">
  page {
    background: #F5F5F5;
  }
  .logisticsContainer{
		padding: 20rpx;
    .logisticsHeader{
      color: #fff;
      padding: 37rpx 44rpx;
			margin-bottom: 20rpx;
      font-size: 30rpx;
			 color: #333333;
			 background:rgba(255,255,255,1);
			 border-radius:10rpx;
    }
    .logisticsProgress{
      background: #fff;
			border-radius:10rpx;
    }

    .time-line{
      padding: 50rpx;
      background: #fff;
      .time-line-item{
        padding-left: 50rpx;
        position: relative;
        padding-bottom: 40rpx;
        .time-line-con{
          color: #333333;
          font-size: 30rpx;
          // margin-top: -40rpx;
        }
        .time-line-time{
          color: #999999;
          font-size: 26rpx;
        }
        .time-line-dot{
          position: absolute;
          top: 20rpx;
          left: 0;
          width:12rpx;
          height:12rpx;
          background:#AAAAAA;
          border-radius:50%;
          z-index: 100;
          &.active{
            top: 15rpx;
            left: -3rpx;
            width: 18rpx;
            height: 18rpx;
            background:#AAAAAA;
            border-radius: 50%;
          }
        }
        .line{
          position: absolute;
          left: 5.5rpx;
          width:1rpx;
          top: 20rpx;
          bottom: -20rpx;
          background:#D0D0D0;
        }
      }
    }

    .no-data{
      padding: 50rpx;
      text-align: center;
      color: #999;
    }
  }
</style>
