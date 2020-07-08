<template>
	<view class="center">
		<view class="">

		</view>
	</view>
</template>

<script>
	export default {
		name: "center",
		data() {
			return {

			}
		},
		onLoad() {
			wx.getSystemInfo({
				success: res => {
					console.log(res)
				},
				fail(err) {
					console.log(err);
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
