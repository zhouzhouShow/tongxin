<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
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
</style>
