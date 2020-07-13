<template>
 <div class="container">
		<scroll-div scroll-y class="scroll-y">
			<radio-group @change='handleChooseDefault'>
				<div class="address-item" v-for='(item,index) in addressList' :key='index'>
					<div class="address-item-top" @click.stop="chooseAddress(item.id,item.status)"
           :key="item.id">
						<div>{{item.realname}} {{item.mobile}}</div>
						<div>{{item.provName}}{{item.cityName}}{{item.distName}}{{item.address}}</div>
					</div>
					<div class="address-item-bottom">
						<!-- <div > -->
						<div @click='changeDafaultAddress(item)'>
							<label class="radio">
								<radio :value="item.id"  color="#F62A8A" :checked='item.status==1'>默认地址</radio>
							</label>
						</div>
						<div>
            <div class="addressEdit" @click.stop="toeditadress(item.id)">
              <img  src="/static/images/icon/icon_edit.png" alt="">
            </div>
						<div class="delete">
							<img @click='delAddress(item)'  src="../../../static/images/icon/delete_icon.png" mode="">	
						</div>
							<!-- <div class="yticon icon-bianji" @click='handleTo(item)'></div> -->
							<!-- <div class="yticon icon-iconfontshanchu1" ></div> -->
						</div>
					</div>
				</div>
			</radio-group>
		</scroll-div> 
		<div class="btn">
			<div @click.stop="editadress">新建地址</div>
		</div>
	</div>
</template>

<script>
  import loadMore from '@/components/uni-load-more/uni-load-more.vue'

  var page = 1, pageSize = 10;
  export default {
    name: "my-address",
    components: {
       loadMore
    },
    data() {
      return {
        title: '',
        addressType: 0,
        isShop: 0,
        addressList: [],
        loadMore: 1,
        cart_ids: '',
        checkId:''
      }
    },
    methods: {
      handleChooseDefault(e){
        let _this =this
        // wx.showModal({
        //   title:'提示',
        //   content:'是否确认设为默认?',
        //   success:(res)=>{
        //     console.log(res)
        //     if(res.confirm){
               _this.addressSetDefault(e.target.value)

        //       console.log(res)
        //     }else{
           
        //     }
        //   }
        // })
      },
      changeDafaultAddress(item){
        
      },
      //设置默认地址
      addressSetDefault(id) {
        return new Promise((resolve, reject) => {
            this.$fly.post(this.$api.addressSetDefault, {
              id: id
            }).then(res => {
              // this.checkId = id
              this.addressList.forEach(val => {
                val.status = 0;
                if (val.id == id) {
                  val.status = 1;
                }
              })
              this.$tip.toast('设置成功');
              resolve();
            })
        })
      },
      //chooseAddress
      chooseAddress(id, status) {
				if(this.isShop==1){
					this.addressSetDefault(id, status).then(() => {
					  wx.setStorageSync('address_id',id)
					  // 跳转到提交订单页面
					  // wx.navigateBack();
					  wx.redirectTo({
					    url: "/pages/shopCart/submitOrder?address_id="+id+'&cart_ids='+this.cart_ids
					  });
					})
				}
        
      },
			delAddress(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除此地址吗？',
					success: function(res) {
						if (res.confirm) {
							_this.$fly.post(_this.$api.addressDel,{
									address_ids: item.id
								}
							).then(rs => {
								_this.addressList = []
								_this.getAddressList()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
      //编辑地址
      toeditadress(id) {
        wx.navigateTo({
          url: '/pages/center/address/addressDetail?addressType='+this.addressType+'&type=2&id='+id
        })
      },
      //新增地址
      editadress() {
        wx.navigateTo({
          url: '/pages/center/address/addressDetail?addressType='+this.addressType+'&type=1'
        })
      },
      //删除地址
      addressDel(id, i) {
        this.$tip.loading('正在删除')
        this.$fly.post(this.$api.addressDel, {
          address_ids: id + ''
        }).then(res => {
          this.addressList.splice(i, 1);
          this.$tip.loaded();
          this.$tip.toast('删除成功')
        })
      },
      //获取地址列表
      getAddressList() {
        this.$fly.post(this.$api.addressList, {
          params: {
            page: page,
            pageSize: 99,
            type: this.addressType
          }
        }).then(res => {
          if (page == 1) {
            this.addressList = res.data.list;
          } else {
            if (res.data.list.length > 0) {
              this.addressList = this.addressList.concat(res.data.list);
            }
          }
          if (res.data.list.length < pageSize) {
            this.loadMore = 3;
          } else {
            page++
            this.loadMore = 1;
          }
          this.addressList.map((item)=>{
            if(item.status==1){
              this.checkId = item.id
            }
          })
        })
      },
      initData(option) {
        console.log(option)
        this.addressType = option.addressType || 0;
        this.isShop = option.isShop || 0;
        this.cart_ids = option.cart_ids || '';
        this.title = this.addressType == 0 ? '收货地址' : '发货地址';
        wx.setNavigationBarTitle({
          title: this.title
        })
      },
    },
    onLoad(option) {
      this.initData(option);// 地址页面初始化
    },
    onShow() {
      this.getAddressList();
    },
    onReachBottom() {
      if (this.loadMore == 1) {
        this.getAddressList();
      }
    },
  }
</script>

<style lang="scss" scoped>
  	page {
		height: 100%;
		background: #F3F3F3;

		.container {
			height: 100%;
			background: #f3f3f3;
			padding-top: 20rpx;
			.scroll-y {
				height: calc(100% - 140rpx);

				.address-item {
					background: white;
					height: 332rpx;
					padding: 0 30rpx;
					margin-top: 20rpx;

					.address-item-top {
						height: 218rpx;
						font-weight: 500;
						overflow: hidden;

						>div:nth-child(1) {
							font-size: 32rpx;
							color: #1E1F20;
							margin: 30rpx 0;
						}

						>div:nth-child(2) {
							font-size: 30rpx;
							color: #666666;
						}
					}

					.address-item-bottom {
						height: 113rpx;
						border-top: 1rpx solid #EEEEEE;
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #666666;
						font-size: 30rpx;
						font-weight: 500;
						>div {
							display: flex;
							align-items: center;
							.delete{
								img{
								  width:100%;
								  height: 100%;
								} 
							}
							>div {
								width: 40rpx;
								height: 40rpx;
								font-size: 40rpx;
								margin-left: 40rpx;
								
                img{
                  width:100%;
                  height: 100%;
                } 
							}
						}
           
					}
				}
			}

			.btn {
				position: fixed;
        bottom:0;
        display: flex;
				justify-content: center;
				align-items: center;
				padding: 26rpx 0;
        width:100%;
				>div {
					width: 690rpx;
					height: 88rpx;
					background:linear-gradient(90deg,rgba(252,56,67,1) 0%,rgba(246,42,138,1) 100%);
					color: white;
					border-radius: 44rpx;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 88rpx;
					text-align: center;
				}
			}
		}
	}
</style>
