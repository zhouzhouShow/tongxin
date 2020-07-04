<template>
	<div class="mpvue-picker">
		<div :class="{ pickerMask: showPicker }" @click="maskClick" catchtouchmove="true"></div>
		<div class="mpvue-picker-content " :class="{ 'mpvue-picker-view-show': showPicker }">
			<div class="mpvue-picker__hd" catchtouchmove="true">
				<div class="mpvue-picker__action" @click="pickerCancel">取消</div>
				<div class="mpvue-picker__action" :style="{ color: themeColor }" @click="pickerConfirm">确定</div>
			</div>
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
				<block>
					<picker-view-column>
						<div class="picker-item" v-for="(item, index) in provinceDataList" :key="index">{{ item.label }}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item, index) in cityDataList" :key="index">{{ item.label }}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item, index) in areaDataList" :key="index">{{ item.label }}</div>
					</picker-view-column>
				</block>
			</picker-view>
		</div>
	</div>
</template>

<script>
// import provinceData from './city-data/province.js';
// import cityData from './city-data/city.js';
// import areaData from './city-data/area.js';
export default {
	data() {
		return {
			pickerValue: [0, 0, 0],
			provinceDataList: [],
			cityDataList: [],
			areaDataList: [],
			/* 是否显示控件 */
			showPicker: false,
			pickerValueDefault: [0,0,0],
			provinceData: [],
			cityData: [],
			areaData: []
		};
	},
	props: {
		/* 默认值 */
		pickerRegionCodeDefault: {
			type: Object,
			default: () => ({})
		},
		/* 主题色 */
		themeColor: String
	},
	// watch: {
	// 	pickerValueDefault() {
	// 		this.init();
	// 	}
	// },
	methods: {
		getRegionData() {
			return new Promise((resolve, reject) => {
				this.$request
					.post({
						url: this.$api.getRegionData
					})
					.then(res => {
						resolve(res);
					});
			});
		},
		init(res = {}) {
			if (Object.keys(res).length > 0) {
				this.provinceData = res.arealist.provinec;
				this.cityData = res.arealist.city;
				this.areaData = res.arealist.area;
				
				/* var tempArray = [];
				var p = res.arealist.provinec.findIndex(item => {
					return item.value == this.pickerRegionCodeDefault.prov;
				});
				var c = res.arealist.city[p].findIndex(item => {
					return item.value == this.pickerRegionCodeDefault.city;
				});
				var d = res.arealist.area[p][c].findIndex(item => {
					return item.value == this.pickerRegionCodeDefault.dist;
				});
				tempArray.push(p);
				tempArray.push(c);
				tempArray.push(d);
				this.pickerValueDefault = tempArray;
				this.pickerValue = tempArray; */

				this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
				this.provinceDataList = this.provinceData;
				this.cityDataList = this.cityData[this.pickerValueDefault[0]];
				this.areaDataList = this.areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]];
				
				// this.pickerValue = tempArray;
				// this.$nextTick(() => {
				// 	this.pickerValue = tempArray;
				// });
			}
		},
		show() {
			setTimeout(() => {
				this.showPicker = true;
			}, 0);
			// setTimeout(() => {
			// 	this.pickerValue = this.pickerValueDefault;
			// }, 200);
			// this.$nextTick(() => {
			// 	this.showPicker = true;
			// });
			// this.$nextTick(() => {
			// 	this.pickerValue = this.pickerValueDefault;
			// });
		},
		maskClick() {
			this.pickerCancel();
		},
		pickerCancel() {
			this.showPicker = false;
			this._$emit('onCancel');
		},
		pickerConfirm(e) {
			this.showPicker = false;
			this._$emit('onConfirm');
		},
		showPickerView() {
			this.showPicker = true;
		},
		handPickValueDefault() {
			if (this.pickerValueDefault !== [0, 0, 0]) {
				if (this.pickerValueDefault[0] > this.provinceData.length - 1) {
					this.pickerValueDefault[0] = this.provinceData.length - 1;
				}
				if (this.pickerValueDefault[1] > this.cityData[this.pickerValueDefault[0]].length - 1) {
					this.pickerValueDefault[1] = this.cityData[this.pickerValueDefault[0]].length - 1;
				}
				if (this.pickerValueDefault[2] > this.areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1) {
					this.pickerValueDefault[2] = this.areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1;
				}
			}
		},
		pickerChange(e) {
			let changePickerValue = e.mp.detail.value;
			if (this.pickerValue[0] !== changePickerValue[0]) {
				// 第一级发生滚动
				this.cityDataList = this.cityData[changePickerValue[0]];
				this.areaDataList = this.areaData[changePickerValue[0]][0];
				changePickerValue[1] = 0;
				changePickerValue[2] = 0;
			} else if (this.pickerValue[1] !== changePickerValue[1]) {
				// 第二级滚动
				this.areaDataList = this.areaData[changePickerValue[0]][changePickerValue[1]];
				changePickerValue[2] = 0;
			}
			this.pickerValue = changePickerValue;
			this._$emit('onChange');
		},
		_$emit(emitName) {
			let pickObj = {
				label: this._getLabel(),
				value: this.pickerValue,
				cityCode: this._getCityCode()
			};
			this.$emit(emitName, pickObj);
		},
		_getLabel() {
			let pcikerLabel =
				this.provinceDataList[this.pickerValue[0]].label + '-' + this.cityDataList[this.pickerValue[1]].label + '-' + this.areaDataList[this.pickerValue[2]].label;
			return pcikerLabel;
		},
		_getCityCode() {
			// return this.areaDataList[this.pickerValue[2]].value;
			var tempObj = {};
			tempObj.provCode = this.provinceDataList[this.pickerValue[0]].value;
			tempObj.cityCode = this.cityDataList[this.pickerValue[1]].value;
			tempObj.distCode = this.areaDataList[this.pickerValue[2]].value;
			return tempObj;
		}
	},
	async created() {
		await this.getRegionData().then(this.init);
	}
};
</script>

<style>
.pickerMask {
	position: fixed;
	z-index: 1000;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	transition: all 0.3s ease;
	transform: translateY(100%);
	z-index: 3000;
}
.mpvue-picker-view-show {
	transform: translateY(0);
}
.mpvue-picker__hd {
	display: flex;
	padding: 9px 15px;
	background-color: #fff;
	position: relative;
	text-align: center;
	font-size: 17px;
}
.mpvue-picker__hd:after {
	content: ' ';
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 1px;
	border-bottom: 1px solid #e5e5e5;
	color: #e5e5e5;
	transform-origin: 0 100%;
	transform: scaleY(0.5);
}
.mpvue-picker__action {
	display: block;
	flex: 1;
	color: #1aad19;
}
.mpvue-picker__action:first-child {
	text-align: left;
	color: #888;
}
.mpvue-picker__action:last-child {
	text-align: right;
}
.picker-item {
	text-align: center;
	line-height: 40px;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}
.mpvue-picker-view {
	position: relative;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 238px;
	background-color: rgba(255, 255, 255, 1);
}
</style>
