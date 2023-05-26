import Vue from 'vue'
import Vuex from 'vuex'

// import {} from '../common/musicAPI.js'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topListIds:[],
		nextId:''
	},
	actions:{},
	mutations:{
		INIT_TOPLISTIDS(state,value){
			state.topListIds=value
		}
	},
	getters:{}
})