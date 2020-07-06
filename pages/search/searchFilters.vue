<template>
	<view class="container">
		<view class="f-box">
			<view class="title">
					<text>价格区间（元）</text>
			</view>
			<view class="f-content">
				<input type="text" placeholder-style="text-align:center" placeholder="最低价"/>
				<text class="line"></text>
				<input type="text" placeholder-style="text-align:center"  placeholder="最高价"/>
			</view>
		</view>
		<view class="f-box">
			<view class="title">
					<text>品牌</text>
					<text>更多<text class="iconfont iconarrow" style="font-size: 35rpx;"></text></text>
			</view>
			<view class="f-content2">
				<text class="label-item" v-for="(item,index) in brandList" :key="index">{{item}}</text>
		
			</view>
		</view>
		<view class="f-box">
			<view class="title">
					<text>性别选择</text>
			</view>
			<view class="f-content2">
				<text class="label-item" v-for="(item,index) in brandList" :key="index">{{item}}</text>
		
			</view>
		</view>
		<view class="f-box">
			<view class="title">
					<text>分类</text>
					<text>{{true? '更多':'收起'}}<text class="iconfont iconarrow" style="font-size: 35rpx;"></text></text>
			</view>
			<view class="f-content2">
				<text class="label-item active" v-for="(item,index) in brandList2" :key="index">{{item}}</text>
		
			</view>
		</view>
		<view class="fiexd-bottom">
			<text class="reset">重置</text>
			<text class="sure">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				brandList:['大伊万','大伊万','大伊万','大伊万','大伊万','大伊万'],
				brandList2:['大伊万','大伊万','大伊万','大伊万','大伊万','大伊万'],
			};
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background: #fff;
	padding:30rpx;
	color: #333333;
}
.fiexd-bottom{
	position: fixed;
	width: 100%;
	bottom: 30rpx;
	left:0;
	line-height: 80rpx;
	text-align: center;
	font-size:30rpx;
	font-weight:400;
	text{
		display: inline-block;
	}
	.reset{
		width:190rpx;
		height:80rpx;
		border:1rpx solid rgba(187,187,187,1);
		border-radius:40rpx;
	}
	.sure{
		margin-left:20rpx;
		width:480rpx;
		height:80rpx;
		color: #FFFFFF;
		background:linear-gradient(90deg,rgba(252,56,66,1) 0%,rgba(246,42,138,1) 100%);
		border-radius:40rpx;
	}
	
}
.f-box{
	
	.title{
		display: flex;
		justify-content: space-between;
		font-size:30rpx;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-bottom: 30rpx;
	}

	.f-content{
		display: flex;
		align-items:center;
		flex-wrap: wrap;
		margin-bottom: 60rpx;
		input{
			width:210rpx;
			height:64rpx;
			background:rgba(243,243,243,1);
			border-radius:32rpx;
			text-align: center;
			font-size:26rpx;
			font-weight:400;
		}
		.line{
			margin:0 24rpx;
			width:16rpx;
			height:2rpx;
			background:rgba(51,51,51,1);
		}
		
	
		
	}
	.f-content2:after{
		content: '';
		width:210rpx;
	}
	.f-content2{
		display: flex;
		align-items:center;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 60rpx;
		.label-item{
			width:210rpx;
			height:64rpx;
			line-height:64rpx;
			border:1rpx solid rgba(221,221,221,1);
			border-radius:32rpx;
			text-align: center;
			font-size:26rpx;
			font-weight:400;
			margin-bottom: 20rpx;
		}
		.active{
			color: #F12F2F;
			border:1rpx solid #F12F2F;
		}
	}
}
</style>
