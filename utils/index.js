import api from '../api/api'
import config from '../api/config'
import request from '../js_sdk/jamling-request/j-request/request.js'
import login from '@/utils/login.js'

/**
 * 微信支付
 */
function wepay(data) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success: function(res) {
				// console.log('wepaysuccess:' + JSON.stringify(res));
				resolve();
			},
			fail: function(err) {
				// console.log('wepayfail:' + JSON.stringify(err));
				reject()
			}
		});
	})
}

/**
 * 数据处理优化，选取渲染的数据
 */
function simplifyArticleList(list, arr) {
	var obj = {};
	arr.forEach(val => {
		obj[val] = '';
	})
	return list.map(item => {
		var obj2 = Object.create(obj);
		for (var i in obj) {
			obj2[i] = item[i]
		}
		return obj2
	})
}


function chooseImg(count = 1) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			sizeType: ['compressed', 'original'],
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

function uploadFile(path, title = '上传中') {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: title,
			mask: true
		})
		console.log(api)
		uni.uploadFile({
			url: config.baseUrl +api.uploadImage,
			filePath: path,
			name: 'file',
			formData: {
				token: uni.getStorageSync('token')
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			complete: function() {
				uni.hideLoading()
			}
		})
	})
}

var regYear = new RegExp("(y+)", "i");

function formatTime(timestamp, format) {
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	timestamp = parseInt(timestamp);
	var realDate = new Date(timestamp);

	function timeFormat(num) {
		return num < 10 ? '0' + num : num;
	}

	var date = [
		["M+", timeFormat(realDate.getMonth() + 1)],
		["d+", timeFormat(realDate.getDate())],
		["h+", timeFormat(realDate.getHours())],
		["m+", timeFormat(realDate.getMinutes())],
		["s+", timeFormat(realDate.getSeconds())],
		["q+", Math.floor((realDate.getMonth() + 3) / 3)],
		["S+", realDate.getMilliseconds()],
	];
	var reg1 = regYear.exec(format);
	// console.log(reg1[0]);
	if (reg1) {

		format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
	}
	for (var i = 0; i < date.length; i++) {
		var k = date[i][0];
		var v = date[i][1];

		var reg2 = new RegExp("(" + k + ")").exec(format);
		if (reg2) {
			format = format.replace(reg2[1], (reg2[1].length == 1 ?
				v : ("00" + v).substring(("" + v).length)));

		}
	}
	return format;
}

/**
 * 时间搓转倒计时时间
 */

function countdownTime(timestamp, format) {
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	timestamp = parseInt(timestamp + 946656000000);
	// 946656000000  2000/1/1 00:.00:00
	var realDate = new Date(timestamp);

	function timeFormat(num) {
		return num < 10 ? '0' + num : num;
	}

	var date = [
		["M+", timeFormat(realDate.getMonth())],
		["d+", timeFormat(realDate.getDate() - 1)],
		["h+", timeFormat(realDate.getHours())],
		["m+", timeFormat(realDate.getMinutes())],
		["s+", timeFormat(realDate.getSeconds())],
		["q+", Math.floor((realDate.getMonth() + 3) / 3)],
		["S+", realDate.getMilliseconds()],
	];
	var reg1 = regYear.exec(format);
	if (reg1) {

		format = format.replace(reg1[1], ((realDate.getFullYear() - 2000) + '').substring(4 - reg1[1].length));
	}
	for (var i = 0; i < date.length; i++) {
		var k = date[i][0];
		var v = date[i][1];
		var reg2 = new RegExp("(" + k + ")").exec(format);
		if (reg2) {
			format = format.replace(reg2[1], (reg2[1].length == 1 ?
				v : ("00" + v).substring(("" + v).length)));

		}
	}
	return format;
}

/**
 * 设置标题
 */
function setTitle(title) {
	uni.setNavigationBarTitle({
		title: title,
	});
}

/**
 * 分享
 */
