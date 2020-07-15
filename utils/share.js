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
			isCode: true,
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
			let data = this.parsingQuery(query);
			let str = data.path;
			data.url = data.path + '?' + this.parseParam(data.query);
			if (data.path != '/pages/index/index') {
				wx.setStorageSync('routerData', data)
			}
			resolve(data)
		})
	},
	//参数处理
	parsingQuery(query) {
		var initData = {},
			returnData = {};
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
		if (uni.getStorageSync("routerData") && this.isGetPageQuery) {
			var data = uni.getStorageSync("routerData");
			if (data.isCode) {
				utils.code2goods(data.query.id).then(res => {
					wx.navigateTo({
						url: data.path + '?id=' + res.goods_id
					});
				})
			} else if(data.isTab) {
				uni.switchTab({
					url: data.url
				})
			}else{
				wx.navigateTo({
					url: data.url
				});
			}
			this.isGetPageQuery = false;
			uni.removeStorageSync('routerData');
		}
	}

}
export default shareConfig
