<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
  export default {
    name: 'HomeSwiper',
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
    }
  }
</script>