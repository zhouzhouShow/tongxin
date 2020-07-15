let intercept = {
	isLogin: false, //是否登录
	interceptList: [], //
	loginCallback(fun){
		if (!this.isLogin) {
			this.interceptList.push(fun)
		}else{
			fun()
		}
	},
	loginSuccess(value) {
		this.isLogin = value
		if (value) {
			if (this.interceptList.length) {
				this.interceptList.forEach( (fun) =>{
					fun()
				})
			}
		}
	}

}

export default  intercept
