import api from '../api/api'
import request from '../js_sdk/jamling-request/j-request/request.js'
import tips from './tip.js'
import intercept from './loginIntercept.js'

/**
 * 检查session是否失效
 */

const token = uni.getStorageSync('token');

function checkSession() {
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success() {
				console.log('状态未过期')
				//未过期
				resolve(1)
			},
			fail() {
				console.log('状态已过期')
				//已过期
				resolve(0)
			}
		})
	}).catch(res => {
		tips.toast(res.errMsg || '验证session失效');
	})
}

/**
 * 微信登录
 */
function weLogin() {
	return new Promise((resolve, reject) => {
		uni.login({
			success(res) {
				if (res.code) {
					let code = res.code;
					resolve(code)
				} else {
					tips.toast('微信登录失败~~');
				}
			}
		});
	})
}

/**
 * 后台登录
 */
function login(code, refreeid = '') {
	return new Promise((resolve, reject) => {
		request.post({
			url: api.wxloginXcx,
			data: {
				code: code,
				refreeid: refreeid,
			}
		}).then((res) => {
			uni.setStorageSync('token', res.token);
			MineIndex();
			resolve(res.token);
		}).catch(() => {
			reject(res);
		})
	})
}

/**
 * 用户信息获取
 */
function MineIndex(errFun) {
	request.post({
		url: api.getUserinfo
	}).then((res) => {
		intercept.setUserStatus(res);
	}).catch((err)=>{
		// 判断登录失败
		if(err.status == 401){
			if(errFun){
				tips.loading('重新登录');
				errFun()
			}
		}
	})
}

export default {
	checkSession,
	weLogin,
	login,
	MineIndex
}
