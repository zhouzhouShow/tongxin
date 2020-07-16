import utils from '@/utils/index.js'

/**
 * 分享参数配置
 */

const shareConfig = {
	isGetPageQuery: false,
	config: [
		//商品详情 二维码  //参数 id
		{
			h: 0,
			path: '/pages/good/goodDetail',
		},
		//首页分享  //参数 navId
		{
			h: 1,
			path: '/pages/index/index',
		},
		//星妈推荐
		{
			h: 2,
			path: '/pages/index/xinma-recommend',
		},
		//爆款好物
		{
			h: 3,
			path: '/pages/index/hotGood',
		},
		//限时抢购
		{
			h: 4,
			path: '/pages/index/timeLimitedGood',
		},
		//秋冬上架
		{ 
			h: 5,
			path: '/pages/index/season',
		},
		//品牌详情  id
		{ 
			h: 6,
			path: '/pages/index/brandDetail',
		},
		//种草详情 id
		{ 
			h: 7,
			path: '/pages/seeding/productDetail',
		}
	],
	sharePage(query) {
		return new Promise((resolve, reject) => {
		  let data
			// console.log(query,'我的')
		  if(query.q){ //扫码进入
		    // data = this.parsingQuery(query);
		    // data.isScanCode = true //是否扫码进入
		    // console.log('二维码的:',data)
		    // if (data.path != '/pages/index/index') {
		    //   wx.setStorageSync('routerData', data)
		    // }
		  }else if(query.h){ //分享进入
		    data = {...this.config[query.h],id:query.id};
		    data.isScanCode = false //是否扫码进入
		    console.log('分享的:',data)
		    if (data.path != '/pages/index/index') {
		      wx.setStorageSync('routerData', data)
		    }
		  }else if(decodeURIComponent(query.scene).includes('user_refreeid')){ //推广进来
				// console.log('分销的:',data)
				// let str = decodeURIComponent(query.scene)
				// let id = str.substr(str.indexOf('=')+1)
				// data = {...this.config[1],refreeid:id};
				// data.isDistribution = true //是否分销进入
				// console.log(data)
				// if (data.path != '/pages/index/index') {
				//   wx.setStorageSync('routerData', data)
				// }
				// data = this.parsingQuery(query);
				// data.isScanCode = true //是否扫码进入
				// console.log('二维码的:',data)
				// if (data.path != '/pages/index/index') {
				//   wx.setStorageSync('routerData', data)
				// }
			}
		    resolve(data)
		  }
		)
	},
	//参数处理
	parsingQuery(query) {
		var initData = {},
			returnData = {};
			console.log(query)
		initData = query.scene ? this.QrCodeParameter(query) : (query.q ? this.ErcodeParameter(query) : query);
		var data = this.config[initData.p];
		returnData = data;
		returnData.query = initData;
		return returnData;
	},
	// 小程序码处理
	QrCodeParameter(query) {
		const scene = decodeURIComponent(query.scene)
		var scenearr = scene.split('&');
		var q = {};
		for (var i = 0; i < scenearr.length; i++) {
			var sceneArri = scenearr[i].split('=');
			q[sceneArri[0]] = sceneArri[1];
		}
		return q;
	},
	//普通二维码处理
	ErcodeParameter(query) {
		const scene = decodeURIComponent(query.q);
		var eArr = scene.split('?')[1];
		var scenearr = eArr.split('&');
		var q = {};
		for (var i = 0; i < scenearr.length; i++) {
			var sceneArri = scenearr[i].split('=');
			q[sceneArri[0]] = sceneArri[1];
		}
		q.p = 0;
		return q;
	},

	parseParam(param) {
		var paramStr = "";
		for (var i in param) {
			paramStr += "&" + i + "=" + encodeURIComponent(param[i]);
		}
		return paramStr.substr(1);
	},

	//首页的跳转处理
	shareLinkTo() {
		return new Promise((resolve,reject)=>{
			if (uni.getStorageSync("routerData") && this.isGetPageQuery) {
				var data = uni.getStorageSync("routerData");
				console.log(data)
				resolve(data)
			}
		})
		
	}

}
export default shareConfig
