<template>
  <swiper>
    <swiper-item v-for="(item, index) in topImages" :key="index" class="swiper-item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .swiper-item {
    height: 300px;
  }
</style>