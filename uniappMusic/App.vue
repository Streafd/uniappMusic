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

<style lang="scss">
	/*每个页面公共css */
	.container{
		width: 100%;
		height: calc(100vh - 140rpx);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	.fixbg{
		width: 100%;
		height: 100vh;;
		position: fixed;
		top: 0;
		left: 0;
		background-image: url(static/logo.png);
		background-size: cover;
		background-position:center 0;
		// filter:blur(10rpx);
		// transform: scale(1.2);
	}
</style>
