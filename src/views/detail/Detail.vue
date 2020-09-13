<template>
  <div class="detail">
    <!-- 我是detail:{{$route.params.iid}} -->
    <detail-nav-bar />
    <scroll class="content">

      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <ul>
        <li>1ni</li>
        <li>2ni</li>
        <li>3ni</li>
        <li>4ni</li>
        <li>5ni</li>
        <li>6ni</li>
        <li>7ni</li>
        <li>8ni</li>
        <li>9ni</li>
        <li>10ni</li>
      </ul>


    </scroll>


  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import { getDetail, Goods } from 'network/detail.js'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
      }
    },
    created() {
      //1.获取iid
      this.iid = this.$route.query.iid
      // console.log(typeof this.iid);

      //2.请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取数据
        const data = res.result
        console.log(data);

        // 2.取出轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 3. 创建商品的对象
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)


      })
    },
    methods: {

    },
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>