import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		set: {},
		moreSet: {},
	},
	mutations: {
		loginSuccess(state,value) {
			state.hasLogin = value;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		setSet(state, {
			avatar = '',
			nickName = '',
			userName = '',
			shopName = '',
			shopPic = '',
		} = {}) {
			state.set.avatar = avatar;
			state.set.nickName = nickName;
			state.set.userName = userName;
			state.set.shopName = shopName;
			state.set.shopPic = shopPic;
		},
		setMoreSet(state, {
			birthday = '',
			region = '',
			gender = '',
		} = {}) {
			state.moreSet.birthday = birthday;
			state.moreSet.region = region;
			state.moreSet.gender = gender;
		}
	},
	actions: {

	}
})

export default store
