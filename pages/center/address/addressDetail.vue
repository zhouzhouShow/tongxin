<template>
  <div class="addressDetailContainer">
    <div class="inputBox">
      <span class="inputTitle">姓名</span>
      <div class="inputContent">
        <input v-model="realname" type="text" placeholder="收件人姓名" placeholder-style="color:#BABABA">
      </div>
    </div>
    <div class="inputBox">
      <span class="inputTitle">手机</span>
      <div class="inputContent">
        <input :class="{testError:!mobileValid}" v-model="mobile" @blur="formatMobile" type="text" placeholder="手机"
               placeholder-style="color:#BABABA">
      </div>
    </div>
    <div class="inputBox">
      <span class="inputTitle">选择城市</span>
      <div class="inputContent" @click.stop="showAddressPicker">
        <span v-if="addressName!=''">{{addressName}}</span>
        <span v-if="addressName==''" style="color: #BABABA">请选择省/市/区</span>
      </div>
    </div>
    <div class="inputBox">
      <span class="inputTitle">详细地址</span>
      <div class="inputContent">
        <input v-model="address" type="text" placeholder="请详细录入街道/路段" placeholder-style="color:#BABABA">
      </div>
    </div>
   
    <!-- <div class="inputBox">
      <span class="inputTitle">座机号码</span>
      <div class="inputContent">
        <input :class="{testError:!telphoneValid}" v-model="telphone" @blur="formatTelPhone" type="text"
               placeholder="座机号码"
               placeholder-style="color:#BABABA">
      </div>
    </div> -->
    <div class="inputBox switchBox">
      <span class="inputTitle">设为默认地址</span>
      <div class="inputContent inputContentSwitch" @click.stop="switchChange" style="flex-direction:row-reverse">
				
				<checkbox :checked="status==1"  color="#FF5152"/>
			
      </div>
    </div>
 
    <!-- <div class="addressBtn" @click.stop="saveAddress">保存</div> -->
    <div class="addressBtn" >
			<div @click.stop="saveAddress">保存</div>
		</div>
		<mpvue-city-picker ref="mpvueCityPicker"    @onConfirm="onConfirm"></mpvue-city-picker>
   <!-- <addressPicker :isShow="addressShow" :addressId="addressId" @close="closePicker"
                   @pickerChange="addressPickerChange"></addressPicker> -->
  </div>
</template>

<script>
  // import addressPicker from '@/components/addressPicker'
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';

  export default {
    name: "address-detail",
    components: {
      // addressPicker
			mpvueCityPicker
    },
    data() {
      return {
        addressType: 0,
        type: 1,
        id: 0,
        // 地址详情
        realname: "",
        address: '',
        mobile: '',
        mobileValid: true,
        telphone: "",
        telphoneValid: true,
        status: 0,
        addressId: [0, 0, 0],
        addressName: '',
				prov_name:'',
				city_name:'',
				dist_name:'',
        //地址弹窗
        addressShow: false,
				
      }
    },
    methods: {
   
      showAddressPicker() {
        this.$refs.mpvueCityPicker.show();
      },
      closePicker() {
        this.addressShow = false;
      },
			onConfirm(e) {
				console.log(e);
				this.addressName = e.label;
				this.prov_name = e.cityName[0]
				this.city_name = e.cityName[1]
				this.dist_name = e.cityName[2]
				this.addressId = e.cityCode
			},
			onCancel (){},
      // picker
      //设置默认地址
      switchChange(e) {
				console.log(e)
        this.status = this.status == 0 ? 1 : 0;
      },
      //正则验证   手机验证  座机验证
      formatMobile() {
        if (this.mobile.trim() != '') {
          if (/^1[34578]\d{9}$/.test(this.mobile)) {
            this.mobileValid = true;
          } else {
            this.mobileValid = false;
          }
        } else {
          this.mobileValid = true;
        }
      },
      formatTelPhone() {
        if (this.telphone.trim() != '') {
          if (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.telphone)) {
            this.telphoneValid = true;
          } else {
            this.telphoneValid = false;
          }
        } else {
          this.telphoneValid = true;
        }
      },
      //获取编辑地址的地址详情
      getAddressDetail() {
        this.$fly.post(this.$api.addressDetail, {
          address_id: this.id
        }).then(res => {
          var data = res.data;
          this.realname = data.realname;
          this.address = data.address;
          this.mobile = data.mobile;
          this.telphone = data.telphone;
          this.status = data.status;
          this.addressId = [data.prov, data.city, data.dist];
					this.prov_name = data.prov_name
					this.city_name = data.city_name 
					this.dist_name = data.dist_name
          this.addressName = data.prov_name + data.city_name + data.dist_name;
        })
      },
     
      saveAddress() {
        if (this.realname.trim() == '') {
          this.$tip.toast('请填写姓名')
        } else if (this.addressName.trim() == '') {
          this.$tip.toast('请选择联系地址的省市区')
        } else if (this.address.trim() == '') {
          this.$tip.toast('请填写详细地址')
        } else if (this.mobile.trim() == '' && this.telphone.trim() == '') {
          this.$tip.toast('请填写联系电话或者座机号码')
        } else if (!this.telphoneValid || !this.mobileValid) {
          this.$tip.toast('电话或者座机号码输入格式有误!')
        } else {
          let data = {
            type: this.type,
            realname: this.realname,
            mobile: this.mobile, //手机号码
            telphone: this.telphone,  //座机号码
            address: this.address,
            prov: this.addressId[0],
            city: this.addressId[1],
            dist: this.addressId[2],
						prov_name: this.prov_name,
						city_name: this.city_name,
						dist_name: this.dist_name,
            status: this.status,
          }
          if (this.type == 2) {
            data.id = this.id;
          }
          this.$tip.loading('正在添加');
          this.$fly.post(this.$api.addressEdit, data)
            .then(res => {
              this.$tip.loaded();
              this.$tip.toast('添加成功')
              uni.navigateBack();
            }).catch(e => {
            this.$tip.loaded();
          })
        }
      },
      initData(option) {
        this.addressType = option.addressType || 0;
        this.type = option.type || 1;
        this.id = option.id || 0;
        var title = this.type == 1 ? '新增地址' : '编辑地址';
        if (this.type == 2) {
          this.getAddressDetail();
        }
        wx.setNavigationBarTitle({
          title: title
        })
      },
    },
    onLoad(option) {
      Object.assign(this.$data, this.$options.data());
      this.initData(option);
    },
  }
</script>

<style lang="scss">
  page {
    background: #F3F3F3;
  }

  .addressDetailContainer {
    .inputBox {
      padding: rpx(4) rpx(30);
      height: rpx(106);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      color: #000000;
      font-size: rpx(26);
      border-bottom: 1px solid #eee;
      background: #fff;
      .inputTitle {
        width: rpx(180);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .inputContent {
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
        flex-direction: row-reverse;
        input {
          width: 100%;
          text-align: right;
        }
        .testError {
          color: #FF0000;
        }
      }
    }
    .delete{
      margin-top: rpx(20);
      color:#F23030;

    }
    .switchBox {
      margin-top: rpx(20);
      padding: rpx(12) rpx(30);
      border-top: 1px solid #D3D3D3;
      .inputContentSwitch {
        // justify-content: flex-end;
      }
    }
   
    	.addressBtn {
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
</style>
