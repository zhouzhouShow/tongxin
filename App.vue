<script>
	import {updataApp} from 'utils/tools'
	import shareConfig from 'utils/share.js'
	export default {
		methods:{
			toPage(callback){
			    uni.reLaunch({	
			      url: '/pages/index/index',
			      // reLaunch: true,
			    }) 
			    callback()
			},
			updataApp() { //版本更新
				if (uni.canIUse('getUpdateManager')) {
					const updateManager = uni.getUpdateManager()
					updateManager.onCheckForUpdate(function(res) {
						if (res.hasUpdate) { // 请求完新版本信息的回调
							updateManager.onUpdateReady(function() {
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) { // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								uni.showModal({ // 新的版本下载失败
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
								})
							})
						}
					})
				} else {
					uni.showModal({ // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					})
				}
			},
			login(code,refreeid) {
			  return new Promise((resolve, reject) => {
			    this.$fly.post(this.$api.login, {
			      js_code: code,
						refreeid:refreeid || ''
			    }).then((res) => {
			      wx.setStorageSync('token', res.data.token);
			      resolve(res.data.token);
						this.$user.getUserInfo();
						this.$loginIntercept.loginSuccess(true)
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
		
		onLoad() {
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		 async onLaunch(option) {
			// console.log(option)
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			setTimeout(()=>{
				uni.hideTabBar({})
			},200)
			if(option.query.scene && decodeURIComponent(option.query.scene).includes('user_refreeid')){ //分销,下级进入
				let str = decodeURIComponent(option.query.scene)
				let refreeid = str.substr(str.indexOf('=')+1)
				await this.appInit(refreeid);
			}else{
				await this.appInit();
			}
		
		},
		onShow(e){
		
			console.log(e)
			this.updataApp(); //检查版本更新
			setTimeout(()=>{
				uni.hideTabBar({})
			},200)
			// 分享朋友圈的携带代理参数
			if(e.query.h==0 &&e.query.p && e.query.id){
				wx.setStorageSync('refreeid', e.query.p)
			}
			// 解析其他分享的
			if (e.query.scene || e.query.h || (e.query.id && (e.scene==1007||e.scene==1008))) {
			   shareConfig.sharePage(e.query).then((res)=>{
			     console.log(res)
			     let data = Object.assign(res)
			     console.log(data)
			      if (data.isRefreed) {
			        // wx.removeStorageSync('token')
			        this.refreedid = data.id;
			        this.appInit();
			      }
			      if(data.path !="/pages/index/index"){
			        console.log('是否',data)
			        // this.toPage(()=>{
			             this.$share.isGetPageQuery = true;
			          // }) 
			        }
							if(e.query.scene && decodeURIComponent(e.query.scene).includes('user_refreeid')){ //分销,下级进入
								let str = decodeURIComponent(e.query.scene)
								let refreeid = str.substr(str.indexOf('=')+1)
								 this.appInit(refreeid);
							}else{
								 this.appInit();
							}
			        // this.appInit();
			   });
			     
			}
			this.$loginIntercept.loginCallback(()=>{
				this.$user.getUserInfo().then(res => {
				  var data = res.data;
					console.log(data)
					if(data.is_agent == 1){
						this.$store.commit('setAgent',true)
					}else{
						this.$store.commit('setAgent',false)
					}
					if(data.avatar){
						this.$store.commit('loginSuccess',true)
					}else{
						this.$store.commit('loginSuccess',false)
					}
				//  console.log(res)
				})
			})
			
		},
		created() {
		  uni.hideTabBar({});
		
		},
		onHide: function() {
			uni.hideTabBar({});
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
		vertical-align: middle;
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
		box-sizing: border-box;
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
