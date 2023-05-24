import {baseURL} from '@/common/config.js'

//获取音乐榜单,第一个参数是分页，第二个是某个榜单的id
export const topList=(pageSize,id)=>{
	
	return new Promise((reslove,reject)=>{
		uni.request({
			url:`${baseURL}/toplist/detail?id=${id}`,
			success:(res)=>{
				let result =res.data.list
				// console.log(res.data.list);
				let arr=result.slice(pageSize*6,pageSize*6+6)
				// result=res
				// console.log(arr);
				reslove(arr)
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	})
	
}