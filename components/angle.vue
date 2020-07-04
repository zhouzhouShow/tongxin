<template>
  <view class="angle-number"
       :style="{'background':background,
	   'color':color,
	   'font-size':fontSize,
	   'padding':padding==''?'auto':padding,
	   'height':height==''?'auto':height,
	   'line-height':height==''?'auto':height,
	   'min-width':height==''?'auto':height,
	   'border-radius':borderRadius==''?'auto':borderRadius,
	   }"
       v-show="value">{{value>maxVal?maxVal+'+':value}}
  </view>
</template>

<script>

  export default {
    name: "angle",
    props: {
      value: {
        type: Number,
        default: 0
      },
      background: {
        type: String,
        default: '#FC6667'
      },
      color: {
        type: String,
        default: '#fff'
      },
      fontSize: {
        type: String,
        default: '20rpx'
      },
      maxVal: {
        type: Number,
        default: 99
      },
	  height:{
		  type:String,
		  default:''
	  },
	  padding:{
		 type:String,
		 default:'' 
	  },
	  borderRadius:{
		  type:String,
		  default:'' 
	  }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .angle-number {
    min-width: 24rpx;
    padding:0 6rpx;
    box-sizing: border-box;
    height: 24rpx;
    line-height: 24rpx;
    text-align: center;
    border-radius: 12rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
  }
</style>

