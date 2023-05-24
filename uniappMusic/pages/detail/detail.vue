<template>
	<view class="detail">
		<!-- <view class="fixbg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"> </view> -->
		<view class="fixbg"> </view>
		<musichead title="歌单" :icon="true" white="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="detail-play">
					<image src="../../static/logo.png" mode=""></image>
					<text class="iconfont">暂</text>
					<view class=""></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-warp">
						<view class="detail-lyric-item">测试文字</view>
						<view class="detail-lyric-item-active">测试文字</view>
						<view class="detail-lyric-item">测试文字</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						喜欢这首歌的人也听
					</view>
					<view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view class="detail-like-title">蓝</view>
							<view>
								<text>独家</text>
								<text>无损</text>
								是白器 - 蓝
							</view>
					</view>
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">
						警察评论
					</view>
					<view class="detail-comment-item">
						<view class="detail-comment-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view class="detail-comment-nickname">
										是分内的事
									</view>
									<view class="detail-comment-tiem">
										时间
									</view>
								</view>
								<view class="detail-comment-like">
									2651
									<text class="iconfont"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								测试文字
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			console.log(options.id);
		}
	}
</script>

<style lang="scss">
.detail-play{
	width: 580rpx;
	height:580rpx;
	background-image: url();
	background-size: cover;
	margin: 214rpx auto 0 auto;
	background-color: pink;
	position: relative;
	image{
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	text{
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: green;
	}
	view{
		width: 230rpx;
		height: 360rpx;
		background-image: url();
		position: absolute;
		top: -200rpx;
		left: 80rpx;
		right: 0;
		bottom: 0;
		margin: auto;
		background-size: cover;
	}
}

.detail-lyric{
	font-size: 32rpx;
	line-height: 82rpx;
	height: 246rpx;
	text-align: center;
	overflow: hidden;
	
	.detail-lyric-warp{
		.detail-lyric-item{
			line-height: 82rpx;
			color: #6f6e73;
		}
		.detail-lyric-item-active{
			color: #fff;
		}
	}
}

.detail-like{
	margin: 0 30rpx;
	.detail-like-head{
		font-size: 36rpx;
		// color: #fff;
		margin: 50rpx 0;
	}
	.detail-like-item{
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
		.detail-like-img{
			width: 82rpx;
			height: 82rpx;
			border-radius: 20rpx;
			overflow: hidden;
			margin-right: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.detail-like-song{
		flex: 1;
		.detail-like-title{
			font-size: 28rpx;
			// color: #fff;
			margin-bottom: 12rpx;
		}

		&:nth-child(2){
			font-size: 22rpx;
			text{
				font-size: 20rpx;
				color: red;
				margin-right: 10rpx;
				// width: 26rpx;
			}
		}
	}
	text{
		font-size: 50rpx;
		// color: pink;
		line-height: 1.5;
	}
}

.detail-comment{
	margin: 0 30rpx;
	.detail-comment-head{
		font-size: 36rpx;
		color: #fff;
		margin: 50rpx 0;
	}
	.detail-comment-item{
		margin-bottom: 28rpx;
		display: flex;
		.detail-comment-img{
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 18rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail-comment-content{
			flex: 1;
			color: #cacbcf;
			.detail-comment-title{
				display: flex;
				justify-content: space-between;
				.detail-comment-name{
					// color: #fff;
					.detail-comment-nickname{
						font-size: 26rpx;
					}
					.detail-comment-tiem{
						font-size: 20rpx;
						// color: pink;
					}
				}
				.detail-comment-like{
					font-size: 28rpx;
					
				}
			}
			.detail-comment-text{
				font-size: 28rpx;
				line-height: 40rpx;
				color: pink;
				margin-top: 20rpx;
				// color: #fff;
			}
		}
	}
}
</style>
