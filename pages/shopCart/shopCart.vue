<template>
	<view class="cart">
		<view class="good-list">
			<view class="good-brand-item" v-if="shopCarList.length" v-for="(item,index) in shopCarList" :key="index">
				<view class="title-state-box flex-align-center">
					<view class="b-all-check">
						<checkbox color="#17B948" :checked="item.allChecked" @click.stop="allPick(index)" />
					</view>
					<view class="brand-info flex-align-center">
						<image class="b-img" :src="item.brand_logo" mode=""></image>
						<text class="brand-name">{{item.brand_name}}</text>
						<text class="icon-arrow iconfont iconyoujiantou"></text>
					</view>
					<image @click.stop="deleteBrandGood(item,index)" class="delete" src="../../static/images/icon/icon_delete.png" mode=""></image>
				</view>
				<view class="good-box">
					<view @click="toDetail(itemG.goods_id)" v-for="(itemG,indexG) in item.goodlist"  :key="indexG">
						<cartItem :item="itemG" @changeNum="goodsNumChanged($event,index,indexG)" @onePick="onePick(index,indexG)"></cartItem>
					</view>
				</view>
			</view>
			<view v-if="shopCarList.length==0" class="shop-car-empty-container">
				<img src="@/static/images/shop-car-empty.png">
				<span>购物车空空如也</span>
			</view>
		</view>
		<view class="fixed-bottom">
			<label class="radio flex-align-center">
				<checkbox color="#17B948" :checked="allPickChecked"  @click.stop="allPickClick" />
				<text>全选</text>
			</label>
			<view class="total">
				<text>不含运费</text>
				<text>合计:</text>
				<text class="p-box"><text class="p-icon">¥</text>{{totalPrice}}</text>
			</view>
			<view class="submit" @click.stop="onSubmitOrder">
				结算
			</view>
		</view>
		<comfooter :tabIdx="1" :centerAngle="payAngle"></comfooter>
	</view>
</template>

