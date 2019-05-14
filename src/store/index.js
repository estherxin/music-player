//vuex入口文件奥。需要引入所有其他元素的奥
//所有元素注入到vuex实例中，导出实例，最终到vue的入口文件中注入
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'

import * as actions from './actions' 
//变成对象形式了奥
import * as getters from './getters'


//import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	 actions,
  getters,
  state,
  mutations
}) 

