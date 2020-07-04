var systemInfo = {
	width: 0,
	height: 0,
	isGet: false,
	windowWidth:0,
	getData() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				// console.log(res);
				that.isGet = true;
				that.width = 750;
				that.windowWidth = res.windowWidth;
				that.height = (res.windowHeight * (750 / res.windowWidth));   //px转rpx
			}
		});
	}
}


export default systemInfo;
