<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
  export default {
    name: 'HomeSwiper',
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      //发出四次事件，但我们要它只发送一次
      imageLoad() {
        if (!this.isLoad)
          this.$emit("swiperImageLoad")
        this.isLoad = true
      }
    },
  }
</script>