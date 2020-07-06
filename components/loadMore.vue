<template>
  <div class="loadMoreContainer" :style="'height:'+height+'rpx'">
    <div v-if="loadMore==1" class="stepOne"><span>上拉加载更多~~</span></div>
    <div v-if="loadMore==2" class="stepTwo">
      <van-loading size="16px" type="spinner" color="#B6B6B6"></van-loading>
      <span>正在加载</span>
    </div>
    <div v-if="loadMore==3" class="stepThree">
      <span class="stepLine"></span>
      <span>{{endText}}</span>
      <span class="stepLine"></span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "load-more",
    props: {
      loadMore: {
        type: Number,
        default: 1
      },
      endText: {
        type: String,
        default: '我们是有底线的'
      },
      height: {
        type: String,
        default: '88'
      }
    },
    components: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .loadMoreContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: rpx(88);
    font-size: rpx(28);
    .stepOne {
      display: flex;
      align-content: center;
      justify-content: center;
      color: #B6B6B6;
    }
    .stepTwo {
      color: #B6B6B6;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        margin-left: rpx(8);
      }
    }
    .stepThree {
      color: #B6B6B6;
      display: flex;
      align-items: center;
    }
    .stepLine {
      width: rpx(30);
      height: rpx(2);
      background: #B6B6B6;
      margin: 0 rpx(10);
    }
  }
</style>
