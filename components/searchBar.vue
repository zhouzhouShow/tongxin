<template>
	<view class="search-bar">
		  <view class="search-input-container">
		    <view class="search-icon">
		      <img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/search_2.png">
		    </view>
		    <input @confirm="sureSearch" @input='keyword?showClearBtn=true:showClearBtn=false' type="text" :placeholder='placeholder' v-model="keyword">
		    <view class="clear-icon" v-show="showClearBtn" @click="clearSearchInput">
		      <img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/icon_clear.png">
		    </view>
		  </view>
		  <!-- <view class="search-btn" @click="keyWordSearch">搜索</view> -->
		   
		  <view class="search-btn"  @click="toSearchResult(keyword)">{{btnText}}</view>
		</view>
</template>

<script>
	export default {
		props:['placeholder','btnText','itemKeyWord'],
		data() {
			return {
				showClearBtn:false,
				keyword:'',
			};
		},
		mounted(){
			if(this.itemKeyWord){
				this.keyword = this.itemKeyWord
			}
		},
		methods:{
			sureSearch(){
				this.$emit('sureBtn',this.keyword)
			},
			toSearchResult(){
				if(this.btnText==='取消' || this.btnText==='返回' ){
					wx.navigateBack({})
				}else{
					this.$emit('sureBtn',this.keyword)
				}
			},
			clearSearchInput(){
			  this.keyword='';
			  this.showClearBtn = false;
			},
		},
	}
</script>

<style lang="scss" scoped> 
.search-bar{
  display: flex;
  flex-direction: row;
  // justify-content: center;
  align-items: center;
	padding:12rpx 20rpx 12rpx;
  // margin:12rpx 0 0;
	background: #fff;
	border-bottom:1rpx solid #EEEEEE;
	box-sizing: border-box;
  .search-input-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    width:604rpx;
    height:64rpx;
    background-color: #F0F1F2;
    // border:2rpx solid #FF0000;
    border-radius:31rpx;
    .search-icon{
      width:31rpx;
      height:31rpx;
      flex-grow: 0;
      padding:0 10rpx 0 20rpx;
    }
    input{
      width: 80%;
      // background-color: black;
      font-size: 26rpx;
      color: #333333;
    }
    .clear-icon{
      width:31rpx;
      height:31rpx;
      flex-grow: 0;
      padding:20rpx 20rpx 20rpx 10rpx;
    }
  }
	view.noSelected{
		background: #C9C9C9;
	}
  .search-btn {
    width: 120rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-size:30rpx;
    font-weight:400;
    color: #333333;
    text-align: center;
  }
}
</style>