<script>
	let page= 1,pageSize=999
	import comfooter from '@/components/com-footer.vue'
	import cartItem from '@/components/shopCart/cartItem'
	export default {
		components: {
			comfooter,
			cartItem
		},
		data() {
			return {
				allPickChecked: false,
				shopCarList: [],
				noNumList:[],
				totalPrice: 0, //总价
				allShopTotalPrice:0,
				initialization:false,
			
			};
		},
		async onShow(){
			this.$tip.loading();
			this.totalPrice = 0
			this.initialization = true;
			this.allPickChecked = false
			// console.log(await this.loadShopCarData())
			this.shopCarList = await this.loadShopCarData('all');
			this.$tip.loaded();
			//  滚动到顶部
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		},
		async onLoad(){
			 this.shopCarList = await this.loadShopCarData('all')
		},
		methods:{
			toDetail(id){
				wx.navigateTo({
					url:"/pages/good/goodDetail?id="+id
				})
			},
			async deleteBrandGood(item,index){
				this.$tip.loading();
				let cartids = [] 
				let deleteIndexList = []
				item.goodlist.map((items,indexs)=>{
					if(items.checked){
						cartids.push(items.cart_id)
						deleteIndexList.push(indexs)
					}
				})
				if(cartids.length==0){
					return this.$tip.toast('请选中商品!')
				}
				// console.log(deleteIndexList)
				let cartIdStr = cartids.join(',')
				await this.$fly.post(this.$api.delCart,{ids:cartIdStr}).then( async(res)=>{
					if(res.code){
						let deleteAllPrice = 0
						item.goodlist.map((items,indexs)=>{
							if(items.checked){
								deleteAllPrice+=Number(items.goods_num*items.goods_price)
							}
						})
						console.log(deleteAllPrice)
						this.totalPrice =(this.totalPrice- deleteAllPrice).toFixed(2)
						this.$tip.toast('删除成功!')
						this.shopCarList = await this.loadShopCarData('all');
						
						// 优化策略,自己计算,不重新获取数据
					// 	for (let indexs = 0; indexs < item.goodlist.length; indexs++) {
					// 		if(item.goodlist[indexs].checked){
					// 			console.log(item.goodlist)
					// 			console.log(indexs)
					// 			item.goodlist.splice(indexs,1)
					// 			--indexs
					// 		}
					// 	}
					
					// 	if(item.goodlist.length == 0){
					// 		this.shopCarList.splice(index,1)
					// 	}
					// 	if(this.shopCarList.length==0){
					// 		this.allPickChecked = false
					// 	}
						
						
					}
				})
				this.$tip.loaded();
				console.log(cartIdStr)
			},
			async loadShopCarData(type = 'all') {
				let params = {}
				// console.log(page)
				if (type == 'all') {
					this.noNumList = []
					this.shopCarList = []
					page = 1;
					this.soleOutListLoadmore = true;
					params.page = page;
					params.pageSize = pageSize;
				} else {
					params.page = page;
					params.pageSize = pageSize;
				}
				var result = await this.$fly.post(this.$api.myCart, params);
				var data = result.data
				console.log(data)
				if (data.list.length > 0) {
					page++
				} else {
					this.soleOutListLoadmore = false
				}
				this.allShopTotalPrice = data.totalPrice  || 0
				this.allShopNum = data.totalCount
				data.list.forEach((items) => {
					let itemsAllPrice = 0,
						itemsAllNum = 0,
						itemsAllUnit = 0,
						itemOnePrice = 0,
						itemCheckedNum = 0;
					if (this.allPickChecked) {
						items.allChecked = true;
							items.goodlist.forEach((item) => {
								itemsAllPrice += item.goods_price * item.goods_num
								itemsAllNum += item.goods_num
								item["checked"] = true;
							});
			
					} else {
						items.allChecked = false;
						items.goodlist.forEach((item) => {
			
							item["checked"] = false;
						});
						// 计算总的价格
						items.goodlist.forEach((item) => {
							itemsAllPrice += item.goods_price * item.goods_num
							itemsAllNum += item.goods_num
						});
						
						this.allShopTotalPrice += itemsAllPrice
						// this.allShopTotalPrice = Number(this.allShopTotalPrice).toFixed(2)
						itemsAllPrice = 0
						itemsAllNum = 0
					}
					items.allPrice = itemsAllPrice
					items.allNum = Number(itemsAllNum)
					items.totalCheckedNum = 0
					
					items.onePrice = items.goodlist[0].goods_price
				});
				let list = data.list
				let noDataList = []
			// 	for (let index = 0; index < list.length; index++) {
			// 		let forList = JSON.parse(JSON.stringify(list[index].goodlist))
			// 		forList.filter((item, index2,array) => {
			// 			if (Number(item.stokcnum) == 0 || Number(item.shelves) != 2) {
			// 				noDataList.push(forList[index2])
			// 				if (list[index].goodlist.length == 1) {
			// 					list.goodlist.splice(index, 1) //数组的内容删除了,需要减去下标
			// 						--index
			// 				} else {
			// 					list[index].splice(index2, 1)
			// 				}
			
			// 				return null
			// 			} else {
			// 				// 乘以虚拟库存,如果没有虚拟库存则直接 返回item
			// 				if (item.goods_type == 1) {
			// 					item.stokcnum = item.stokcnum * this.VStock
			// 				}
			// 				return item
			// 			}
			// 		})
			// 	}
			// 	console.log(noDataList)
				this.noNumList = this.noNumList.concat(noDataList)
				// 获取所有购物车的id,用于全选删除
				// this.getAllId()
				console.log(list)
			
				return list;
			},
			allPick(index) {
				let goodObj = this.shopCarList[index]
				console.log(goodObj)
				this.$set(goodObj, 'allChecked', !goodObj.allChecked)
				let itemsAllPrice = 0,
					itemsAllNum = 0;
				if (goodObj.allChecked) {
					var idx = this.shopCarList.findIndex((val) => {
						return val.allChecked == false;
					})
					this.allPickChecked = idx == -1 ? true : false;
						this.shopCarList[index].goodlist.forEach((val, index) => {
							val.checked = true
			
							itemsAllPrice += Number(val.goods_price * val.goods_num) 
							itemsAllNum += val.goods_num
						})
			
				} else {
			
					if (this.allPickChecked) {
						this.allPickChecked = false
					}
					this.shopCarList[index].goodlist.forEach((val, index) => {
						val.checked = false
					})
					itemsAllPrice = 0
					itemsAllNum = 0
				}
			
				var allPrice = goodObj.allPrice;
				goodObj.allPrice = (itemsAllPrice ).toFixed(2)
				goodObj.allNum = Number(itemsAllNum)
				// goodObj.onePrice = goodObj.price
				if (this.allPickChecked) {
					this.totalPrice = Number(this.allShopTotalPrice).toFixed(2);
				} else {
					if (goodObj.allChecked) {
						this.totalPrice = (Number(this.totalPrice) + Number(goodObj.allPrice)- allPrice ).toFixed(2);
					} else {
						this.totalPrice = (Number(this.totalPrice) - allPrice).toFixed(2);
					}
				}
		
			},
			async allPickClick() {
			
				this.allPickChecked = !this.allPickChecked
				this.$tip.loading();
				// this.getAllId()
				// console.time()
				this.totalPrice = this.allPickChecked ? Number(this.allShopTotalPrice).toFixed(2) : 0
				await this.shopCarList.forEach(items => {
					items.allChecked = this.allPickChecked;
					let itemsAllPrice = 0,
						itemsAllNum = 0;
					if (this.allPickChecked) {
						items.goodlist.forEach((item) => {
							itemsAllPrice += item.goods_price * item.goods_num * 100
							itemsAllNum += item.goods_num
					
							item["checked"] = true;
						});
					} else {
						items.goodlist.forEach((item) => {
							item["checked"] = false;
						});
						itemsAllPrice = 0
						itemsAllNum = 0
					}
					items.allPrice = (itemsAllPrice / 100).toFixed(2)
					items.allNum = Number(itemsAllNum)
				});
				this.$tip.loaded();
			},
			onePick(index1, index2) { //
				this.$set(this.shopCarList[index1].goodlist[index2], 'checked', !this.shopCarList[index1].goodlist[index2].checked);
				var idx = this.shopCarList[index1].goodlist.findIndex((val) => {
					return val.checked == false;
				})
				let goodObj = this.shopCarList[index1]
				if (idx == -1) {
					this.$set(goodObj, 'allChecked', true);
				} else {
					this.$set(goodObj, 'allChecked', false);
				}
			
				var idxs = this.shopCarList.findIndex((val) => {
					return val.allChecked == false;
				})
				this.allPickChecked = idxs == -1 ? true : false;
					console.log(idxs == -1,this.allPickChecked  )
				
				var val = this.shopCarList[index1].goodlist[index2];
				var allPrice = goodObj.allPrice;
				if (this.shopCarList[index1].goodlist[index2].checked) {
						goodObj.allPrice = ((goodObj.allPrice * 100 + val.goods_price * val.goods_num * 100) / 100).toFixed(2)
						goodObj.allNum = ((goodObj.allNum * 100 +  val.goods_num * 100) / 100)
				} else {
						goodObj.allPrice = ((goodObj.allPrice * 100 - val.goods_price * val.goods_num * 100) / 100).toFixed(2)
						goodObj.allNum = ((goodObj.allNum * 100 -  val.goods_num * 100) / 100)
				}
			
				if (this.allPickChecked) {
					this.totalPrice = Number(this.allShopTotalPrice).toFixed(2);
				} else {
					this.totalPrice = (Number(this.totalPrice) + Number(goodObj.allPrice) - allPrice).toFixed(2);
				}
			
			},
			// 删除购物车
			async deleteCartId() {
				let cart_ids = [];
				this.shopCarList.forEach((items) => {
					items.forEach((item) => {
						if (item["checked"]) {
							cart_ids.push(item.carts_id)
						}
					});
				});
				if (cart_ids.length == 0) {
					this.$tip.toast('亲,请选择要删除的商品!')
					return
				}
				this.$tip.loading();
				await this.$fly.post(this.$api.deleteShopCarItem, {
					cartids: this.allPickChecked ? this.allCartId : cart_ids.join(',')
				});
				this.shopCarList = await this.loadShopCarData('all');
				this.$store.dispatch('getCartNum')
				this.$tip.loaded();
			},
			toGoodDetail(id) {
				wx.navigateTo({
					url: '/pages/good/goodDetail?id=' + id
				})
			},
			clearNoNumGood() {
				let _this = this
				wx.showModal({
					title: '提示',
					content: "确认清空?",
					success: (res) => {
						if (res.confirm) {
							let list = []
							for (let item of _this.noNumList) {
								list.push(item.carts_id)
							}
							let idStr = list.join(',')
							_this.$tip.loading();
							_this.$fly.post(_this.$api.deleteShopCarItem, {
								cartids: idStr
							}).then(async (res) =>  {
								if (res.status == 1) {
									this.$store.dispatch('getCartNum')
									_this.shopCarList = await _this.loadShopCarData('all');
									_this.noNumList = []
									_this.$tip.loaded();
								}
							});
						}
					}
				})
			},
			getAllId() {
				this.$fly.post(this.$api.allCarId).then(res => {
					console.log(res)
					this.allCartId = res.data.join(',')
				}).catch(err => {
					console.log(err)
				});
			},
			async onSubmitOrder() {
				
					this.$tip.loading();
			
					// if (!this.isMeetConditions()) {
					//   this.$tip.loaded();
					//   this.$tip.toast("商品不足起批量");
					//   return;
					// }
			
					// if (this.isSoldOut()) {
					//   this.$tip.loaded();
					//   this.$tip.toast("无库存商品不可下单");
					//   return;
					// }
			
					var selected_items = "";
			
					for (let i = 0; i < this.shopCarList.length; i++) {
						for (let j = 0; j < this.shopCarList[i].goodlist.length; j++) {
							console.log(this.shopCarList[i].goodlist[j].checked)
							if (this.shopCarList[i].goodlist[j].checked) {
								selected_items = selected_items.concat(this.shopCarList[i].goodlist[j].cart_id + ",");
							}
						}
					}
			
					selected_items = selected_items.substr(0, selected_items.length - 1);
				
					if (selected_items.length <= 0) {
						this.$tip.loaded();
						this.$tip.toast("还没选中结算商品");
					} else {
						var result = await this.getDefaultAddress();
						this.$tip.loaded();
						if (this.allShopNum < pageSize) { //购物车数量超过每页的数量,就按循环的来 ,超过了比如大于100按循环的来的话就会卡顿
							selected_items = selected_items
						} else {
							if (this.allPickChecked) {
								selected_items = this.allCartId
							} else {
								selected_items = selected_items
							}
						}
			 
						console.log('selected_items', selected_items)
						if (result.data.provName == null || !result.data) {
							//跳转添加地址
							wx.navigateTo({
								url: "/pages/center/address/address?isShop=1&cart_ids=" + selected_items
							});
						} else {
							wx.navigateTo({
								url: "/pages/shopCart/submitOrder?address_id=" + result.data.id + '&cart_ids=' +
									selected_items
							});
						}
					}
			},
			async getDefaultAddress() {
				return await this.$fly.post(this.$api.addressDefault, {});
			},
			goodsNumChanged(event, index, itemIndex) {
				let {goods_num, addType, oldValue} = event
				console.log(event)
				// console.log(goods_num, index, itemIndex, addType, oldValue)
				this.$tip.loading();
				// let num = oldValue - goods_num
				let item = this.shopCarList[index].goodlist[itemIndex]
				if (this.shopCarList[index].goodlist[itemIndex].checked) {
					let good0 = this.shopCarList[index]
					
						if (addType == 'add') {
							this.totalPrice = (Number(this.totalPrice) + Number(item.goods_price)).toFixed(2)
							good0.allPrice = ((good0.allPrice * 100 + Number(item.goods_price * 100)) / 100).toFixed(2)
							good0.allNum += 1//增加一手件数到总件数
						
						} else {
							this.totalPrice = Number(this.totalPrice - item.goods_price).toFixed(2)
							good0.allPrice = ((good0.allPrice * 100 - Number(item.goods_price * 100)) / 100).toFixed(2)
							good0.allNum -= 1 //减少一手件数到总件数
						
						}
		
			
				}
			
				item.goods_num = goods_num;
				
				var goodsNum = parseInt(goods_num === "" ? 1 : goods_num);
				var stockNum = parseInt(item.stokcnum);
				if (goodsNum > stockNum) {
					item.is_no_stock = 1;
				} else {
					item.is_no_stock = 0;
				}
				let numN = item.goods_num === "" ? 1 : item.goods_num
			
				let itemObj = [{
					goods_id: item.goods_id,
					goods_num: numN,
					sku: item.sku,
					color_id: item.color_id,
					size_id: item.size_id,
					product_id:item.product_id
				}];
				let itemJson = JSON.stringify(itemObj);
				this.$fly.post(this.$api.addCart, {
					jsonstr: itemJson,
					type: "2"
				}).then(res => {
					this.$tip.loaded();
					if (addType == 'add') {
						this.allShopTotalPrice += Number(this.shopCarList[index].goodlist[itemIndex].price_sale)
					} else {
						this.allShopTotalPrice -= Number(this.shopCarList[index].goodlist[itemIndex].price_sale)
					}
				}).catch(() => {
					this.$tip.loaded();
				});
			
			},
			
			deleteGoods(index, itemIndex) {
				this.shopCarList[index].splice(itemIndex, 1);
			},
		},
		
		
	}
