import Vue from 'vue'
class EventChannel {
	listener = {};

	emit(event, args) {
		this.listener[event] && this.listener[event].forEach(v => {
			if (v.off) return;
			v.fn(args);
			if (v.once) {
				v.off = true;
			}
		});
	}

	on(event, fn) {
		this.listener[event] = this.listener[event] || [];
		this.listener[event].push({
			once: false,
			fn
		});
	}

	once(event, fn) {
		this.listener[event] = this.listener[event] || [];
		this.listener[event].push({
			once: true,
			fn
		});
	}

	off(event, fn) {
		if (!fn) {
			this.listener[event] = [];
		} else {
			this.listener[event] && this.listener[event].forEach(v => {
				v.off = true;
			});
		}
	}
}

const _navigateTo = uni.navigateTo;
uni.navigateTo = function(option) {
	//console.log('navigateTo', option);  
	const ec = new EventChannel();

	option.events && Object.keys(option.events).forEach(e => {
		ec.on(e, option.events[e]);
	})

	//打开孙页面，如果子页面中eventChannel未取，则主动取  
	if (__ec__) {
		if(getApp().$route.matched[0]){
			const instance = getApp().$route.matched[0].instances.default.$children[0].$children[1].$children[0];
			instance.__ec__ = __ec__;
		}
	
		// __ec__ = undefined; //无用代码  
	}

	_navigateTo({
		...option,
		success: (res) => {
			__ec__ = ec;

			res.eventChannel = ec;
			option.success && option.success(res);
		}
	});
};

let __ec__ = undefined;

Vue.prototype.getOpenerEventChannel = function() {
	return this.__ec__ || __ec__;
}
Vue.prototype.getOpenerEventChannel = function() {
	return this.$scope.getOpenerEventChannel();
}