function onShareAppMessage(title, path, callback, imageUrl) {
	return {
		title: title,
		path: path,
		imageUrl: imageUrl || '',
		success(res) {
			console.log("转发成功！");
			if (!res.shareTickets) {
				//分享到个人
				console.log("shareFriendSuccess!");
				callback && callback();
				// api.shareFriend().then(() => {
				// 	console.warn("shareFriendSuccess!");
				// 	//执行转发成功以后的回调函数
				// 	callback && callback();
				// });
			} else {
				//分享到群
				console.log("groupShareSuccess!");
				callback && callback();
			}
		},
		fail: function(res) {
			console.log("转发失败！");
		}
	};
}

/**
 * 更新用户信息
 */
function updateUserinfo(user) {
	return new Promise((resolve, reject) => {
		login.weLogin().then((code) => {
			login.login(code);
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					request.post({
						url: api.updateUserinfo,
						data: {
							wxname: infoRes.userInfo.nickName,
							headimg: infoRes.userInfo.avatarUrl,
							gender: infoRes.userInfo.gender,
							mobile: infoRes.userInfo.mobile || '',
							iv: encodeURIComponent(infoRes.iv),
							encryptedData: infoRes.encryptedData,
						}
					}).then(() => {
						resolve(true);
					}).catch(() => {
						resolve(false);
					})
				}
			})
		})
	})
}
/**
 * 保存图片
 */
function saveImgToPhotosAlbum(imgUrl, text = '如需保存，请点击二维码授权') {
	// var imgSrc = "https://xcx.yuanpincang.com/uploads/bb/1.png"
	var imgSrc = imgUrl;
	uni.showLoading({
		title: '正在保存',
		icon: 'none'
	})
	uni.downloadFile({
		url: imgSrc,
		success: function(res) {
			// console.log(res);
			//图片保存到本地
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success: function(data) {
					uni.hideLoading()
					uni.showToast({
						title: '保存成功',
						icon: 'success',
						duration: 2000
					})
				},
				fail: function(err) {
					console.log(err);
					uni.hideLoading()
					if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
						uni.showToast({
							title: text,
							icon: "none"
						})
					}
				},
				complete(res) {
					// console.log(res);
				}
			})
		},
		fail: function(err) {
			uni.hideLoading()
		}
	})
};
/**
 * 打开设置 设置图片权限
 */
function stopWxCodeImgPopup(wxCodeImg) {
	uni.getSetting({
		success: function(res) {
			if (!res.authSetting['scope.writePhotosAlbum']) {
				uni.openSetting({
					success(settingdata) {
						// console.log(settingdata)
						if (settingdata.authSetting['scope.writePhotosAlbum']) {
							saveImgToPhotosAlbum(wxCodeImg);
						} else {
							console.log('获取权限失败')
						}
					}
				})
			}
		}
	})
};
//二维码id置换商品id
function code2goods(id) {
	return new Promise((resolve, reject) => {
		request.post({
			url: api.getCodeProduct,
			data: {
				errcode_id: id
			}
		}).then((res) => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		})
	})
}

function makePhone(phone) {
	uni.makePhoneCall({
		phoneNumber: phone
	});
}

//获取待付款订单数量
function setCenterTabBarBadge() {
	request.post({
		url: api.myOrder,
		data: {
			statu_stype: 1,
			page: 1,
			pageSize: 1
		}
	}).then((res) => {
		if (res.total == 0) {
			uni.removeTabBarBadge({
				index: 4,
			})
		} else {
			uni.setTabBarBadge({
				index: 4,
				text: res.total.toString()
			})
		}

	}).catch((err) => {})

}

function getTestToken(){
	request.post({
		url: api.getTestToken,
		data: {
			user_id:'11993'
		}
	}).then((res) => {})
	.catch((err) => {})
}

function previewImage(list,index = 0){
	uni.previewImage({
		urls:list,
		current:index
	})
}

export default {
	wepay,
	simplifyArticleList,
	chooseImg,
	uploadFile,
	formatTime,
	setTitle,
	countdownTime,
	onShareAppMessage,
	updateUserinfo,
	saveImgToPhotosAlbum,
	stopWxCodeImgPopup,
	code2goods,
	makePhone,
	setCenterTabBarBadge,
	getTestToken,
	previewImage
}
