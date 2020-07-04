import tags from '@/utils/tags.js'

const swiperLink = {
  tabList: [
  	'/pages/index/index',
  	'/pages/category/category',
  	'/pages/helpBuy/helpBuy/helpBuy',
  	'/pages/cart/cart',
  	'/pages/center/user/user',
  ],
  linkTo(link){
	var arr = link.split('?');
	var path = arr[0] || '';
	var query = arr[1] || '';
	if (this.tabList.indexOf(path) == -1) {
		uni.navigateTo({
			url: link
		})
	} else {
		if(path=='/pages/index/index' && query!=''){
			var q = query.split('=');
			tags.indexTabTag = q[1];
			uni.reLaunch({
			    url: path
			});
		}else if(path=='/pages/helpBuy/helpBuy/helpBuy' && query!=''){
			var q = query.split('=');
			tags.helpBuyTabTag = q[1];
			uni.reLaunch({
			    url: path
			});
		}else{
			uni.reLaunch({
			    url:link
			});
		}
	}  
  }
}

export default swiperLink