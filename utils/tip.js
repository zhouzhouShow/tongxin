/**
 * 提示与加载工具类
 */
export default class Tips {
	constructor() {
		this.isLoading = false;
	}

	/**
	 * 弹出加载提示
	 */
	static loading(title = "正在加载") {
		if (Tips.isLoading) {
			return;
		}
		Tips.isLoading = true;
		uni.showLoading({
			title: title,
			mask: true
		});
	}

	/**
	 * 加载完毕
	 */
	static loaded() {
		if (Tips.isLoading) {
			setTimeout(()=>{
				Tips.isLoading = false;
				uni.hideLoading();
			},300)	
		}
	}
	
	static toast(msg){
		uni.showToast({
			title: msg,
			duration: 2000,
			icon: 'none'
		})
	}
	
	/**
	 * 模态弹窗
	 */
	static modal(content,title = '提示'){
		return new Promise((resolve,reject)=>{
			uni.showModal({
			    title: title,
			    content: content,
			    success: function (res) {
			        if (res.confirm) {
			            resolve();
			        } else if (res.cancel) {
			            reject();
			        }
			    }
			});
		})
		
	}
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;
