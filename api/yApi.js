import baseHost from './config'

let host = baseHost.baseUrl;

const yApi = {

  wxloginXcx:`${host}/Api/WeChat/wxlogin_xcx`,          //小程序登录
  getUserinfo:`${host}/Api/user/getUserinfo`,           //用户信息
  updateUserinfo:`${host}/Api/WeChat/updateUserinfo`,   //更新用户信息
  getCodeProduct:`${host}/Api/goods/getCodeProduct`,    //二维码置换商品id
  
  banner:`${host}/api/index/banner`,                    //banner列表
  hotSearch:`${host}/api/index/hot_search`,             //热门搜索
  xcxhome:`${host}/api/index/xcxhome`,                  //小程序首页
  keyWordSearch:`${host}/Api/index/keyWordSearch`,      //关键词搜索 可能喜欢
  
  newprocudt_xcx:`${host}/api/index/newprocudte_xcx`,            //刚刚上新页面接口
  newprocudt:`${host}/api/index/newprocudt`,            //刚刚上新
  preprocudt:`${host}/api/index/preprocudt`,            //即将到货
  comingGoods:`${host}/Api/Index/comingGoods`,          //即将上新
  quickWare:`${host}/api/index/quickWare`,              //快速补货
  
  limitTimearr:`${host}/Api/index/timearr`,             //秒杀时间数组
  limitprocudt:`${host}/api/index/limitprocudt`,        //限时秒杀
  
  barndsIndex:`${host}/api/brand/brands_index`,         //品牌馆
  collecBrands:`${host}/api/brand/add_collection`,      //收藏品牌
  brandInfo:`${host}/api/brand/brandinfo`,              //品牌详情
  brandGoodlist:`${host}/api/brand/goodlist`,           //品牌商品列表
  
  concatCategory:`${host}/api/index/concat`,             //代卖分类
  conlist:`${host}/api/index/conlist`,                   //代卖tab列表
  concatGoodlist:`${host}/api/index/goodlist`,           //分类商品
  concatBrands:`${host}/api/brand/brands`,               //品牌列表
  
  goodsDetail:`${host}/api/goods/goods`,                 //商品详情
  recommendationBrand:`${host}/Api/brand/recommendation_brand`,  //推荐品牌
  goodsStock:`${host}/api/goods/goodsstock`,             //商品库存
  goodsCollection:`${host}/api/cart/add_collection`,     //收藏商品
  addToCart:`${host}/api/cart/add_cart`,                 //添加进货车
  cartNum:`${host}/api/cart/cart_num`,                   //购物车数量
  // xcxCart:`${host}/api/cart/xcxCart`,                    //进货车列表
  delCart:`${host}/api/cart/del_cart`,                   //删除购物车
  checkStock:`${host}/api/goods/checkStock`,             //检测库存是否缺货
  
  goBuy:`${host}/Api/Order/goBuy`,                       //结算
  orderBegin:`${host}/Api/Order/orderBegin_xcx`,             //支付开始
  orderPay:`${host}/Api/Order/pay_xcx`,                      //去支付
  wePay:`${host}/Api/WxJsApi/getJsApiData`,              //调起微信支付
  orderInfo:`${host}/Api/order/orderInfo`,               //确认订单详情
  
  serviceCenter:`${host}/Api/Article/serviceCenter`,         //客服中心常见问题
  
  xcxCart:`${host}/api/cart/xcxCart_test`,                    //进货车列表测试

}

export default yApi;