<template>
	<view class="list">
		
		<view class="fixbg">
			<musichead title="歌单" :icon="true" white="white"></musichead>
			<view class="container">
				<scroll-view scroll-y="true">
					<view class="list-head"></view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				
			};
		},
		onLoad(options){
			console.log(options.id);
		},
	}
</script>

<style lang="scss" scoped>

</style>
