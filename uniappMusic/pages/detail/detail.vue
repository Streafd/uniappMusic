<template>
	<view class="detail">
		<view class="fixbg" :style="{'background-image':'url('+sonde.al.picUrl+')'}"> </view>
		<!-- <view class="fixbg"> </view> -->
		<musichead :title="sonde.name" :icon="true" white="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="detail-play" @click="handleToPlay">
					<image :src="sonde.al.picUrl" class="detail-play-img " :class="isplayrotate==true?'detail-play-run':''"></image>
					<text class="iconfont" :class="iconplay"></text>
					<view class=""></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-warp" :style="{transform:'translateY('+ -(lyricIndex-1)*82 +'rpx)'}">
						<view class="detail-lyric-item" :class="lyricIndex===index?'detail-lyric-item-active':'' " v-for="(item,index) in songlyric" :key="index">{{item.lyric}}</view>
						
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						喜欢这首歌的人也听
					</view>
					<view class="detail-like-item" v-for="(item,index) in songsimi" :key="index" @tap="handleToSimi(item.id)">
						<view class="detail-like-img">
							<image :src="item.album.picUrl || ''" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view class="detail-like-title">{{item.name}}</view>
							<view>
								<text v-if="item.privilege.flag >60 && item.privilege.flag <70">独家</text>
								<text v-if="item.privilege.maxbr=== 999000">无损</text>
								{{item.album.artists[0].name}} - {{item.name}}
							</view>
					</view>
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">
						精彩评论
					</view>
					<view class="detail-comment-item" v-for="(item,index) in songcomment" :key="index">
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl || ''" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view class="detail-comment-nickname">
										{{item.user.nickname}}
									</view>
									<view class="detail-comment-tiem">
										{{item.time | farmtime()}}
									</view>
								</view>
								<view class="detail-comment-like">
									{{item.likedCount}}
									<text class="iconfont"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import {songDetail,minisong,lyricDetail,songdetail,commentmusic} from '@/common/musicAPI.js'
	import '../../common/iconfont.css'
 	export default {
		data() {
			return {
				//歌曲详情信息
			sonde:{
				al:{
					picUrl:''
				}
			},
			songsimi:[],
			songcomment:[],
			songlyric:[],
			lyricIndex:0,
			bgAudioManager:{},
			iconplay:'icon-zanting',
			isplayrotate:false
			}
		},
		onLoad(options) {
			// console.log();
			this.getMusic(options.id)
		},
		// 离开页面是移除定时器
		onUnload() {
			this.cancelLyricIndex()
						
			// #ifdef H5
			//在h5中离开页面就销毁
			this.bgAudioManager.destroy()
			// #endif
		},
		// 切换页面是移除定时器
		onHide() {
			this.cancelLyricIndex()
			
			// #ifdef H5
			//在h5中切换页面就销毁
			this.bgAudioManager.destroy()
			// #endif
		},
		methods:{
			getMusic(id){
				Promise.all([songdetail(id),minisong(id),commentmusic(id),lyricDetail(id),songDetail(id)]).then((res)=>{
					if(res[0].data.code ===200){
						this.sonde=res[0].data.songs[0]
					}
					if(res[1].data.code===200){
						this.songsimi=res[1].data.songs
					}
					if(res[2].data.code===200){
						this.songcomment=res[2].data.hotComments
					}
					
					if(res[3].data.code===200){
						let lyric=res[3].data.lrc.lyric
						// console.log(lyric)
						// console.log(lyric.split('\n'))
						let re =/\[([^\]]+)\]([^\[]+)/g
						let result =[]
						lyric.replace(re,($0,$1,$2)=>{
							result.push({"tiem":this.formatTimeToSec($1),"lyric":$2})
						})
						this.songlyric=result
					}
					if(res[4].data.code===200){
						// 微信小程序
						// #ifdef MP-WEIXIN
						this.bgAudioManager = uni.getBackgroundAudioManager();
						this.bgAudioManager.title=this.sonde.name
											this.listenLyricIndex()
						// #endif
						
						//h5
					// #ifdef H5
					this.bgAudioManager=uni.createInnerAudioContext()
					this.bgAudioManager.autoplay = true;
					this.iconplay='icon-bofang'
					this.isplayrotate=false

					// #endif
					
					
					// console.log(this.bgAudioManager);
					this.bgAudioManager.src=res[4].data.data[0].url

					this.bgAudioManager.onPlay(()=>{
						this.iconplay='icon-zanting'
						this.isplayrotate=true
						// console.log(1);
						this.listenLyricIndex()
					})
					this.bgAudioManager.onPause(()=>{
						this.iconplay='icon-bofang'
						this.isplayrotate=false
						this.cancelLyricIndex()
					})
					

					}
				});
			},
			//歌词时间格式化
			formatTimeToSec(value){
				let arr =value.split(':')
				// console.log(1);
				return (Number(arr[0]*60) + Number(arr[1])).toFixed(1)
				
			},
			//点击暂停/播放
			handleToPlay(){
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play()
				}else{
					this.bgAudioManager.pause()
				}
			},
			// 歌词滚动
			listenLyricIndex(){
				// 清除旧的定时器
				clearInterval(this.timer)
				this.timer =setInterval(()=>{
					for(let i=0; i<this.songlyric.length;i++){
						if(this.bgAudioManager.currentTime>this.songlyric[this.songlyric.length-1].time){
							this.lyricIndex=this.songlyric.length-1
							break
						}
						if(this.bgAudioManager.currentTime>this.songlyric[i].tiem && this.bgAudioManager.currentTime<this.songlyric[i+1].tiem){
							this.lyricIndex=i
						}
						console.log(this.lyricIndex);
					}
				},500)
				
			},
			//清除定时器
			cancelLyricIndex(){
				clearInterval(this.timer)
			},
			//点击相似歌曲
			handleToSimi(id){
				// #ifdef H5
				this.bgAudioManager.destroy()
				// #endif
				this.getMusic(id)
			}
		},
		filters:{
			farmtime(value){
				let data =new Date(value)
				return data.getFullYear() +'年'+data.getMonth()+'月'+data.getDate()+'日'
			}
		}
	}
</script>

<style lang="scss">
.detail-play{
	width: 580rpx;
	height:580rpx;
	// background-image: url();
	background-size: cover;
	margin: 214rpx auto 0 auto;
	// background-color: pink;
	position: relative;
	
	.detail-play-img{
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		animation:go 10s linear infinite;
		animation-play-state: paused;
	}
	.detail-play-run{
		animation-play-state: running;
			@keyframes go {
							from{transform: rotate(0deg);}
							to{transform: rotate(360deg);}
						}
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
	}
	view{
		width: 230rpx;
		height: 360rpx;
		// background-image: url();
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
		transition: .5s ;
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
		color: #fff;
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
			color: #fff;
			margin-bottom: 12rpx;
		}
		&:nth-child(2){
			font-size: 22rpx;
			color: #fff;
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
					}
				}
				.detail-comment-like{
					font-size: 28rpx;
					
				}
			}
			.detail-comment-text{
				font-size: 28rpx;
				line-height: 40rpx;
				margin-top: 20rpx;
				color: #fff;
				border-bottom: 1px solid #e0e0e0;
				padding-bottom: 40rpx;
			}
		}
	}
}
</style>
