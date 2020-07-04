<template>
	<text>
		<text v-if="type==0" class="box-0">{{ h }}小时{{ m }}分{{ s }}秒</text>
		<text v-if="type==1" class="box-1">{{ h }}时{{ m }}分{{ s }}秒</text>
	</text>
</template>

<script>
export default {
	props: {
		time: {
			type: Number,
			default: 86399
		},
		type: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			countdown: '',
			h: '00',
			m: '00',
			s: '00'
		};
	},
	created() {
		console.log('this.time', this.time);
		if (!this.time) return;
		this.countdown = this.time;
		this.timer = setInterval(() => {
			this.h = Math.floor(this.countdown / 3600) < 10 ? '0' + Math.floor(this.countdown / 3600) : Math.floor(this.countdown / 3600);
			this.m = Math.floor((this.countdown / 60) % 60) < 10 ? '0' + Math.floor((this.countdown / 60) % 60) : Math.floor((this.countdown / 60) % 60);
			this.s = Math.floor(this.countdown % 60) < 10 ? '0' + Math.floor(this.countdown % 60) : Math.floor(this.countdown % 60);
			this.countdown--;
			if (this.countdown <= 0) {
				this.h ='00';
				this.m ='00';
				this.s ='00';
				clearInterval(this.timer);
				this.timer = null;
			}
		}, 1000);
	},
	onUnload() {
		this.timer = null;
	}
};
</script>

<style lang="scss">
.box-0 {
	font-size: 26rpx;
	font-weight: 400;
	color: #ffae54;
}
.box-1{
	font-size:28rpx;
	font-weight:400;
	color:rgba(0,0,0,1);
}
</style>
