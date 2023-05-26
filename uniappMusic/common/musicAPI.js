import {baseURL} from '@/common/config.js'

//获取音乐榜单,第一个参数是分页，第二个是某个榜单的id
export const topList=(pageSize)=>{
	
	return new Promise((reslove,reject)=>{
		uni.request({
			url:`${baseURL}/toplist/detail`,
			success:(res)=>{
				let result =res.data.list
				let arr=result.slice(pageSize*6,pageSize*6+6)
				reslove(arr)
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	})
	
}
//获取该音乐榜单的每项数据,第一个参数是分页，第二个是某个榜单的id
export const musiclist =(id)=>{
	return new Promise((reslove,reject)=>{
		uni.request({
			url:`${baseURL}/playlist/detail?id=${id}`,
			success:(res)=>{
				
				reslove(res)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}

//获取该音乐数据
	export const songDetail =(id)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/song/url?id=${id}`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	//获取相似音乐
	export const minisong =(id)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/simi/song?id=${id}`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	
	//获取歌词
	export const lyricDetail =(id)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/lyric?id=${id}`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	
	
	//获取评论
	export const commentmusic =(id)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/comment/music?id=${id}`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	
	//获取歌曲详情
	export const songdetail =(id)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/song/detail?ids=${id}`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	
	// /search/suggest?keywords=海阔天空
	
	//搜索歌曲
	export const searchMusic =(value)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/search?keywords=${value}`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	//搜索热歌
	export const searchHot =(value)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/search/hot/detail`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}
	
	//搜索建议
	export const searchSuggest =(value)=>{
		return new Promise((reslove,reject)=>{
			uni.request({
				url:`${baseURL}/search/suggest?keywords=${value}&type=mobile`,
				success: (res) => {
					// console.log(res);
					reslove(res)
				},
				complete: () => {
					
				}
			})
		})
	}