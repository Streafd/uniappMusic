<template>
	<view class="index-content">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<!-- 搜索歌曲 -->
				<view class="index-search" @click="handleToSearch">
					<text class="iconfont icon-Search"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<!-- 歌曲榜单 -->
				<view class="index-list" v-for="item in list" :key="item.id" @click="handleToList(item.id)">
					<view class="index-list-item">
						<!-- 图片右侧 -->
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.name}}</text>
						</view>
						<!-- 歌曲左侧 -->
						<view class="index-list-text">
							<view v-for="(musiclist,index) in item.tracks" :key="index">1.{{musiclist.first}} - {{musiclist.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	//API接口
	import {topList} from '@/common/musicAPI.js'
	export default {
		data() {
			return {
				title: 'Hello',
				list:[],
				newlist:[],
				// pageSize:1,
				num:0
			}
		},
		onLoad() {
			console.log('onload');
		this.getMusic()
		},
		//下拉刷新
		onReachBottom() {
			this.num+=1
			this.getMusic()
			
		},
		methods: {
			getMusic(){
				//加载提示
				uni.showLoading({
					title:'加载中...',
				})
				//获取所有音乐榜单
				topList(this.num).then(res=>{
					// console.log(res);
					// this.newlist=res
					this.list.push(res)
					this.list=this.list.flat()
					// console.log(this.list.flat());
				})
			},
		handleToList(value){
			uni.navigateTo({
				url:`/pages/list/list?id=${value}`
			})
		},
		handleToSearch(){
			uni.navigateTo({
				url:'/pages/search/search'
			})
		}
		}
	}
</script>

<style lang="scss" scoped>
	.index-content {
		.container {
			scroll-view {
				.index-search {
					display: flex;
					align-items: center;
					height: 70rpx;
					margin: 70rpx 30rpx 30rpx 30rpx;
					background-color: #f7f7f7;
					border-radius: 50rpx;
					text {
						font-size: 26rpx;
						margin:0 26rpx;
					}
					input{
						font-size: 28rpx;
					}
				}
				.index-list{
					margin: 0 30rpx;
					.index-list-item{
						display: flex;
						margin-bottom: 34rpx;
						.index-list-img{
							width: 212rpx;
							height: 212rpx;
							background-color: pink;
							position: relative;
							border-radius: 30rpx;
							margin-right: 22rpx;
							overflow: hidden;
							image{
								width: 100%;
								height: 100%;
							}
							text{
								position: absolute;
								left: 12rpx;
								bottom: 16rpx;
								color: #fff;
								font-size: 20rpx;
							}
						}
					.index-list-text{
						font-size: 24rpx;
						line-height: 66rpx;
					}
					}
					
				}
			}
		}
	}
</style>