</script>

<style lang="scss" scoped>

	.good-list {
		padding: 20rpx 20rpx 210rpx;
		
		.good-brand-item {
			background: #fff;
			padding:30rpx 20rpx 0;
			border-radius:10rpx;
			margin-bottom: 20rpx;
			.title-state-box {
				// padding: 0 20rpx;
				margin-bottom: 30rpx;
				.b-all-check{
					width: 55rpx;
					height: 55rpx;
				}
				.brand-info {
					margin-left: 2rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					.b-img {
						width: 40rpx;
						height: 40rpx;
						margin-right:6rpx;
					}

					.icon-arrow {
						color: #d9d9d9;
						font-size: 40rpx;
					}
				}
				.delete{
					margin-left: auto;
					width: 29rpx;
					height: 32rpx;
				}
			}
			.good-box{
				.item:not(:last-of-type){
				
				}
				
			}
		
		}
		.shop-car-empty-container {
		
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			flex-direction: column;
			padding-top: rpx(100);
			padding-bottom: rpx(120);
			background: #f3f3f3;
		
			>img {
				width: rpx(144);
				height: rpx(144);
			}
		
			>span {
				font-size: rpx(28);
				font-weight: 500;
				line-height: rpx(30);
				color: #999999;
				margin-top: rpx(20);
			}
		
		}
	}


	.cart {
		background: #f3f3f3;
		min-height: 100vh;
	}

	.fixed-bottom {
		position: fixed;
		width: 100%;
		bottom: 98rpx;
		height: 98rpx;
		left: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);

		.radio {
			margin-left: 40rpx;

			text {
				margin-left: 10rpx;
			}
		}

		.total {
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 42px;
			margin-left: auto;

			text:nth-child(1) {
				font-size: 24rpx;
			}

			text:nth-child(2) {
				font-size: 28rpx;
				margin-left: 10rpx;
			}

			.p-box {
				margin-left: 20rpx;
				color: #F22732;
				font-size: 40rpx;

				.p-icon {
					font-size: 24rpx;
				}
			}
		}

		.submit {
			margin-right: 20rpx;
			margin-left: auto;
			width: 210rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			background: linear-gradient(90deg, rgba(252, 56, 67, 1) 0%, rgba(246, 42, 138, 1) 100%);
			border-radius: 40rpx;
		}
	}
</style>
