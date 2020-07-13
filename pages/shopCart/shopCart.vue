<template>
	<view class="cart">
		<view class="good-list">
			<view class="good-brand-item" v-for="(item,index) in shopCarList" :key="index">
				<view class="title-state-box flex-align-center">
					<checkbox color="#17B948" :checked="isAll" />
					<view class="brand-info flex-align-center">
						<image class="b-img" :src="item.brand_logo" mode=""></image>
						<text class="brand-name">{{item.brand_name}}</text>
						<text class="icon-arrow iconfont iconyoujiantou"></text>
					</view>
					<image class="delete" src="../../static/images/icon/icon_delete.png" mode=""></image>
				</view>
				<view class="good-box">
					<block v-for="(itemG,indexG) in item.goodlist" :key="item.good_id">
						<cartItem :item="itemG" @changeNum="goodsNumChanged"></cartItem>
					</block>
				</view>
			</view>

		</view>
		<view class="fixed-bottom">
			<label class="radio">
				<checkbox color="#17B948" :checked="isAll" />
				<text>全选</text>
			</label>
			<view class="total">
				<text>不含运费</text>
				<text>合计:</text>
				<text class="p-box"><text class="p-icon">¥</text>{{totalPrice}}</text>
			</view>
			<view class="submit">
				结算
			</view>
		</view>
		<comfooter :tabIdx="2" :centerAngle="payAngle"></comfooter>
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
				isAll: false,
				shopCarList: [],
				noNumList:[],
				totalPrice: 0, //总价
			};
		},
		async onLoad(){
			 this.shopCarList = await this.loadShopCarData('all')
		},
		methods:{
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
				// this.allShopTotalPrice = data.totalPrice 
				this.allShopNum = data.totalCount
				data.list.forEach((items) => {
					let itemsAllPrice = 0,
						itemsAllNum = 0,
						itemsAllUnit = 0,
						itemOnePrice = 0,
						itemCheckedNum = 0;
					if (this.allPickChecked) {
						items.goodlist[0].allChecked = true;
							items.goodlist.forEach((item) => {
								itemsAllPrice += item.goods_price * item.goods_num
								itemsAllNum += item.goods_num
								item["checked"] = true;
							});
			
					} else {
						items.goodlist[0].allChecked = false;
						items.goodlist.forEach((item) => {
			
							item["checked"] = false;
						});
						itemsAllPrice = 0
						itemsAllNum = 0
					}
					items.goodlist[0].allPrice = itemsAllPrice
					items.goodlist[0].allNum = Number(itemsAllNum)
					items.goodlist[0].totalCheckedNum = 0
					
					items.goodlist[0].onePrice = items.goodlist[0].goods_price
				});
				let list = data.list
				let noDataList = []
			// 	for (let index = 0; index < list.length; index++) {
			// 		let forList = JSON.parse(JSON.stringify(list[index]))
			// 		forList.filter((item, index2,array) => {
			// 			if (Number(item.stokcnum) == 0 || Number(item.shelves) != 2) {
			// 				noDataList.push(forList[index2])
			// 				if (list[index].length == 1) {
			// 					list.splice(index, 1) //数组的内容删除了,需要减去下标
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
			
				this.noNumList = this.noNumList.concat(noDataList)
				// 获取所有购物车的id,用于全选删除
				// this.getAllId()
				console.log(list)
			
				return list;
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
			}
		},
		async onSubmitOrder(event) {
		
			const {
				type
			} = event.mp;
			if (type === "submit") {
		
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
					for (let j = 0; j < this.shopCarList[i].length; j++) {
						if (this.shopCarList[i][j].checked) {
							selected_items = selected_items.concat(this.shopCarList[i][j].carts_id + ",");
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
		
		
					if (result.data.prov_name == null) {
						console.log('selected_items', selected_items)
						//跳转添加地址
						wx.navigateTo({
							url: "/pages/center/address/myAddress?isShop=1&cart_ids=" + selected_items
						});
					} else {
						wx.navigateTo({
							url: "/pages/shopAndOrder/settlement/submitOrder?address_id=" + result.data.id + '&cart_ids=' +
								selected_items
						});
					}
				}
		
			}
		},
		goodsNumChanged(goods_num, index, itemIndex, addType, oldValue) {
			// console.log(goods_num, index, itemIndex, addType, oldValue)
			this.$tip.loading();
			// let num = oldValue - goods_num
			let item = this.shopCarList[index][itemIndex]
			if (this.shopCarList[index][itemIndex].checked) {
				let good0 = this.shopCarList[index][0]
				let wholesalePriceArr = good0.wholesale_price_arr //价格区间
				if (item.goods_type == 1) { //普通商品
					if (addType == 'add') {
						this.totalPrice = this.totalPrice + item.price * 100
						good0.allPrice = ((good0.allPrice * 100 + Number(item.price * 100)) / 100).toFixed(2)
						good0.allNum += 1 * item.sku_num//增加一手件数到总件数
						good0.totalUnit += 1 
					} else {
						this.totalPrice = this.totalPrice - item.price * 100
						good0.allPrice = ((good0.allPrice * 100 - Number(item.price * 100)) / 100).toFixed(2)
						good0.allNum -= 1 * item.sku_num //减少一手件数到总件数
						good0.totalUnit -= 1 
					}
				} else if (item.goods_type == 3) { //份货商品
					let lastPrice = good0.allPrice //没有增加的总价价格
					let spread = 0 //差价
					if (addType == 'add') {
						good0.allNum += 1 * item.color//增加一份件数到总件数
						good0.totalUnit += 1 
						let intervalPrice
						if(good0.main_id >0){ //份货秒杀的计算,不取区间价格,直接用秒杀价
							intervalPrice = good0.price
						}else{
							intervalPrice = this.getSectionPrice(wholesalePriceArr, good0.allNum)
						}
						good0.allPrice = (intervalPrice*good0.allNum).toFixed(2)
						spread = good0.allPrice -lastPrice //增加过后的价格减去上次的价格等于差价
						
						this.totalPrice = this.totalPrice + spread*100 //总价等于上次总价+差价
						
						good0.onePrice = intervalPrice == 0 ? good0.price : intervalPrice //单间价格等于区间价格
					} else {
						good0.allNum -= 1 * item.color//减少一份件数到总件数
						good0.totalUnit -= 1 
						let intervalPrice
						if(good0.main_id >0){ //份货秒杀的计算,不取区间价格,直接用秒杀价
							intervalPrice = good0.price
						}else{
							intervalPrice = this.getSectionPrice(wholesalePriceArr, good0.allNum)
						}
						good0.allPrice = (intervalPrice*good0.allNum).toFixed(2)
						good0.onePrice = intervalPrice == 0 ? good0.price : intervalPrice //单间价格等于区间价格
						spread = lastPrice - good0.allPrice //上次的价格减去增加过后的价格等于差价
						console.log(spread)
						this.totalPrice = this.totalPrice - spread*100 //总价等于上次总价-差价
					}
				}
		
			}
		
			if (item.goods_type == 1) { //普通商品
				item.goods_num = goods_num;
			} else if (item.goods_type == 3) { //份货商品
				item.goods_num = goods_num * item.color;
			}
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
				size_id: item.size_id
			}];
			let itemJson = JSON.stringify(itemObj);
			this.$fly.post(this.$api.addOrEditShopCar, {
				jsonstr: itemJson,
				type: "2"
			}).then(res => {
				this.$tip.loaded();
				if (addType == 'add') {
					this.allShopTotalPrice += this.shopCarList[index][itemIndex].price * 100
				} else {
					this.allShopTotalPrice -= this.shopCarList[index][itemIndex].price * 100
				}
			}).catch(() => {
				this.$tip.loaded();
			});
		
		},
		
		deleteGoods(index, itemIndex) {
			this.shopCarList[index].splice(itemIndex, 1);
		},
		
	}
</script>

<style lang="scss" scoped>

	.good-list {
		padding: 0 20rpx;

		.good-brand-item {
			background: #fff;
			padding:30rpx 20rpx 0;
			border-radius:10rpx;
			margin-bottom: 20rpx;
			.title-state-box {
				// padding: 0 20rpx;
				margin-bottom: 30rpx;
				.brand-info {
					margin-left: 10rpx;
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
	}


	.cart {
		background: #f3f3f3;
		min-height: 100vh;
	}

	.fixed-bottom {
		position: fixed;
		width: 100%;
		bottom: 100rpx;
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
			margin-left: 30rpx;
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
