<template>
	<view class="list">
		<!-- 背景图 -->
		<view class="fixbg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"> </view>
			<musichead title="歌单" :icon="true" white="white"></musichead>
			<view class="container">
				<scroll-view scroll-y="true" show-scrollbar="false">
					<!-- 头部 -->
					<view class="list-head">
						<view class="list-head-img">
							<image :src="playlist.coverImgUrl" mode=""></image>
							<!-- 过滤器格式化数字 -->
							<text class="iconfont">{{playlist.playCount | formatCount}}</text>
						</view>
						<view class="list-head-text">
							<text>{{playlist.name}}</text>
							<view class="list-head-textImg">
								<image :src="playlist.creator.avatarUrl" mode=""></image>{{playlist.creator.nickname}}
							</view>
							<view class="list-headtext">
								{{playlist.description}}
							</view>
						</view>
					</view>
					<!-- 差异化编译，只有在微信小程序才显示，其他端都不会显示 -->
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="list-share">
						<text class="iconfont icon-fenxiang"></text>分享给微信好友
					</button>
					<!-- #endif -->
					<!-- <button open-type="share" class="list-share">
						<text class="iconfont"></text>分享给微信好友
					</button> -->
					
					<!--音乐数据  -->
					<view class="list-music">
						<view class="list-music-head">
							<text class="iconfont icon-bofang"></text>
							<text>播放全部</text>
							<text>(100首)</text>
						</view>
						<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index" @click="handleToDetail(item.id)">
							<view class="list-music-top">
								{{index+1}}
							</view>
							<view class="list-music-song">
								<view class="list-music-title">
									{{item.name}}
								</view>
								<view class="list-music-imgs">
									<view class="">
										<text v-if="privileges[index].flag>60 && privileges[index].flag<70 ">无损</text>
										<text v-if="privileges[index].maxbr === 320000">独家</text>
									</view>
									<text>{{item.ar[0].name}} - {{item.al.name}}</text>
								</view>
							</view>
							<text class="iconfont icon-bofang1"></text>
						</view>
					</view>
				</scroll-view>
			</view>
	</view>
</template>

<script>
	import {musiclist} from '@/common/musicAPI.js'
	import '../../common/iconfont.css'
	export default {

		data() {
			return {
			playlist:{
				creator:{
					avatarUrl:''
				}
			},
			privileges:[]
			};
		},
		onLoad(options) {
			console.log(options.id);
			musiclist(options.id).then(res=>{
				// console.log(res);
				this.playlist=res.data.playlist
				this.privileges=res.data.privileges
			})
		},
		filters:{
			formatCount(value){
				if(value >=1000 && value <=100000000){
					value /= 1000
					return value.toFixed(1)+'万'
				}else if(value> 100000000){
					value /=100000000
					return value.toFixed(1)+'亿'
				}else{
					return value
				}
			}
		},
		methods:{
			handleToDetail(id){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-head {
		display: flex;
		margin: 30rpx;

		.list-head-img {
			width: 264rpx;
			height: 264rpx;
			border-radius: 30rpx;
			overflow: hidden;
			position: relative;
			margin-right: 42rpx;

			image {
				width: 100%;
				height: 100%;
			}

			text {
				position: absolute;
				top: 8rpx;
				right: 8rpx;
				color: white;
				font-size: 26rpx;
				
			}
		}

		.list-head-text {
			// background-color: pink;
			flex: 1;
			color: #f0f2f7;

			text {
				font-size: 34rpx;
			}

			.list-head-textImg {
				display: flex;
				margin: 20rpx 0;
				font-size: 24rpx;
				align-items: center;

				image {
					width: 54rpx;
					height: 54rpx;
					border-radius: 50%;
					margin-right: 14rpx;
				}
			}

			.list-headtext {
				font-size: 22rpx;
				line-height: 34rpx;
			}

		}
	}

	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background-color: rgba(0, 0, 0, 0.4);
		// background-color: pink;
		border-radius: 37rpx;
		color: #fff;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;

		text {}
	}

	.list-music {
		background-color: #fff;
		border-radius: 50rpx;
		margin-top: 40rpx;

		.list-music-head {
			height: 50rpx;
			margin: 30rpx 0 70rpx 22rpx;
			padding-top: 30rpx;
			box-sizing: border-box;
			// overflow: hidden;
			text {
				&:nth-child(1) {
					// color: pink; 
					font-size: 50rpx;
					height: 50rpx;
				}

				&:nth-child(2) {
					font-size: 30rpx;
					margin: 0 10rpx 0 26rpx;
					// color: pink;
				}

				&:nth-child(3) {
					font-size: 26rpx;
					color: #b2b2b2;
				}
			}
		}

		.list-music-item {
			display: flex;
			margin: 30rpx 0 66rpx 46rpx;
			align-items: center;
			color: #959595;
			.list-music-top {
				width: 58rpx;
				font-size: 30rpx;
				line-height: 30rpx;
			}
			
			.list-music-song {
				color: #000;
				flex: 0.9;
				.list-music-title {
					width: 600rpx;
					// background-color: pink;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.list-music-imgs {
					display: flex;
					align-items: center;
					font-size: 20rpx;
					
					view{
						text{
							&:nth-child(1),&:nth-child(2){
								padding: 1rpx;
								color: red;
								border: 1rpx solid red;
									margin-right: 10rpx;
							}
						}
					}
					text{
						width: 550rpx;
						// background-color: pink;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
			}

			text {
				color: black;
			}
		}
	}
</style>