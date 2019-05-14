<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :songs="songs" :title="title" :avatar="avatar"></music-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
//this should be the one using data from a cick on singer list 
import {mapGetters} from 'vuex'
import {getSingerDetail } from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong ,processSongsUrl} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default{

  computed:{
    title(){
     return this.singer.name
    },
    avatar(){
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
      ])

  },
  data(){
    return {
      songs:[]
  }
},
  created(){

    this._getDetail()
  },
  methods:{
    _getDetail(){
      if(!this.singer.id) {
        this.$router.push('/singer/')
        return
      }
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.code === ERR_OK){
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
              this.songs = songs
            })
        }
      })
    },
    _normalizeSongs(list){
      let res = []
      //make an array of new songs 
      list.forEach((item) =>{
        let { musicData } = item
        res.push( createSong(musicData))
      })
      return res
    }
  },
  components:{
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .singer-detail
    z-index: 100
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

  .slide-enter-active ,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)



</style>