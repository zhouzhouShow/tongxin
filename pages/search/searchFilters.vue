<template>
	<view class="container">
		<view class="f-box">
			<view class="title">
				<text>价格区间（元）</text>
			</view>
			<view class="f-content">
				<input type="text" placeholder-style="text-align:center" v-model="minPrice" placeholder="最低价" />
				<text class="line"></text>
				<input type="text" placeholder-style="text-align:center"  v-model="maxPrice" placeholder="最高价" />
			</view>
		</view>
		<view class="f-box">
			<view class="title">
				<text>品牌</text>
				<text  @click="showMore('brand')">{{!getMore1? '更多':'收起'}}<text class="iconfont iconarrow" style="font-size: 35rpx;"></text></text>
			</view>
			<view class="f-content2 "   :class="{hide:getMore1,moreBox:brandList.length>6}">
				<!-- <view class="box" id="box1"> -->
					<text class="label-item" @click="chooseItem(index,'bIndex')" :class="index == bIndex ? 'active' : ''"  v-for="(item,index) in brandList" :key="index">{{item.name}}</text>
				<!-- </view> -->
			</view>
		</view>
		<view class="f-box">
			<view class="title">
				<text>性别选择</text>
			</view>
			<view class="f-content2">
				<text class="label-item"   @click="chooseItem(index,'gIndex')"  :class="index == gIndex ? 'active' : ''" v-for="(item,index) in genderList" :key="index">{{item.name}}</text>

			</view>
		</view>
		<view class="f-box">
			<view class="title">
				<text>分类</text>
				<text @click="showMore('class')">{{!getMore2? '更多':'收起'}}<text class="iconfont iconarrow" style="font-size: 35rpx;"></text></text>
			</view>
			<view class="f-content2 moreBox" :class="{hide:getMore2,moreBox:classifyList.length>6}" >
				<!-- <view class="box" id="box2"> -->
					<text class="label-item "  @click="chooseItem(index,'cIndex')"  :class="index == cIndex ? 'active' : ''" v-for="(item,index) in classifyList" :key="index">{{item.name}}</text>
				<!-- </view> -->
			</view>
		</view>
		<view class="fiexd-bottom">
			<text class="reset" @click="reset">重置</text>
			<text class="sure" @click="sure">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minPrice:'',
				maxPrice:'',
				getMore1:false,
				getMore2:false,
				bIndex:-1,
				cIndex:-1,
				gIndex:-1,
				brandList: [],
				classifyList: [],
				genderList:[],
			};
		},
		onShow() {
			let obj = wx.getStorageSync('filterObj') || ''
			if(obj){
				console.log(obj)
				console.log(obj.minPrice)
				this.minPrice = obj.priceMin
				this.maxPrice = obj.priceMax
				this.bIndex=obj.bIndex
				this.cIndex=obj.cIndex
				this.gIndex=obj.gIndex
			}
		},
		methods: {
			reset(){
				this.minPrice=''
				this.maxPrice=''
				this.bIndex=-1
				this.cIndex=-1
				this.gIndex=-1
				wx.removeStorageSync('filterObj')
			},
			sure(){
				let data = {
					bIndex:this.bIndex,
					cIndex:this.cIndex,
					gIndex:this.gIndex,
					priceMin:this.minPrice || '',
					priceMax:this.maxPrice || '',
					brandId:this.bIndex == -1? '' : this.brandList[this.bIndex].id,
					gender:this.gIndex == -1? '' : this.genderList[this.gIndex].id,
					cateId:this.cIndex == -1? '' : this.classifyList[this.cIndex].id,
				}
				uni.$emit('filterGood',data)
				wx.setStorageSync("filterObj",data)
				wx.navigateBack({})
			},
			async getList() {
				return await this.$fly.post(this.$api.searchItem)
			},
			showMore(type){
				console.log(this.$refs)
				if(type =='brand'){
					this.getMore1 = !this.getMore1
				}else{
					this.getMore2 = !this.getMore2
				}
			},
			chooseItem(index,type){
				console.log(this.$data)
				this.$data[type] = index
			},
			dataInit(list){ //初始化数据
				let id = arguments[1]
				 list.forEach(item=>{
					if(id && item.id == id){
						item.isChecked = true
					}else{
						item.isChecked = false
					}
				})
				return list
			},
		},
		async onLoad() {
			this.$tip.loading()
			let data = await this.getList()
			this.brandList = this.dataInit(data.data.brand)
			this.classifyList = this.dataInit(data.data.cat)
			this.genderList = this.dataInit(data.data.gender)
			this.$tip.loaded()

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #fff;
		padding: 30rpx 30rpx 50rpx;
		color: #333333;
	}
	.hide{
		overflow: inherit !important;
	}
	.fiexd-bottom {
		position: fixed;
		width: 100%;
		background: #fff;
		bottom: 0rpx;
		left: 0;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 400;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			display: inline-block;
		}

		.reset {
			width: 190rpx;
			height: 80rpx;
			border: 1rpx solid rgba(187, 187, 187, 1);
			border-radius: 40rpx;
		}

		.sure {
			margin-left: 20rpx;
			width: 480rpx;
			height: 80rpx;
			color: #FFFFFF;
			background: linear-gradient(90deg, rgba(252, 56, 66, 1) 0%, rgba(246, 42, 138, 1) 100%);
			border-radius: 40rpx;
		}

	}

	.f-box {

		.title {
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			margin-bottom: 30rpx;
		}

		.f-content {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-bottom: 60rpx;

			input {
				width: 210rpx;
				height: 64rpx;
				background: rgba(243, 243, 243, 1);
				border-radius: 32rpx;
				text-align: center;
				font-size: 26rpx;
				font-weight: 400;
			}

			.line {
				margin: 0 24rpx;
				width: 16rpx;
				height: 2rpx;
				background: rgba(51, 51, 51, 1);
			}



		}

		.f-content2:after {
			content: '';
			width: 210rpx;
		}
		.moreBox{
			height: 160rpx;
			transition: height .5s;
			overflow: hidden;
		}
		.f-content2 {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 60rpx;
			
			.label-item {
				width: 210rpx;
				height: 64rpx;
				line-height: 64rpx;
				border: 1rpx solid rgba(221, 221, 221, 1);
				border-radius: 32rpx;
				text-align: center;
				font-size: 26rpx;
				font-weight: 400;
				margin-bottom: 20rpx;
			}

			.active {
				color: #F12F2F;
				border: 1rpx solid #F12F2F;
			}
		}
	}
</style>
