<script>
	export default {
		methods:{
			toPage(callback){
			    uni.reLaunch({	
			      url: '/pages/index/index',
			      // reLaunch: true,
			    }) 
			    callback()
			},
			login(code,refreeid) {
			  return new Promise((resolve, reject) => {
			    this.$fly.post(this.$api.login, {
			      js_code: code,
						refreeid:refreeid || ''
			    }).then((res) => {
			      wx.setStorageSync('token', res.data.token);
			      resolve(res.data.token);
			    })
			  })
			},
			_login() {
			  let _this = this;
			  return new Promise((resolve, reject) => {
			    wx.login({
			      success(res) {
			        if (res.code) {
			          let code = res.code;
			          resolve(code)
			        } else {
			          _this.$tip.toast('微信登录失败')
			        }
			      }
			    });
			  })
			},
			//用户初始化操作
			async appInit(refreeid) {
			  let code = await this._login();
			  let tiem = await this.login(code,refreeid);
			},
		},
		 async onLaunch(option) {
			console.log('App Launch')
			wx.hideTabBar(); //隐藏默认tab
			if(option.query.scene && decodeURIComponent(option.query.scene).includes('user_refreeid')){ //分销,下级进入
				let str = decodeURIComponent(option.query.scene)
				let refreeid = str.substr(str.indexOf('=')+1)
				await this.appInit(refreeid);
			}else{
				await this.appInit();
			}
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
	image{
		display: inline-block;
	}
	page{
		width: 100%;
		height: 100%;
	}
	button{
		background: transparent;
		border: none;
		box-shadow: none;
		padding: 0;
		line-height: 0;

	}
	button:after{
		border: none;
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
	
	checkbox .wx-checkbox-input {
		border-radius: 50%;
		/* 圆角 */
		width: 40rpx;
		/* 背景的宽 */
		height: 40rpx;
		/* 背景的高 */
	}
	
	/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		/* border: 1rpx solid #f93168; */
		background: #f93168;
	}
	
	/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		/* 圆角 */
		width: 40rpx;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		height: 40rpx;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		line-height: 40rpx;
		text-align: center;
		font-size: 30rpx;
		/* 对勾大小 30rpx */
		color: #fff;
		/* 对勾颜色 白色 */
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
	
</style>
