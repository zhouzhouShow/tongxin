export default {
	data(){
		return {
			filter:null, //筛选
		}
	},
	onUnload(){
		wx.removeStorageSync('filterObj')
	},
	onReady(){
		uni.$on('filterGood',(res)=>{
			this.filter = res
			this.keyWordSearch()
			console.log(res)
		})
	},
}