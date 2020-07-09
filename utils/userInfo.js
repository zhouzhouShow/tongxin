import fly from "../api/fly.js";
import api from "../api/api";
import store from '../store'

const userInfo = {
	userInfo: '',
	isGet: false,
	setInfo(data, key) {
		if (arguments[1]) {
			var init = JSON.parse(this.userInfo);
			init[key] = data;
			this.userInfo = JSON.stringify(init);
		} else {
			this.userInfo = JSON.stringify(data);
		}
	},
	async getInfo(key) {
		if (this.isGet) {
			return arguments[0] ? JSON.parse(this.userInfo)[key] : JSON.parse(this.userInfo)
		} else {
			await this.getUserInfo();
			return arguments[0] ? JSON.parse(this.userInfo)[key] : JSON.parse(this.userInfo)
		}
	},
	getUserInfo() {
		return new Promise((resolve, reject) => {
			this.isGet = false;
			// store.dispatch('actionsAccountMine').then(res => {
			// 	this.setInfo(res.data);
			// 	this.isGet = true;
			// 	resolve(res);
			// })
			// request.get({url:api.accountMine}).then(res => {
			//   this.setInfo(res.data);
			//   this.isGet = true;
			//   resolve(res);
			// })
		})
	},
}
export default userInfo
