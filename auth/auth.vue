<template>
  <div class="authContainer">
    <img src="/static/images/authBj.png" mode="widthFix" alt="">
    <button class='authBtn' open-type="getUserInfo" @getuserinfo="getInfo">
      <span>微信授权登陆</span>
    </button>
  </div>
</template>

<script>

  export default {
    name: "auth",
    data() {
      return {}
    },
    methods: {
      getInfo(e){
        if (e.target.userInfo) {
          this.$fly.post(this.$api.updateUserInfo, {
            wxname: e.target.userInfo.nickName,
            headimg: e.target.userInfo.avatarUrl,
            gender: e.target.userInfo.gender,
            mobile: "",
          }).then(res => {
        
            if( wx.getStorageSync('JumpToPath') && wx.getStorageSync('JumpToPath') != '/pages/index/index' ){
              wx.reLaunch({
                url: wx.getStorageSync('JumpToPath')
              })
            }else{
							setTimeout(()=>{
								uni.hideTabBar({})
								wx.reLaunch({
								  url: '/pages/index/index',
								})
							},200)
             
            }
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .authContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: rpx(70);
    img {
      width: rpx(700);
      height: rpx(463);
    }
    .authBtn {
      position: absolute;
      left: 15%;
      bottom: rpx(100);
      width: 70%;
      height: rpx(78);
      border-radius: rpx(8);
      background: #F36060;
      color: #fff;
      display: flex;
      align-items:center;
      justify-content:center;
      font-size: rpx(34);
    }
  }
</style>
