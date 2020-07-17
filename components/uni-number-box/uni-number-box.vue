<template>
	<view class="uni-numbox">
		<view class="uni-numbox__minus" :class="{'uni-numbox--disabled': disableSubtract||disabled}" @click.stop="_calcValue('subtract')">-</view>
		<input class="uni-numbox__value" type="number" disabled="disabled" :value="inputValue" @input="_onInput" @blur="_onBlur">
		<view class="uni-numbox__plus" :class="{'uni-numbox--disabled': disableAdd||disabled}" @click.stop="_calcValue('add')">+</view>
	</view>
</template>
<script>
	export default {
		name: 'uni-number-box',
		props: {
			value: {
				type: Number,
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			onlyKey: {
				type: String,
				default: ''
			},
			isFor: {
				type: Boolean,
				default: false
			},
			errorMsg:{
				type:String,
				default:'库存不足'
			}
			
		},
		data() {
			return {
				inputValue: this.value
			}
		},
		computed: {
			disableSubtract() {
				return this.inputValue <= this.min
			},
			disableAdd() {
				return this.inputValue >= this.max
			}
		},
		watch: {
			value(val) {
				this.inputValue = val;
			},
		},
		methods: {
			resetNum() {
				this.inputValue = this.value;
			},
			_calcValue(type) {
				if (this.disabled) {
					return
				}
				const scale = this._getDecimalScale()
				let value = this.inputValue * scale
				let step = this.step * scale
				if (type === 'subtract') {
					value -= step
				} else if (type === 'add') {
					value += step
				}
				
				if(value > this.max && type === 'add'){
					this.$tip.toast(this.errorMsg)
					return
				}
				if(value < this.min){
					// this.$tip.toast('已经到最低了!')
					return
				}
				// if (value < this.min || value > this.max) {
				// 	return
				// }
				this.inputValue = value / scale;
				if (this.isFor) { //循环的,根据下标改数据
					console.log(this.inputValue,this.value)
					this.$emit('change', {
						value: value,
						onlyKey: this.onlyKey,
						inputValue: this.inputValue,
						addType: type,
						oldValue: this.value
					});
				} else {
					this.$emit('change', {
						value: value,
						onlyKey: this.onlyKey
					});
				}
				
			},
			_getDecimalScale() {
				let scale = 1
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length)
				}
				return scale
			},

			_onInput(e) {
				this.inputValue = e.detail.value;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					this.inputValue = this.min;
					return
				}
				value = +value;
				if (value > this.max) {
					value = this.max
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
				if(this.value != this.inputValue ){
					this.$emit('change', {
						value: value,
						onlyKey: this.onlyKey
					});
				}
			}
		}
	}
</script>
<style lang="scss">
	$numbox-btn-width:50upx;
	$numbox-input-width:66upx;
	$numbox-height:50upx;
	$uni-font-size-xxl:40upx;

	.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		height: $numbox-height;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			transform-origin: center;
			box-sizing: border-box;
			pointer-events: none;
			top: -50%;
			left: -50%;
			right: -50%;
			bottom: -50%;
			border: 1px solid $uni-border-color;
			border-radius: $uni-border-radius-lg;
			transform: scale(.5);
		}

		&__minus,
		&__plus {
			margin: 0;
			// background-color: $uni-bg-color-grey;
			width: $numbox-btn-width;
			font-size: $uni-font-size-xxl;
			height: 100%;
			line-height: $numbox-height;
			text-align: center;
			color: $uni-text-color;
			position: relative;
		}

		&__value {
			position: relative;
			// background-color: $uni-bg-color;
			width: $numbox-input-width;
			height: 100%;
			text-align: center;
			border-right: 1rpx solid #fff;
			box-sizing: border-box;
			font-size: 22upx;
			&:after {
				content: '';
				position: absolute;
				transform-origin: center;
				box-sizing: border-box;
				pointer-events: none;
				top: -50%;
				left: -50%;
				right: -50%;
				bottom: -50%;
				border-style: solid;
				border-color: $uni-border-color;
				border-left-width: 1px;
				border-right-width: 1px;
				border-top-width: 0;
				border-bottom-width: 0;
				transform: scale(.5);
			}
		}

		&--disabled {
			color: $uni-text-color-disable;
		}
	}
</style>
