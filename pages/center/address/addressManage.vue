<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">{{ type == '0' ? '收货人' : '发货人' }}</text>
			<input class="input" type="text" v-model="addressData.name" :placeholder="type == '0' ? '请输入收货人姓名' : '请输入发货人姓名'" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号码</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="请输入您的手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">省/市/区县</text>
			<view class="input">
				<!-- <picker mode="region" @change='handlePickerChange'>
				  <view :class="[addressData.address?'':'pickerChoose']">
						{{addressData.address?addressData.address:addressData.addressName}}
					</view>
				</picker> -->
				<view :class="[addressData.address ? '' : 'pickerChoose']" @click="showCityPicker()">{{ addressData.address }}</view>
				<!-- <mpvue-city-picker ref="mpvueCityPicker" @onChange="onChange" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker> -->
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="请详细录接到/路段" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认地址</text>
			<switch :checked="addressData.default == '0' ? false : true" color="#4eba4b" @change="switchChange" />
		</view>
		<button :class="['add-btn', addressData.name && addressData.mobile && addressData.address && addressData.area ? 'add-btn-active' : '']" @click="confirm">保存</button>
	</view>
</template>

<script>
// import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	components: {
		// mpvueCityPicker
	},
	data() {
		return {
			addressData: {
				id:'',
				name: '',
				mobile: '',
				prov:'1',
				city:'2',
				dist:'3',
				prov_name:'',
				city_name:'',
				dist_name:'',
				address: '请选择省/市/区县',
				area: '',
				default: 0,
				type: 1
			},
			type: 0
		};
	},
	methods: {
		switchChange(e) {
			this.addressData.default = e.detail ? 1 : 0;
		},

		// handlePickerChange(e) {
		// 	this.addressData.prov_name = e.detail.value[0];
		// 	this.addressData.city_name = e.detail.value[1];
		// 	this.addressData.dist_name = e.detail.value[2];
		// 	this.addressData.address = e.detail.value.join(' ');
		// },

		//提交
		confirm() {
			let data = this.addressData;
			if(!data.name) {
				uni.showToast({
					title:this.type==0?'请输入收货人姓名':'请输入发货人姓名',
					duration:2000,
					icon:'none'
				})
				return
			}
			if(!data.area) {
				uni.showToast({
					title:'请输入详细地址',
					duration:2000,
					icon:'none'
				})
				return
			}
			if(!/(^1[2|3|4|5|6|7|8|9][0-9]{9}$)/.test(data.mobile)){
				uni.showToast({
					title:'请输入正确的手机号码',
					duration:2000,
					icon:'none'
				})
				return;
			}
			if(!data.prov){
				uni.showToast({
					title:'请选择省/市/区县',
					duration:2000,
					icon:'none'
				})
				return
			}
			this.$request
				.post({
					url: this.$api.addressEdit,
					data: {
						address_id:data.id,
						type: data.type,
						realname: data.name,
						mobile: data.mobile,
						prov: data.prov,
						city: data.city,
						dist: data.dist,
						address: data.area,
						is_rec: this.type,
						status: data.default
					}
				})
				.then(res => {
					if (res == null) {
						uni.navigateBack();
					}
				});
		},
		showCityPicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onChange(e) {
			console.log(e);
		},
		onCancel(e) {
			console.log(e);
		},
		onConfirm(e) {
			console.log(e);
			this.addressData.address = e.label;
			this.addressData.prov = e.cityCode.provCode;
			this.addressData.city = e.cityCode.cityCode;
			this.addressData.dist = e.cityCode.distCode;
		}
	},
	onLoad(data) {
		console.log('onload-data',data)
		if (data.item) {
			let item = JSON.parse(data.item);
			this.addressData.id = item.id;
			this.addressData.type = 2;
			this.addressData.name = item.realname;
			this.addressData.mobile = item.mobile;
			this.addressData.prov_name = item.prov_name;
			this.addressData.city_name = item.city_name;
			this.addressData.dist_name = item.dist_name;
			this.addressData.prov = item.prov;
			this.addressData.city = item.city;
			this.addressData.dist = item.dist;
			this.addressData.area = item.address;
			if(item.prov==0||item.dist==0||item.city==0){
				this.addressData.address = '请选择省/市/区县'
			}else{
				this.addressData.address = `${item.prov_name}-${item.city_name}-${item.dist_name}`;
			}
			this.addressData.default = item.status;
		}
		this.type = data.type;
		let title = '编辑地址';
		if (data.type == 0) {
			title = '编辑收货地址';
		}else{
			title = '编辑发货地址';
		}
		uni.setNavigationBarTitle({
			title
		});
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16upx;
}

.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	height: 110upx;
	background: #fff;

	.tit {
		flex-shrink: 0;
		width: 170upx;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.input {
		flex: 1;
		font-size: 30upx;
		height: 52upx;
		color: $font-color-dark;
		text-align: right;
		picker {
			height: 52upx;
			.pickerChoose {
				color: #cbccd0;
			}
		}
	}
	.icon-shouhuodizhi {
		font-size: 36upx;
		color: $font-color-light;
	}
}
.default-row {
	margin-top: 40upx;
	.tit {
		flex: 1;
	}
	switch {
		transform: translateX(16upx) scale(0.9);
	}
}
.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 88upx;
	font-size: $font-lg;
	color: #fff;
	background-color: #cbccd0;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(203, 204, 208, 0.4);
	position: absolute;
	bottom: 25upx;
	left: 30upx;
}
.add-btn-active {
	background-color: $base-color;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
.placeholder {
	color: #cbccd0;
}
</style>
