<template>
  <div class="darkContainer" style="background:#fff">
		<searchBar @sureBtn="search" placeholder="搜索商品" btnText="取消"></searchBar>
   <!-- <div class="search-bar">
      <div class="search-input-container">
        <div class="search-icon">
          <img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/search_2.png">
        </div>
        <input @input='keyword?showClearBtn=true:showClearBtn=false' type="text" placeholder='搜索' v-model="keyword">
        <div class="clear-icon" v-show="showClearBtn" @click="clearSearchInput">
          <img style="width:31rpx;height:31rpx;display:block;" src="@/static/images/icon/icon_clear.png">
        </div>
      </div>   
      <div class="search-btn"  @click="toSearchResult(keyword,1)">取消</div>
    </div> -->
    <!-- 热门搜索 -->
    <div class="hot-search">
      <div class="hot-search-title">热门搜索</div>
      <div style="width:100%;height:1px;"></div>
      <div class="items-container">
        <div class="search-item" @click="toSearchResult(item.hot_words,item.type)" v-for="(item,index) in hotSearchList" :key="index">
          {{item.hot_words}}
        </div>
      </div>
    </div>
    <!-- 历史搜索 -->
    <div class="search-history">
      <div class="search-history-title-container">
        <div class="search-history-title">最近搜索</div>
        <div class="history-clear" @click="clearHistorySearch">
          <img style="width:29rpx;height:31rpx;" src="@/static/images/icon/clear.png">
        </div>
      </div>
      <div style="width:100%;height:1px;"></div>
      <div class="items-container">
				<div class="no-data" v-if="!historySearchList.length">无搜索历史~</div>
        <div class="search-item" @click="toSearchResult(item.keyword,item.type)" v-for="(item,index) in historySearchList" :key="index">
          {{item.keyword}}
        </div>
      </div>
    </div>
   
  </div>
</template>
   
<script>
	import searchBar from '@/components/searchBar'

