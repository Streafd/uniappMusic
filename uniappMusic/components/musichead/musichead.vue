<template>
	<view class="music-head">
		<view class="music-head-icon" v-if="icon">
				<text class="iconfont icon-zuojiantou" @click="handleToBack"></text> |
				<text class="iconfont icon-zhuye" @click="handleToHome"></text>

		</view>
		<text :style="{color: white}">{{title}}</text>
	</view>
</template>

<script>
	import '../../common/iconfont.css'
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:['title','icon','white'],
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.music-head{
	width: 100%;
	height: 175rpx;
	font-size: 32rpx;
	line-height: 160rpx;
	text-align: center;
	// background-color: red;
	position: relative;
	.music-head-icon{
		position: absolute;
		top: 50rpx;
		left: 16rpx;
		width: 180rpx;
		height: 62rpx;
		line-height: 62rpx;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-evenly;
	}
}
</style>