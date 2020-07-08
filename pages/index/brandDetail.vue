<template>
  <div class="brand-detail">
    <div class="top-img">
      <!-- <img :src="brand_detail.brand_logo" mode='' class="top-img" /> -->
        <swiper style="height: 332rpx;" v-if=" brand_detail.brand_banner && brand_detail.brand_banner.length>0" 
          interval="2000" duration="500" circular=true indicator-dots="false">
          <div v-for="(item,index) in brand_detail.brand_banner" :key="index">
            <swiper-item>
              <img  style="display:block;" :src="item">
            </swiper-item>
          </div>
        </swiper>
        <!-- <img style="width:100%;height:330rpx;display:block;" src=""> -->
    </div>
    <div class="header-bar">
      <div class="header-item" @click="changeIndex(0)">
        <div class="header-item-text" :class="activeIndex == 0?'item-active':''">有货</div>
      </div>
      <div class="header-item" @click="changeIndex(1)">
        <div class="header-item-text" :class="activeIndex == 1?'item-active':''">价格</div>
				<div class="order-arrows">
				   <div class="up-arrow" :class="activeIndex==1&&!priceOrder?'up-arrow-active':''"></div>
				  <div class="down-arrow" :class="activeIndex==1&&priceOrder?'down-arrow-active':''"></div>
				</div>
      </div>
      <div class="header-item" @click="changeIndex(2)">
        <div class="header-item-text" :class="activeIndex == 2?'item-active':''">销量</div>
        <div class="order-arrows">
           <div class="up-arrow" :class="activeIndex==2&&!xiaolOrder?'up-arrow-active':''"></div>
          <div class="down-arrow" :class="activeIndex==2&&xiaolOrder?'down-arrow-active':''"></div>
        </div>
      </div>
    </div>
		<div class="barnd-cats">
			<scroll-view scroll-x="true" style="white-space: nowrap;" >
				<div class="brand-cat" v-for="item in brand_detail.brand_cat" :key="item.id" @click="changeGoods(item.cat_id)">
				  <img :src="item.logo" class="logo-img" />
				  <div class="brand-name">{{item.cat_name}}</div>
				</div>
			</scroll-view>
		</div>
    <div class="goods-cards">
      <div class="goods" v-for="(item,index) in brand_goods" :key="index">
        <product :product="item" />
      </div>
      <!-- 分页加载更多 -->
      <div style="width:100%;">
        <load-more :status="loadMore"></load-more>
      </div>
    </div>
  </div>
</template>

<script>
import loadMore from '@/components/uni-load-more/uni-load-more.vue'  //1上拉加载更多 2正在加载 3我们是有底线的
import product from "@/components/product";

