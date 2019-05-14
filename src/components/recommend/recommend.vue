<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadedImage" class="needsclick">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text" >
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-if="!discList.length">
        <loading :title="'加载中...'" ></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend, getDiscList} from 'api/recommend'
  import slider from 'base/slider/slider'
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  const ERR_OK = 0
  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDistList()
    },
    methods: {
      _getRecommend(){ 
        getRecommend().then((res) => {
          if(res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
        },
      _getDistList() {
        getDiscList().then((res) =>{
          if(res.code === ERR_OK) {
          this.discList = res.data.list
          }
        })
      },
    loadedImage() {
      //为了防止列表比图片先加载导致scroll出现问题，图片撑开盒子之后，让scroll重新计算。
      if (!this.checkLoaded) {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        },20)
        this.checkLoaded = true
      }
      //为了节省时间，只执行一次，所以设置标志位。
    },
    selectItem(item) {
      this.$router.push({path:`/recommend/${item.dissid}`})
    }
  },
  components: {
      slider,
      scroll,
      loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px //垂直居中
          line-height: 65px
          text-align: center //水平中
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center //跟主轴垂直的方向上居中
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>