export default {
  name: "search",
  components:{
		searchBar
  },
  data () {
    return {
      keyword:'',
      showClearBtn:false,
      hotSearchList:[],
      historySearchList:[],
      goodsList:[],
			type:0,//seeding: 种草过来的
			recommendType:'tiaokuan'
    }
  },
  methods: {
    /* 清空搜索输入框 */
    clearSearchInput(){
      this.keyword='';
      this.showClearBtn = false;
    },
    // /* 搜索商品 */
    // keyWordSearch(){
    //   console.log('this.keyword',this.keyword)
    //   this.$fly.post(this.$api.keyWordSearch,{
    //     page:1,
    //     pageSize:10,
    //     search_type:0,
    //     ordertype:1,
    //     keyword:this.keyword,
    //   }).then(res=>{
    //     if(res.status==1){
    //     }
    //   })
    // },
		changeType(type){
			// this.type = 
		},
		search(e){
			console.log(e)
			this.toSearchResult(e)
		},
		ellipsis(index){
			this.goodsList[index].descShow = !this.goodsList[index].descShow
		},
		changColor(index,index2,item,num){
			this.goodsList[index].colorChooseIndex = index2
			let price =  0
			item.stockarr.wholesale_price_arr.forEach(items=>{
				if(num<=items.max&&num>=items.min){
					 price = items.price
				}
			})
			if(price==0){ //没有区间,就区最大的数量的价格
				let maxArr = item.stockarr.wholesale_price_arr.slice(0)
					maxArr.reverse((a,b)=>{
						console.log(a.max)
						return a.max > b.max
					})
				this.goodsList[index].preferPrice = maxArr[0].price
			}else{
				this.goodsList[index].preferPrice = price
			}		
			this.$forceUpdate()
		},
    /* 跳转搜索结果 */
    toSearchResult(keyword,type){
			console.log(1)
      if(keyword){
        wx.navigateTo({
          url:'/pages/search/searchResult?keyword='+keyword+'&type='+this.type
        })
      }else{
        this.$tip.toast("请输入搜索内容！");
      }
    },
    /* 获取热门搜索 */
    getHotSearch(){
      this.$fly.post(this.$api.hotSearch).then(res=>{
        if(res.code==1){
          this.hotSearchList=res.data;
        }
      })
    },
    /* 获取历史搜索 */
    getHistorySearch(){
      this.$fly.post(this.$api.historySearch).then(res=>{
        if(res.code==1){
          this.historySearchList=res.data.list || [];
        }
      })
    },
    /* 清空历史搜索 */
    async clearHistorySearch(){
			this.$tip.loading()
      await this.$fly.post(this.$api.deleteHistorySearch).then(res=>{
        if(res.code==1){
          this.getHistorySearch();
        }
      })
			this.$tip.loaded()
    },
    /* 获取猜你喜欢 */
    /* todo：接口尚未做好，需要暂时用刚刚上新这个接口来代替 */
		getRecommend(){
			this.$fly.post(this.$api.collection,{
			  page:1,
			  pageSize:4,
				type:3
			}).then(res=>{
			  if(res.status==1){
					res.data.list.filter(item=>{
						item.descShow = false
						item.colorChooseIndex = 0
						// let keyStr = item.stockarr.colorarr[0].color_id+'-'+item.stockarr.sizearr[0].size_id
						item.stockarr.colorarr.reverse((a,b)=>{
							return a.color>b.color
						})
						// item.keyStr = keyStr
						let num = item.stockarr.colorarr[0].color
						let price = 0
						item.stockarr.wholesale_price_arr.forEach(item=>{
							if(num<=Number(item.max)&&num>=Number(item.min)){
								price = item.price
							}
						})
						if(price==0){ //没有区间,就区最大的数量的价格
							let maxArr = item.stockarr.wholesale_price_arr.slice(0)
								maxArr.reverse((a,b)=>{
									console.log(a.max)
									return a.max > b.max
								})
							item.preferPrice = maxArr[0].price
						}else{
							item.preferPrice = price
						}
						// console.log(item.preferPrice,num)
					})
			    this.goodsList=res.data.list;
			  }
			})
		},
    getNewProcudt(){
      this.$fly.post(this.$api.newProcudt,{
        page:1,
        pageSize:4,
      }).then(res=>{
        if(res.status==1){
          this.goodsList=res.data.list;
        }
      })
    }
  },
  onLoad(option){
    this.getHotSearch();
		this.goodsList = []
		this.type = option.type || ''
		// if(this.type==0){ //挑款
		// 	this.getNewProcudt()
		// }else{ //份货
		// 	this.getRecommend();
		// }
		
  },
  onShow(){
    this.getHistorySearch();
  }
}
</script>

<style lang="scss" scoped>
page{
  background: #fff;
}
.hot-search{
	margin-top:40rpx;
}
.hot-search,
.search-history{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx 65rpx;
  .search-history-title-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .hot-search-title,
  .search-history-title{
    font-size:30rpx;
    font-weight:400;
    color:#626262;
    padding:0 0 13rpx 0;
  }
  .items-container{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
		.no-data{
			font-size:28rpx;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
    .search-item{
      height:64rpx;
      line-height: 64rpx;
      text-align: center;
      border:1rpx solid #D2D2D2;
      border-radius:32rpx;
      color:#333333;
      font-size: 26rpx;
      font-weight:400;
      padding: 0 25rpx;
      margin: 35rpx 30rpx 0 0;
    }
  }
}
.goods-may-love-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 21rpx;
	background: #F3F3F3;
  .goods-may-love-title{
    color: #666;
    width: 192rpx;
    height: 29rpx;
    font-size: 30rpx;
    padding: 85rpx 0 43rpx 0;
  }
  .goods-list-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
		.brands-part-good-list{
			padding-top:20rpx;
			width:100%;
		}
    .goods-item-container{
      width:344rpx;
      height:494rpx;
      border-radius:15rpx;
      margin: 0 0 25rpx 0;
    }
  }
}
</style>