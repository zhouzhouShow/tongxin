const logicIntercept = {
	
	//登录逻辑权限判断
	isLogin: true,
	interceptLoginFunList: [],
	loginCallback(fun) {
		if (this.isLogin) {
			fun();
		} else {
			this.interceptLoginFunList.push(fun);
		}
	},
	setLoginStatus(type = true) {
		this.isLogin = type;
		if(type){
			if (this.interceptLoginFunList.length > 0) {
				this.interceptLoginFunList.forEach(val => {
					val();
				})
				this.interceptLoginFunList = [];
			}
		}
	},
	// 个人信息权限判断
	isRefreshUserDetail:false,
	userDetail:{},
	interceptUserFunList:[],
	getUserDetail(fun) {
		if (this.isRefreshUserDetail) {
			fun()
		} else {
			this.interceptUserFunList.push(fun);
		}
	},
	setUserStatus(userDetail,type = true) {
		this.userDetail = JSON.parse(JSON.stringify(userDetail)),
		this.isRefreshUserDetail = type;
		if (this.interceptUserFunList.length > 0) {
			this.interceptUserFunList.forEach(val => {
				val();
			})
			this.interceptUserFunList = [];
		}
	}
	
}
export default logicIntercept;
