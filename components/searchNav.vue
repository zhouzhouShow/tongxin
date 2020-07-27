<template>
	<div class="header-bar">
		<div class="header-item" @click="changeIndex(1)">
			<div class="header-item-text" :class="activeIndex==1?'item-active':''">人气</div>
			<div :class="activeIndex?'':'active-line'"></div>
		</div>
		<div class="header-item" @click="changeIndex(2)">
			<div class="header-item-text" :class="activeIndex==2?'item-active':''">销量</div>
			<div :class="activeIndex?'':'active-line'"></div>
		</div>
		<div class="header-item" @click="changeIndex(4)">
			<div class="header-item-text" :class="activeIndex==4?'item-active':''">价格</div>
			<div :class="activeIndex?'active-line':''"></div>
			<div class="order-arrows">
				<div class="iconfont iconarrow2 rowbox " style="margin-bottom: 10rpx;" :class="activeIndex==4&&!priceOrder?'active':''"></div>
				<div class="iconfont iconarrow rowbox" :class="activeIndex==4&&priceOrder?'active':''"></div>
			</div>
		</div>
		<div class="header-item" @click="changeIndex(6)">
			<div class="header-item-text" :class="activeIndex==6?'item-active':''">筛选</div>
			<div :class="activeIndex?'':'active-line'"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:-1,
				priceOrder:false,
				ordertype:0
			};
		},
		methods:{
			changeIndex(index) {
				switch (index) {
					case 1:
						this.priceOrder = true;
						this.activeIndex = index
						this.ordertype = 8
						this.getDataList()
						break;
					case 2:
						this.priceOrder = true;
						this.activeIndex = index
						this.ordertype = 1
						this.getDataList()
						break;
					case 4:
						this.activeIndex = index
						this.priceOrder = !this.priceOrder;
						if (this.priceOrder == false) {
							this.ordertype = 2; //4价格顺序
						}
						if (this.priceOrder == true) {
							this.ordertype = 3; //5价格倒序
						}
						this.getDataList()
						break;
					case 6:
						wx.navigateTo({
							url:'/pages/search/searchFilters'
						})
						break;
					default:
						break;
				}
			},
			getDataList(){ //返回选中的类型
				this.$emit('changeType',this.ordertype)
			},
		},
	}
</script>

<style lang="scss" scoped>
.header-bar {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 90rpx;
		background: #fff;
		border-bottom: 1rpx solid #eee;

		.header-item:after {
			position: absolute;
			left: 0;
			top: 50%;
			width: 2rpx;
			height: 30rpx;
			content: '';
			background: #eee;
			margin-top: -15rpx;
		}

		.header-item {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 50%;
			height: 100%;
			box-sizing: border-box;

			.header-item-text {
				font-size: 28rpx;
				font-weight: 500;
				color: #999;
				text-align: center;
				position: relative;
			}

			.active-line {
				width: 60rpx;
				height: 1px;
				// background-color: #FF0000;
			}

			.item-active {
				color: #F22631;
			}
			.rowbox{
				width: 17rpx;
				height: 9rpx;
			}
			.order-arrows {
				position: absolute;
				top: 20rpx;
				right: 42rpx;
				// margin-top: 17rpx;
				color: #666666;
				font-size: 30rpx;
				.active{
					color: #F22732 !important;
				}
			}
		}
	}
</style>
