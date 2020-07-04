import request from '../js_sdk/jamling-request/j-request/request.js'
import _config from './config.js'

request.setConfig({
	baseUrl: _config.baseUrl,
	contentType: _config.contentType,
	debug: false
})

// 请求拦截
request.interceptor.request = (config => {
	// 给data添加全局请求参数token 开发时写死
	let token = uni.getStorageSync("token") || '';
	// let token = 'MTU3NjkwMzQ4Nn6Le2eGiYB1';
	if (!config.data.token) {
		config.data.token = token;
	}
	// 给header添加全局请求参数token
	if (!config.header.token) {
		// config.header.token = 'my_token'
		// config.header.token = 'MTU3NjM5NDA3OX6hj2KFr4h1'
	}
	// 添加一个自定义的参数，默认异常请求都弹出一个toast提示
	if (config.toastError === undefined) {
		config.toastError = true
	}
	return config;
})

// 全局的业务拦截
request.interceptor.response = ((res, config) => {
	if (res.status === 1) {
		res.success = true;
		// return res;
	} else if (res.status === 0) {
		uni.showToast({
			title: res.msg,
			duration: 2000,
			icon: 'none'
		})
		// token失效，需要重新登录
		// uni.navigateTo({
		//     url: '/pages/loign/login'
		// })
	}
	return res;
})


// 全局的错误异常处理
request.interceptor.fail = ((res, config) => {
	let ret = res;
	let msg = ''
	if (res.statusCode === 200) { // 业务错误
		msg = res.data.msg
		ret = res.data
	} else if (res.statusCode > 0) { // HTTP错误
		msg = '服务器异常[' + res.statusCode + ']'
	} else { // 其它错误
		msg = res.errMsg
	}
	if (config.toastError) {
		if (res.statusCode != 404) {
			uni.showToast({
				title: msg,
				duration: 2000,
				icon: 'none'
			})
		} else {
			console.log(msg);
		}
	}
	// if (config.toastError) {
	// 	uni.showToast({
	// 		title: msg,
	// 		duration: 2000,
	// 		icon: 'none'
	// 	})
	// }
	return ret;
})

export default request;
