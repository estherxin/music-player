
<template>
  <scroll 
          class="listview"
          ref="listview"
          :listenScroll="listenScroll"
          :data="data"
          @scroll="scroll"
          :probeType ="probeType"
          >
    <ul>
        <li v-for="group in data" class="list-group" ref="listGroup" >
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
              <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)"
                >
                  <img v-lazy="item.avatar" class="avatar">
                  <span class="name">{{item.name}}</span>
              </li>
          </ul>
        </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
        <ul>
            <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{current: currentIndex === index}">
                {{item}}
            </li>
        </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">

import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import loading from 'base/loading/loading'
const ANCHOR_HEIGHT = 15
const TITLE_HEIGHT = 30 
export default {
  data() {
    return {
      scrollY: -1,//实时监听滚动的Y值。进而调整高亮字母。
      currentIndex: 0, //当前高亮index
      diff: -1
      }
  },
  props: {
      data: {
        type: Array,
        default: []
      }
  },
  components: {
      Scroll,
      loading,
  },
  computed:{
      shortcutList(){
        let raa = []
        this.data.map((group)=>{
          raa.push(group.title.substring(0,1))
        })
        return raa;
      },
      fixedTitle(){
        if(this.scrollY > 0 ){return false}
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title :''
      }
    },
  created(){
      //为了保存数值而设定的对象（不需要被监听的）
      this.touch = {}
      //是否监听滚动
      this.listenScroll = true
      this.listHeight= []
      this.probeType= 3
      this.fixedTransY = 0
    },
    methods:{
      onShortcutTouchStart(e){
        //获取之前保存在data-index属性上的index
       let anchorIndex =  getData(e.target, 'index')
              this._scrollTo(anchorIndex) 
              //这样滚动的Y,不会派发滚动事件，需要手动设置一下高亮，也可以直接设置scrollY，然后watch scrollY相应设定高亮
              //this.currentIndex =  parseInt(anchorIndex)
              let firstTouch = e.touches[0];
              //为了在函数中共享开始触碰的时候的Y值。
              this.touch.y1 = firstTouch.pageY
              //字符串anchorIndex转化成数字。
              this.touch.index = parseInt(anchorIndex)
      },
      onShortcutTouchMove(e){
        //确定当前手指在哪里多少
        let secondTouch = e.touches[0];
        this.touch.y2 = secondTouch.pageY;
        //计算最开始的位置和当前位置的差值,除以每个字母的占地面积。
        //得到移动的Index
        let delta = Math.floor((this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT)
        let num = delta + this.touch.index;
        this._scrollTo(num) 
        //this.currentIndex = num
      },
      scroll(pos) {
        //为了计算高亮,监听滚动,需要保存Y值。进而确定滚动位置所在区间,进而计算Index。
        this.scrollY = pos.y;
        //这个y值是better-scroll所输出的。正常滚动是负值
        //可以在这里计算高亮,也可以通过监测this.scrollY来。
      // for(let i=0;i < this.listHeight.length-1 ;i++){
       // if( this.listHeight[i] <= -this.scrollY &&   this.listHeight[i+1] > -this.scrollY) {
//this.currentIndex = i
        //}
       //}
      },
      _scrollTo(index) {
        //如果Index ===null
        if(!index) {return}
          //如果index<0 或者大于最大的数
        if(index<0 || index> this.listHeight.length-1) {return}
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)

        this.scrollY = - this.listHeight[index]
      },
      _calculateHeight(){
        //什么时机呢？ 接收到data,并且渲染dom之后
        this.listHeight =[] //每次获得数据,初始化成空数组再计算。
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height);
        for (let i=0;i<list.length ;i++){
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectItem(item){
        this.$emit('select',item)
      }
    },
    watch: {
      data(){
        setTimeout(()=>{
          this._calculateHeight()
         
        },20)
      },
      scrollY(posY){
         //正常方向,posY是负值。
         const listHeight = this.listHeight
        //如果滚动了,那么,应该做什么呢,第一判断是不是向上滚动了。如果是,那么就高亮第一个
        if(posY > 0 ) {
          this.currentIndex = 0
          return
        }
        for (let i=0; i<listHeight.length-1; i++){
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
        if( height1 <= -posY && height2  > -posY) {
          this.currentIndex = i
          //滚动的同时派发给diff值。
          this.diff = height2 + posY
          return
        }
        
      }
        //第二,如果是最后一个应该滚动到哪里。
        this.currentIndex = listHeight.length - 2
        //PS:为了监测快速的swipe滚动，需要给scroll传参数，probeType:3 

    },
    diff(newVal){
      //通过滚动的变化，监测到距离，并被执行。
      //如果还没到顶部，但是已经小于标题栏了。
      //如果不在这个范围内，就一直等于0
      let fixedTransY  = newVal > 0 && newVal < TITLE_HEIGHT ? - (TITLE_HEIGHT - newVal) : 0
      //if(this.fixedTransY === fixedTransY  ){return} //为了优化，减少DOM炒作的奥
      //this.fixedTransY = fixedTransY
        this.$refs.fixed.style.transform= `translate3d(0, ${fixedTransY}px ,0)`
  
}
}
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
