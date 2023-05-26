<template>
	<view class="search">
		<musichead title='搜索' :icon="true" ></musichead>
		<view class="container" v-show="isLoading">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont icon-Search"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchwork" @confirm="handleToSearch(searchwork)"
					@input="handleToSuggest">
					<text class="search-clear" @tap="handleToClear" v-if="searchType == 1">X</text>
					<text class="search-clear" @tap="handleToClose" v-else>X</text>
				</view>
				<block v-if="searchType==1">
				<view class="search-history">
					<view class="search-history-head">
						<text>历史记录</text>
						<text class="iconfont"></text>
					</view>
					<view class="search-history-list">
						<view class="search-history-item" v-for="(item,index) in searchHistory" :key="index" @tap="handleToWord(item)">{{item}}</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-item" v-for="(item,index) in searHot" :key="index" @tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">
								{{index+1}}
							</view>
							<view class="search-hot-word">
								<view class="search-hot-word-music">
									{{item.searchWord}} 
									<image :src="item.iconUrl || ''" mode="aspectFit"></image>
								</view>
								<view class="search-hot-word-name">
									{{item.content}}
								</view>
							</view>
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</view>
				</block>
				<block v-else-if="searchType==2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap='handleToDeatil(item.id)'>
							<view class="search-search-word">
								<view class="">
									{{item.name}}
								</view>
								<view class="">
									{{item.artists[0].name}} - {{item.name}}
								</view>
							</view>
							<text class="iconfont icon-bofang1"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType==3">
					<view class="search-suggest">
						<view class="search-suggest-head">
							搜索 "{{searchwork}}"
						</view>
						<view class="search-suggest-item" v-for="(item,index) in searchSugget" :key="index" @tap="handleToresutl(item.keyword)">
							<text class="iconfont icon-Search"></text>
						{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {searchHot,searchSuggest,searchMusic} from '../../common/musicAPI.js'
	import '@/common/iconfont.css'
	export default {
		data() {
			return {
				isLoading:true,
				searHot:[],
				searchwork:'',
				searchHistory:[],
				searchType:1,
				searchList:[],
				searchSugget:[]
			};
		},
		onLoad() {
			//搜索热门歌曲
			searchHot().then((res)=>{
				this.searHot=res.data.data
			})
			//读取本地存储
			uni.getStorage({
				key:'searchHistory',
				success:(res)=>{
					this.searchHistory=res.data
				}
			})
		},
		methods:{
			handleToWord(value){
				this.searchwork=value
			},
			//搜索记录
			handleToSearch(word){
				this.searchHistory.unshift(word)
				//数组去重
				this.searchHistory=[...new Set(this.searchHistory)]
				
				if(this.searchHistory.length>10){
					this.searchHistory.length=10
				}
				//本地存储
				uni.setStorage({
					key:'searchHistory',
					data:this.searchHistory
				})				
				this.getSearchList(word)
			},
			//清除本地存储
			handleToClear(){
				uni.removeStorage({
					key:'searchHistory',
					success: (res) => {
						this.searchHistory=[]
					}
				})
			},
			//得到搜索结果
			getSearchList(work){
				console.log(work);
				searchMusic(work).then(res=>{
					this.searchList=res.data.result.songs
					this.searchType=2
				})
			},
			//返回搜索
			handleToClose(){
				this.searchwork=''
				this.searchType=1
			},
			//跳转到歌曲详情
			handleToDeatil(id){
				console.log(id);
				uni.navigateTo({
					url:`/pages/detail/detail?id=${id}`
				})
			},
			handleToSuggest(e){
				let val = e.detail.value
				if(!val){
					this.searchType=1
					return
				}
				searchSuggest(val).then(res=>{
					console.log(res);
					this.searchSugget=res.data.result.allMatch
					this.searchType=3
				})
			},
			handleToresutl(word){
				this.searchwork=word
				this.handleToSearch(word)
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-search{
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
		flex: 1;
		font-size: 28rpx;
	}
	.search-clear{}
}
.search-history{
	margin: 40rpx 30rpx;
	font-size: 26rpx;
	.search-history-head{
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}
	.search-history-list{
		display: flex;
		flex-wrap: wrap;
		.search-history-item{
			padding: 16rpx 28rpx;
			border-radius: 40rpx;
			margin-right: 30rpx;
			margin-bottom: 30rpx;
			background-color: #f7f7f7;
		}
	}
}
.search-hot{
	margin: 0 30rpx;
	font-size: 26rpx;
	.search-hot-head{
		margin-bottom: 36rpx;
	}
	.search-hot-item{
		display: flex;
		align-items: center;
		margin-bottom: 58rpx;
		.search-hot-top{
			color: #fb2222;
			width: 60rpx;
			margin-left: 8rpx;
		}
		.search-hot-word{
			flex: 1;
			font-size: 30rpx;
			.search-hot-word-music{
				color: black;
				image{
					width: 48rpx;
					height: 22rpx;
				}
			}
			.search-hot-word-name{
				width: 90%;
				color:#878787 ;
				font-size: 24rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		.search-hot-count{
			color:#878787 ;
		}
	}
}

.search-result{
	border-top: 2rpx solid #e4e4e4;
	padding: 30rpx;
	.search-result-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 2rpx solid #e4e4e4;
		text{
			font-size: 50rpx;
		}
		.search-search-word{
			view{
				&:nth-child(1){
					font-size: 28rpx;
					color: #235790;
					margin-bottom: 12rpx;
				}
				&:nth-child(2){
					font-size: 22rpx;
					color: #898989;
				}
			}
			
		}
	}
}

.search-suggest{
	border-top: 2rpx solid #e4e4e4;
	padding: 30rpx;
	.search-suggest-head{
		font-size: 26rpx;
		color: #235790;
		margin-top: 74rpx;
	}
	.search-suggest-item{
		color: #5d5d5d;
		margin-top: 74rpx;
		text{
			color: #dbdbdb;
			margin-right: 28rpx;
		}
	}
}
</style>
