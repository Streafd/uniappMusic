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