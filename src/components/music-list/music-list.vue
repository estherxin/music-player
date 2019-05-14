<template>
  <div class="music-list">
    <h1 v-html="title" class="title"></h1>
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper" v-show="songs.length>0" ref="playBtn" @click="">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
     <scroll ref="list" :data="songs" class="list" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll">
        <div class="song-list-wrapper">
            <song-list :songs="songs" @select="selectItem"></song-list>
        </div>
        <div v-show="!songs.length" class="loading-container">
          <loading></loading>
        </div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import songList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  //css 是vue-loader自动处理浏览器兼容。 js需要手动
  import { prefixStyle } from'common/js/dom'
  import {mapActions} from 'vuex'
  let transform = prefixStyle('transform')
   const RESERVED_HEIGHT = 40
  export default {
    data() {
      return {
        scrollY: 0
      }
    },
    props:{
      title:{
        type: String,
        default: ''
      },
      avatar:{
        type: String,
        default:''
      },
      songs:{
        type: Array,
        default:[]
      }
    },
    created(){
      this.probeType = 3
      this.listenScroll = true
      
    },
    computed:{
      bgStyle(){
        return `background-image: url(${this.avatar})`
      }
    },
    mounted(){
      //保存數值 
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
      this.minTransitionY = -this.imageHeight + RESERVED_HEIGHT
    },
    methods:{
      scroll(pos){
        //向上滚是负值
        this.scrollY = pos.y
      },
      back(){
        this.$router.back()
      },
      selectItem(item, index){
        this.selectPlay({
          list: this.songs, 
          index
        })
      },
      ...mapActions(['selectPlay'])
    },
    watch:{
      scrollY(newY){
        let zIndex = 0
        let scale = 1
        let percentage
        //確定layer层不會滾過頭
        let translateY = newY > this.minTransitionY ? newY : this.minTransitionY
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        //当滚动的Y位置比图片位置还要向下的时候，也就是在下拉。
        if(newY > 0){
          zIndex = 10
          percentage = Math.min(Math.abs(newY / this.imageHeight),0.7)
          scale += percentage
          
        }
        // 当向上滚动过了遮挡层的时候，也就是说会挡住标题栏的时候。
        if(newY < this.minTransitionY){
          
          zIndex = 10
          //增加背景图z-index同时减少高度
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        }else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display= ''
        }

        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`

      }
    },
    components:{
      songList,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
