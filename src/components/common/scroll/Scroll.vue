<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      // data: {
      //   type: Array,
      //   default() {
      //     return []
      //   }
      // }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BetterScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 2.事件滚动
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.上拉加载
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多');

          this.$emit('pullingUp')

        })
      }

    },
    methods: {

      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },

      refresh() {

        this.scroll && this.scroll.refresh()
      },
      finishedPullUp() {
        // console.log("--------------");
        this.scroll && this.scroll.finishPullUp()
      },


    },
    // watch: {
    //   data() {
    //     setTimeout(this.refresh, 20)
    //   }
    // }
  }
</script>

<style scoped>

</style>