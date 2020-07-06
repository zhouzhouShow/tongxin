<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.hideTabBar(); //隐藏默认tab
			wx.login({
				success:(res)=>{
					console.log(res)
				}
			})
		},
		created() {
		  wx.hideTabBar(); //隐藏默认tab
		
		},
		onShow: function() {
			console.log('App Show')
			wx.hideTabBar(); //隐藏默认tab
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/iconfont.css';
	/*每个页面公共css */
	.flex-align-center{
		display: flex;
		align-items: center;
	}
	.flex-justify-center{
		display: flex;
		justify-content: center;
	}
	.flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	page{
		width: 100%;
		height: 100%;
	}
	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
	
	.clamp-two {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
		-webkit-line-clamp: 2; //显示
	}
	
	image{
		width: 100%;
	}
</style>
