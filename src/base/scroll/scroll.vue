<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
export default{
  props: {
    data: {
      type: Array,//接收data是为了在data改变的时候，重新计算长度
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  mounted(){
    // DOM渲染完毕后初始化scroll功能。
    this._initScroll()
    //分别封装enable,disable,refresh留待候用
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper ) return 
        //创建一个scroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType
      })
    //设置是否监听滚动事件
    if(this.listenScroll) {
      let me = this //scroll内的this指向scroll
      this.scroll.on('scroll',(pos)=>{
        me.$emit('scroll',pos)
      })
    }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo(){
      this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
  },
  computed: {
    data() {
      setTimeout(() => {
        this.refresh()
      })
    }
  }
}


</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>



/*  import BScroll from 'better-scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      direction: {
        type: String,
        default: DIRECTION_V
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        })

        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }

*/