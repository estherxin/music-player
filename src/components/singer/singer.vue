<template>
  <div class="singer" ref="singer">
  	<listview :data="singers" @select="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import listview from 'base/listview/listview'
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
 export default {
 	data(){
 		return {
 			singers:[]
 		}
 	},
 	created() {
 		this._getSingerList()
 	},
  components:{
    listview
  },
 	methods: {
 		_getSingerList() {
			getSingerList().then((response)=>{
				if(response.code === ERR_OK ) {
					this.singers = this._normalizeSinger(response.data.list)
					//console.log(this.singers)
				}

			})
 		},
 		_normalizeSinger(list) {
 			//处理成二层Object数据，之后再做成有序数组
 			let map = {
 				  hot: {
 				  	title: HOT_NAME, 
 				  	items:[]
 					}
 				}
 			list.forEach((item,index) =>{
 				if(index < HOT_SINGER_LEN) {
 					map.hot.items.push(new Singer({
 						name:item.Fsinger_name,
 						id:item.Fsinger_mid
 					}))
 				}
 				const key = item.Findex
 				if(!map[key]){
 					map[key] = {
 						title: item.Findex,
 						items:[]
 					}
 				}
 				map[key].items.push(new Singer({
 					name:item.Fsinger_name,
 				id:item.Fsinger_mid
 					}))
 				})
 				//因为遍历是Object无序的，所以做成数组后排序，
 			let ret = []
 			let hot = []
 			for(let key in map) {
 				let val = map[key] //Object
 				if(val.title.match(/[a-zA-z]/)){
 					ret.push(map[key])
 				} else if( val.title === HOT_NAME) {
 					hot.push(val)
 				}
 			}
 			ret.sort((a,b) =>{
 				return a.title.charCodeAt(0) - b.title.charCodeAt(0)
 			})
 			return hot.concat(ret);
 			},
      selectSinger(singer){
      // ok now what should we do ?  go to singer-detail page and 
        
        this.$router.push({
          path:`/singer/${singer.id}`
        })
        this.setSinger(singer)
      //send the singer to singer-detail page or vuex state to use it 

      },
      ...mapMutations({setSinger:'SET_SINGER'})

 		}
 	}


</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
/*better-scroll需要父元素固定高度，子元素撑开*/
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
