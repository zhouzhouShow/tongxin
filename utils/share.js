import utils from '@/utils/index.js'
import tags from '@/utils/tags.js'

/**
 * 分享参数配置
 */

const shareConfig = {
	isGetPageQuery: false,
	config: [
		//商品详情 二维码  //参数 id
		{
			p: 0,
			path: '/pages/shopkeeper/product/product',
			isCode: true,
		},
		//首页分享  //参数 navId
		{
			p: 1,
			path: '/pages/index/index',
		},
		//推荐
		{
			p: 2,
			path: '/pages/index/index',
			isRefreed: true
		},
		//商品详情 分享  //参数 id
		{
			p: 3,
			path: '/pages/shopkeeper/product/product',
		},
		//刚刚上新 0 即将上新 1  快速补货 2   //参数 type 
		{
			p: 4,
			path: '/pages/shopkeeper/new-shop-now/new-shop-now',
		},
		//代买  navId
		{ 
			p: 5,
			path: '/pages/helpBuy/helpBuy/helpBuy',
			isTab:true,
		},
		//分类  pClassId  navId  cateId  isReplace  title
		{ 
			p: 6,
			path: '/pages/shopkeeper/product/product-cate-page',
		},
		//品牌分类  id
		{ 
			p: 7,
			path: '/pages/shopkeeper/shop-brand/shop-brand',
		},
		//秒杀  id
		{ 
			p: 8,
			path: '/pages/shopkeeper/seckill-page/seckill-page',
		},
		//最后疯抢  id
		{ 
			p: 9,
			path: '/pages/shopkeeper/seckill-page/last-rob',
		},
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
					uni.navigateTo({
						url: data.path + '?id=' + res.goods_id
					});
				})
			} else if(data.isTab) {
				uni.switchTab({
					url: data.url
				})
			}else{
				uni.navigateTo({
					url: data.url
				});
			}
			this.isGetPageQuery = false;
			uni.removeStorageSync('routerData');
		}
	}

}
export default shareConfig