export default {
  components: {
    product,loadMore
  },
  data() {
    return {
      brandid: "",
      catid: "",
      ordertype: 6, //1 时间 3.销量  4 价格顺序 5价格倒序 6 更新 7 商品排序倒序 8商品排序升序
      brand_detail: {},
      brand_goods: [],
      activeIndex: 0, //0人气 1销售 2价格
      priceOrder: true, //false是默认顺序即升序 true是降序
			xiaolOrder:false,
      page: 1,
      pageSize: 10,
      loadMore:1,
    };
  },
  onLoad(option) {
    this.initData()
    this.brandid = option.brandid || '';
     // this.getBrandDetail();
		 let aInfo = {"status":1,"msg":"\u8fd4\u56de\u6210\u529f","data":{"id":"219","brand_name":"\u9177\u54bf\u718a","goods_class_id":"51","brand_logo":"https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200703\/baffc1ec754a1e927b55d7e5c0d32f4b.jpg","brand_description":"\u4e1c\u839e\u6c38\u65ed\u670d\u9970\u6709\u9650\u516c\u53f8\u662f\u4e00\u5bb6\u96c6\u8bbe\u8ba1\uff0c\u751f\u4ea7\u548c\u9500\u552e\u4e3a\u4e00\u4f53\u7684\u7ae5\u88c5\u4f01\u4e1a\uff0c\u4f4d\u4e8e\u4e2d\u56fd\u670d\u88c5\u540d\u9547---\u864e\u95e8\u3002\u6614\u65e5\u7684\u9500\u70df\u53e4\u9547\uff0c\u4eca\u65e5\u4e4b\u670d\u88c5\u540d\u57ce\uff0c\u517c\u5730\u5904\u7ca4\u3001\u6e2f\u6fb3\u95e8\u7ecf\u6d4e\u8d70\u5eca\u4ea4\u6c47\u5730\uff0c\u7194\u5386\u53f2\u539a\u91cd\u4e8e\u65f6\u5c1a\u524d\u77bb\u4e8e\u4e00\u4f53\uff0c\u6210\u5c31\u534e\u5357\u5730\u533a\u91cd\u8981\u7684\u4e13\u4e1a\u54c1\u724c\u670d\u88c5\u96c6\u6563\u5730\u3002\r\n\u516c\u53f8\u81ea2000\u5e74\u521b\u529e\u4ee5\u6765\uff0c\u672c\u7740\u201c\u6301\u7eed\u6539\u8fdb\uff0c\u6c38\u7eed\u7ecf\u8425\u201d\u7684\u7ecf\u8425\u7406\u5ff5\uff0c\u79ef\u6781\u5f00\u62d3\u548c\u4ea7\u54c1\u4e0d\u65ad\u7684\u5b8c\u5584\uff0c\u62e5\u6709\u5360\u5730\u9762\u79ef5000\u5e73\u65b9\u7c73\u7684\u73b0\u4ee3\u5316\u751f\u4ea7\u5382\u623f\u53ca\u914d\u5957\u5b9e\u65bd\uff0c\u62e5\u6709\u8fd1500\u591a\u4f4d\u9ad8\u7d20\u8d28\u7684\u7ba1\u7406\u56e2\u961f\u548c\u6280\u672f\u4eba\u624d\uff0c\u6211\u4eec\u7acb\u8db3\u5e7f\u4e1c\uff0c\u9762\u5411\u4e16\u754c\u3002","sort":"0","recommend":"0","create_time":"1593766675","update_time":"1593778634","letter":"","brand_banner":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200703\/6379bf82460452d02fc8eb3f285a818e.jpg"],"video_url":"","video_description":"","status":"1","path":null,"brand_cat":[],"likenum":"1"}}
		 let bList = {"status":1,"msg":"\u83b7\u53d6\u6210\u529f","data":{"list":[{"id":"33908","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e282020\u4e2d\u5927\u7ae5\u523a\u7ee3\u675f\u811a\u8fd0\u52a8\u4f11\u95f2\u88e4\u79cb\u5b63\u8584\u6b3e","stock":"4","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"397","class_id":"464","recommend":"0","d_integral":"0","code":"YX-PACK-33908","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1594001308","create_time":"1593858088","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"166.00","price_sale":"168.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/ba5ab88a54aed6eee53c8bfd87238207.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"50","is_wholesale":"0","is_replace":"0","wholesale_num":"6","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"6","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/eb38885b302b76bc996e6c998be39f0f.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/1476e7482a0b662977fab9ec0408650b.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/2cdf6ad55481bc4c2d3f319005676580.jpg"],"packprice_min":"168.00","packprice_max":"168.00","stocksnum":4,"brand_name":"\u9177\u54bf\u718a","class_name":"\u4f11\u95f2\u88e4","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"6"},{"id":"33910","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u5973\u7ae5\u7ee3\u82b1\u725b\u4ed4\u88e4\u957f\u88e4\u7d27\u8eab\u767e\u642d\u8584\u6b3e2020","stock":"4","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"397","class_id":"433","recommend":"0","d_integral":"0","code":"YX-PACK-33910","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1594001300","create_time":"1593858276","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"236.00","price_sale":"175.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/ca8a9847f8d974518520dd3592bca457.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"23","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/9cd7be6b6f01c57841dbb8785995a570.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/45ade33b5042dfc8b0382bf54a11e2a5.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/4ee076dba22c61be70235fa9b12493f5.jpg"],"packprice_min":"175.00","packprice_max":"175.00","stocksnum":4,"brand_name":"\u9177\u54bf\u718a","class_name":"\u725b\u4ed4\u88e4","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"},{"id":"33845","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u4e2d\u5c0f\u7ae5\u7c73\u767d\u8272\u5370\u82b1\u5706\u9886\u8584\u6b3eT\u6064\u957f\u8896\u4e0a\u8863","stock":"5","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"183","class_id":"525","recommend":"0","d_integral":"0","code":"YX-PACK-33845","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593858892","create_time":"1593840888","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"106.00","price_sale":"105.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/76ce4aeb6d187390ab82284fe443d343.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"8","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/5faf6278c5779910884307ffd0169f2b.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/b0e6271470a0ad429a5363cb109bb36a.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/6852ba44e0866951c7de0d7e5d41dc94.jpg"],"packprice_min":"105.00","packprice_max":"105.00","stocksnum":5,"brand_name":"\u9177\u54bf\u718a","class_name":"\u4e0a\u8863","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"},{"id":"33836","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u5370\u82b1\u62fc\u8272\u5706\u9886\u6253\u5e95\u886bT\u6064\u957f\u8896\u4e0a\u8863\u79cb\u5b63","stock":"9","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"183","class_id":"525","recommend":"0","d_integral":"0","code":"YX-PACK-33836","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593858761","create_time":"1593832338","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"129.00","price_sale":"115.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/b7aa45adfd363912f96e562719f4f9f2.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"13","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5\/5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/ecea5255ee8956c043767739884266ba.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/a62bdea3f0faa036f04473070f70580d.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/2541b8ee91170e91a695ba5f2d445a91.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/3b9cef6a2ef0faf0bc7a68000b789c03.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/c73444e48edce3b1ba03629fd4013890.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/86c0492d0b8521326c9398ba7743f17b.jpg"],"packprice_min":"115.00","packprice_max":"115.00","stocksnum":9,"brand_name":"\u9177\u54bf\u718a","class_name":"\u4e0a\u8863","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"},{"id":"33907","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u5973\u7ae5\u7231\u5fc3\u62c9\u94fe\u4f11\u95f2\u5916\u5957\u4e2d\u5927\u7ae5\u79cb","stock":"4","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"398","class_id":"548","recommend":"0","d_integral":"0","code":"YX-PACK-33907","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593855503","create_time":"1593855367","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"246.00","price_sale":"228.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/99fcade2c2088546d3fa045167c394cc.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"37","is_wholesale":"0","is_replace":"0","wholesale_num":"6","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"6","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/ef648cbc1be64a183cd0353bc7fd0803.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/8ce5c50298c776f41c74cd5b17c0cd5d.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/972db54daef4f36df888df5c38e4a770.jpg"],"packprice_min":"228.00","packprice_max":"228.00","stocksnum":4,"brand_name":"\u9177\u54bf\u718a","class_name":"\u5916\u5957","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"6"},{"id":"33905","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u5973\u4e2d\u5927\u7ae5\u7ee3\u82b1\u9488\u7ec7\u5706\u9886T\u6064\u957f\u8896\u5047\u4e24\u4ef6\u79cb","stock":"4","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"183","class_id":"525","recommend":"0","d_integral":"0","code":"YX-PACK-33905","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593855272","create_time":"1593855022","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"179.00","price_sale":"168.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"53","is_wholesale":"0","is_replace":"0","wholesale_num":"6","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"6","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/f479d518d48da0188fa6f324ab68c331.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/22d30301df69f977c03a27463e93bdc0.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/96ac6f20a2aa9365d9f4d8b19d40f1fe.jpg"],"packprice_min":"168.00","packprice_max":"168.00","stocksnum":4,"brand_name":"\u9177\u54bf\u718a","class_name":"\u4e0a\u8863","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"6"},{"id":"33904","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u7537\u7ae5\u62fc\u8272\u98ce\u8863\u5916\u5957\u97e9\u7248\u767e\u642d2020\u79cb","stock":"12","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"398","class_id":"398","recommend":"0","d_integral":"0","code":"YX-PACK-33904","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593853497","create_time":"1593853413","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"259.00","price_sale":"190.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/c6cab563a64ad7da0631bf363f119636.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"23","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/c8c1e40f6830875cfff1dd43bb8b84eb.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/d5d531c91a2d8a30588a56dbe1496acb.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/3da6ac02ffb3556520d2f79b204f2348.jpg"],"packprice_min":"190.00","packprice_max":"190.00","stocksnum":12,"brand_name":"\u9177\u54bf\u718a","class_name":"\u5916\u5957","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"},{"id":"33902","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u5c0f\u8001\u864e\u5370\u82b1\u80cc\u5fc3\u8fde\u5e3d\u62c9\u94fe\u5916\u59572020\u79cb","stock":"3","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"398","class_id":"548","recommend":"0","d_integral":"0","code":"YX-PACK-33902","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593853069","create_time":"1593852946","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"179.00","price_sale":"140.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/dc8fec79391f322df0a55a7630ab4a2a.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"12","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/2cb330029461b4ff552e86387a86dbf6.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/a25cbc17500c4d3c5f31e302b054b081.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/dbcc4cf1c8a57fb8b5e45f709088967e.jpg"],"packprice_min":"140.00","packprice_max":"140.00","stocksnum":3,"brand_name":"\u9177\u54bf\u718a","class_name":"\u5916\u5957","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"},{"id":"33901","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e28\u4e2d\u5c0f\u7ae5\u62c9\u94fe\u98ce\u8863\u5916\u59572020\u79cb\u5b63\u6f6e","stock":"9","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"398","class_id":"548","recommend":"0","d_integral":"0","code":"YX-PACK-33901","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593852853","create_time":"1593852687","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"219.00","price_sale":"165.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/f6c5fa47abd53c0d22e7bd52da133086.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"30","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/5d1dd5a0304df28d1d0f20bc42b923ba.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/d35e6dd809661a687216a116102cc79c.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/a7b8f6718898d61f6ca888fbe4ecd7ca.jpg"],"packprice_min":"165.00","packprice_max":"165.00","stocksnum":9,"brand_name":"\u9177\u54bf\u718a","class_name":"\u5916\u5957","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"},{"id":"33898","brand_id":"219","tags":"","brand_stcat":"0","title":"\u9177\u54bf\u718a\u4e282020\u79cb\u5b63\u8584\u6b3e\u9a6c\u7532\u62c9\u94fe\u5916\u5957\u4f11\u95f2\u767e\u642d","stock":"21","stock_virtual":"0","selling":"0","shelves":"2","p_class_id":"398","class_id":"548","recommend":"0","d_integral":"0","code":"YX-PACK-33898","top":"0","season_hot":"0","restrictions":"0","description":"","group_buy":"0","update_time":"1593851865","create_time":"1593851752","goods_type":"1","latest_promotion":"0","comment_member":"0","advance_date":"0","weight":"1.00","point_limit":"0","keyword":"","stock_warning":"0","is_fine":"0","is_new":"0","is_normal":"0","is_entity":"0","style":"0","season":"2020\u79cb","price_market":"186.00","price_sale":"140.00","price_wholesale":"0.00","price_purchase":"0.00","price_retail":"0.00","price_retail_low":"0.00","video_url":"\/uploads\/20200704\/2f6b45cfba5ffb6cf1b0b6833af8fc88.mp4","groundingtime":"0","top_tpl":"52","bottom_tpl":"51","salenum":"0","likenum":"0","comment_num":"0","viewnum":"10","is_wholesale":"0","is_replace":"0","wholesale_num":"5","goods_sort":"-15","ext_cat_1":"0","ext_cat_2":"0","ext_cat_3":"0","ext_cat_4":"0","ext_cat_5":"0","ext_attr":"","is_level_limit":"0","level_limit":"","level_limit_time":"0","every_pack":"5\/5","is_seckill":"0","is_free_shipping":"0","year":"2020","season_id":"3","sku_goods_id":"0","sku_code":"","kind_ratio":"","year_area_id":"0","child_gender_id":"0","brand_area_id":"0","brand_material_id":"0","pic_urls":["https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/cf44bde4e149758eaffddf50e1ad8e9f.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/d2aa4330ceeddba86be11b8d6e784a83.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/c9cad290a644c54bd1f1b58022614820.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/b9a6bb10f8e28742c566acfa0b016cc9.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/5fef112d0c1c174129ba8ca5863051d3.jpg","https:\/\/youxuanyouping.oss-cn-shenzhen.aliyuncs.com\/uploads\/20200704\/39936e3b70e24d0e0cc090154e2aeb1e.jpg"],"packprice_min":"140.00","packprice_max":"140.00","stocksnum":21,"brand_name":"\u9177\u54bf\u718a","class_name":"\u5916\u5957","style_name":"","area_name":"","material_name":"","seasion_name":"\u79cb","sku_num":"5"}],"total":"71"}}
		 this.brand_detail = aInfo.data
		 this.brand_detail.brand_cat = [{
			 logo:'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200401/d742d7b63c4a0d1d7e39d390f560971a.jpg',
			 cat_name:'上衣'
			 },{
			 logo:'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200401/d742d7b63c4a0d1d7e39d390f560971a.jpg',
			 cat_name:'上衣'
			 },{
			 logo:'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200401/d742d7b63c4a0d1d7e39d390f560971a.jpg',
			 cat_name:'上衣'
			 },{
			 logo:'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200401/d742d7b63c4a0d1d7e39d390f560971a.jpg',
			 cat_name:'上衣'
			 },{
			 logo:'https://youxuanyouping.oss-cn-shenzhen.aliyuncs.com/uploads/20200401/d742d7b63c4a0d1d7e39d390f560971a.jpg',
			 cat_name:'上衣'
			 }]
		 this.brand_goods  = bList.data.list
  },
  onShow() {
   
  },
  onReachBottom(){
    if(this.loadMore==3 ||this.loadMore==2) return
   
    this.getBrandDetailGoods();
  },
  methods: {
    initData(){
      this.page=1,
      this.pageSize=10,
      this.ordertype = 6
      this.activeIndex = 0
      this.priceOrder = true
      this.brand_goods = []
    },
    changeIndex(index) {
      this.activeIndex = index;
      this.brand_goods = []
      this.page=1;
      if (this.activeIndex == 0) {  //  人气
        this.priceOrder = true;
        this.ordertype = 6
        this.getBrandDetailGoods()
      }

      if(this.activeIndex == 1){  //销量
        this.priceOrder = !this.priceOrder
        this.ordertype = 3
				if(this.priceOrder){  //价格降序
				  this.ordertype = 7
				  this.getBrandDetailGoods()
				}else{                //价格升序
				  this.ordertype = 8
				  this.getBrandDetailGoods()
				}
      }

      if (this.activeIndex == 2) {
        this.xiaolOrder = !this.xiaolOrder;
        if(this.xiaolOrder){  //价格降序
          this.ordertype = 7
          this.getBrandDetailGoods()
        }else{                //价格升序
          this.ordertype = 8
          this.getBrandDetailGoods()
        }
      }
    },
    changeGoods(catid){
      this.page=1;
      this.catid = catid;
      this.getBrandDetailGoods()
    },
    /* 品牌详情 */
    getBrandDetail() {
      this.$fly
        .get(this.$api.getBrandDetail, {
          brandid: this.brandid
        })
        .then(res => {
          if (res.status == 1) {
            this.brand_detail = res.data;
            if(res.data.brand_cat[0]){
              this.catid=res.data.brand_cat[0].cat_id;
              this.getBrandDetailGoods();
            }else{
              this.catid = '';
              this.getBrandDetailGoods();
            }
          }
        });
    },
    /* 品牌详情商品 */
    getBrandDetailGoods() {
      this.loadMore=2;
      this.$fly
        .post(this.$api.getBrandDetailGoods, {
          brandid: this.brandid,
          catid:this.catid,
          ordertype:this.ordertype,
          page:this.page,
          pageSize:this.pageSize
        })
        .then(res => {
          if (res.status == 1) {
            if(this.page==1){
              this.brand_goods = res.data.list;
            }else{
              if(res.data.list.length>0)
                this.brand_goods=this.brand_goods.concat(res.data.list);
            }
            if(res.data.list.length<this.pageSize){
              this.loadMore=3;
            }else{
              this.page++;
              this.loadMore=1;
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.brand-detail {
	min-height: 100vh;
	background: #f3f3f3;
  .top-img {
    width: 100%;
    height: 332rpx;
    img{
      width:100%;
      height: 100%;
    }
  }
  

  .barnd-cats {
    margin: 10rpx 20rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .brand-cat {
      padding-top: 20rpx;
			display: inline-block;
			text-align: center;
			background: #fff;
			margin-right: 20rpx;
			width: 180rpx;
			height: 200rpx;

      .logo-img {
        width: 124rpx;
        height: 124rpx;
      }
      .brand-name {
        margin-top: 10rpx;
        text-align: center;
        font-size: 22rpx;
        font-family: PingFang-SC-Regular;
        font-weight: bold;
        color: rgba(96, 96, 96, 1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .header-bar {
    display: flex;
    flex-direction: row;
		align-items: center;
    width: 100%;
		height: 90rpx;
		background: #fff;
    .header-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
			height: 90rpx;
			line-height: 90rpx;
      box-sizing: border-box;
      // padding: 30rpx 0 0rpx;
      .header-item-text {
        font-size: 30rpx;
        font-weight: 500;
        color: #333333;
        text-align: center;
        padding-bottom: 15rpx;
      }
      .active-line {
        width: 69rpx;
        height: 4rpx;
        background-color: #F4CD16;
      }
      .item-active {
        color: #F22732;
      }
      .order-arrows{
      position: absolute;
      top:0;
      right: 75rpx;
      margin-top: 38rpx;
      color: #eee;
      .up-arrow{
          width: 6px;
          height: 6px;
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          transform: rotate(-45deg);
        // border-width: 10rpx;
        // border-style: solid;
        // border-color: transparent transparent #eee transparent;
         margin-bottom: -1rpx;
      }
      .down-arrow{
           width: 6px;
          height: 6px;
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          transform: rotate(135deg);
        // border-width: 10rpx;
        // border-style: solid;
        // border-color:#eee transparent transparent transparent;
        // transform: rotate(180deg); /*顺时针旋转90°*/
      }
      .up-arrow-active{
        border-color: #F22732;
        color: #F22732;
      }
      .down-arrow-active{
        border-color:#F22732;
        color: #F22732;

      }
    }
    }
  }
	
  .goods-cards {
    padding: 0 20rpx;
		 display: flex;
		 flex-wrap:wrap;
		 justify-content: space-between;
    .goods {
      width: 345rpx;
      margin-bottom: 20rpx;
      border-radius: 8rpx;
    }
  }
}
</style>
