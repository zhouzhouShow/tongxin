<template>
  <div class="brand-detail">
    <div class="top-img">
      <!-- <img :src="brand_detail.brand_logo" mode='' class="top-img" /> -->
        <swiper style="height: 332rpx;" v-if=" brand_detail.brand_banner && brand_detail.brand_banner.length>0" 
          interval="2000" duration="500" circular=true indicator-dots="false">
          <div v-for="(item,index) in brand_detail.brand_banner" :key="index">
            <swiper-item>
              <img  style="display:block;" :src="item" mode="aspectFill">
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
				   <div class="iconfont iconarrow2 rowbox " style="margin-bottom: 10rpx;" :class="activeIndex==1&&!priceOrder?'active':''"></div>
				  <div class="iconfont iconarrow rowbox " :class="activeIndex==1&&priceOrder?'active':''"></div>
				</div>
      </div>
      <div class="header-item" @click="changeIndex(2)">
        <div class="header-item-text" :class="activeIndex == 2?'item-active':''">销量</div>
        <div class="order-arrows">
           <div class="iconfont iconarrow2 rowbox " style="margin-bottom: 10rpx;" :class="activeIndex==2&&!xiaolOrder?'active':''"></div>
          <div class="iconfont iconarrow rowbox " :class="activeIndex==2&&xiaolOrder?'active':''"></div>
        </div>
      </div>
    </div>
		<div class="barnd-cats">
			<scroll-view scroll-x="true" style="white-space: nowrap;" >
				<div class="brand-cat" :class="catid==item.cat_id?'active':''" v-for="item in brand_detail.catlist" :key="item.cat_id" @click="changeGoods(item.cat_id)">
				  <img :src="item.logo" class="logo-img" />
				  <div class="brand-name">{{item.cat_name}}</div>
					<img v-if="catid==item.cat_id" class="active-icon" src="/static/images/icon/active_icon.png" alt="">
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
		<fixedIcon @share="share" ref="backTop" :showItem='showItem'></fixedIcon>
  </div>
</template>

<script>
import fixedIcon from '@/components/fixedIcon.vue'
import loadMore from '@/components/uni-load-more/uni-load-more.vue'  //1上拉加载更多 2正在加载 3我们是有底线的
import product from "@/components/product";

export default {
  components: {
    product,loadMore,fixedIcon
  },
  data() {
    return {
      brandid: "",
      catid: "",
      ordertype: 0, //1 时间 3.销量  4 价格顺序 5价格倒序 6 更新 7 商品排序倒序 8商品排序升序
      brand_detail: {},
      brand_goods: [],
      activeIndex: -1, //0有货 1价格 2销售
      priceOrder: true, //false是默认顺序即升序 true是降序
			xiaolOrder:false,
      page: 1,
      pageSize: 10,
      loadMore:1,
			BrandTitle:'',
			showItem: {
				share:true,
				cart:true
			},
			
    };
  },
  onLoad(option) {
    this.initData()
    this.brandid = option.id || '';
     this.getBrandDetail();
	
  },
  onShow() {
   
  },
	onShareTimeline(){
		return {
			title: this.BrandTitle || '',
			query:'h=6&id='+this.brandid,
			imageUrl:this.brand_detail.brand_logo[0],
		}
	},
	onShareAppMessage() {
		// console.log('/pages/index/index?h=6&id='+this.brandid)
		return {
			title: this.BrandTitle || '',
			path: '/pages/index/index?h=6&id='+this.brandid
		}
	},
  onReachBottom(){
    if(this.loadMore==3 || this.loadMore==2) return
    this.getBrandDetailGoods();
  },
  methods: {
    initData(){
      this.page=1,
      this.pageSize=10,
      this.ordertype = 6
      this.activeIndex = -1
      this.priceOrder = true
      this.brand_goods = []
    },
    changeIndex(index) {
      this.activeIndex = index;
      this.brand_goods = []
      this.page=1;
      if (this.activeIndex == 0) {  //  人气
        this.ordertype = 7
        this.getBrandDetailGoods()
      }

      if(this.activeIndex == 1){  //价格
        this.priceOrder = !this.priceOrder
        this.ordertype = 3
				if(this.priceOrder){  //价格降序
				  this.ordertype = 3
				  this.getBrandDetailGoods()
				}else{                //价格升序
				  this.ordertype = 2
				  this.getBrandDetailGoods()
				}
      }

      if (this.activeIndex == 2) { //销量
        this.xiaolOrder = !this.xiaolOrder;
        if(this.xiaolOrder){  //价格降序
          this.ordertype = 1
          this.getBrandDetailGoods()
        }else{                //价格升序
          this.ordertype = 6
          this.getBrandDetailGoods()
        }
      }
    },
    changeGoods(catid){
			console.log(catid)
      this.page=1;
      this.catid = catid;
      this.getBrandDetailGoods()
    },
    /* 品牌详情 */
    getBrandDetail() {
      this.$fly
        .get(this.$api.brandindex, {
          brandId: this.brandid
        })
        .then(res => {
          if (res.code == 1) {
            this.brand_detail = res.data;
						this.BrandTitle = this.brand_detail.brand_name || ''
            if(res.data.catlist[0]){
              this.catid = res.data.catlist[0].cat_id;
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
        .post(this.$api.goodslist, {
          brandId: this.brandid,
          cateId:this.catid,
          orderType:this.ordertype ? this.ordertype :'',
          page:this.page,
          pageSize:this.pageSize
        })
        .then(res => {
          if (res.code == 1) {
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
		.active{
			border:1rpx solid #F22732;
		}
    .brand-cat {
      padding-top: 20rpx;
			display: inline-block;
			text-align: center;
			background: #fff;
			margin-right: 20rpx;
			width: 180rpx;
			border-radius: 4rpx;
			height: 200rpx;
			position: relative;
			.active-icon{
				position: absolute;
				bottom: 0;
				right:0rpx;
				width: 20rpx;
				height: 20rpx;
			}
      .logo-img {
        width: 124rpx;
        height: 124rpx;
      }
      .brand-name {
        margin-top: 10rpx;
        text-align: center;
        font-size: 24rpx;
        font-family: PingFang-SC-Regular;
        font-weight:400;
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
		.header-item:after {
			position: absolute;
			left: 0;
			top: 50%;
			width: 2rpx;
			height: 30rpx;
			content: '';
			background: #eee;
			margin-top: -15rpx;
		}
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
        font-size: 28rpx;
        font-weight: 400;
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
			.rowbox{
				width: 17rpx;
				height: 9rpx;
			}
      .order-arrows {
      	position: absolute;
      	top: -5rpx;
      	right: 70rpx;
      	// margin-top: 17rpx;
      	color: #666666;
      	font-size: 30rpx;
      	.active{
      		color: #F22732 !important;
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
