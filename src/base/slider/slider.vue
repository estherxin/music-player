
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// 用BScroll做动画，需要外面提供的数据：是否循环，多久循环，是否自动播放。
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
export default {
  data() {
    return {
      dots:[],
      currentPageIndex: 0
    }
  },
  props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
  mounted() {

    setTimeout(() => {
      //DOM渲染完毕后，首先设置scroll需要的子元素的宽度，图片摆正，点摆放好，然后设置scroll滚动
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      //如果存在autoplay,设置循环
      if (this.autoPlay) {
        this._play()
      }
    },20)


    // 监听resize事件，重新计算slider和scroll的数据
    window.addEventListener('resize', () => {
      if (!this.slider) return
      this._setSliderWidth(true)
      this.slider.refresh()
          })
  },
  activated() {
      this.slider.enable()
  },
  methods: {
    _setSliderWidth(isResize) {
      //以撑满它自身父元素的slider的clientWidth为基准，把图片设置成同样大小（以加class和设置width的方式）
      // 并且设置好scroll需要的子元素的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children
      let width = 0
      for (let i = 0; i<this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !this.isResize) {
        width += sliderWidth * 2
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
             })
    
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        /*if (this.loop) {
          pageIndex -=1
        }*/
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      })
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
        /*let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.slider.goToPage(pageIndex, 0, 400);*/
      }, this.interval)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
