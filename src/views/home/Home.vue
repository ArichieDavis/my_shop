<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

      <home-swiper :banners="banners"></home-swiper>
      <recomment-view :recommends="recommends"></recomment-view>
      <feature-view></feature-view>
      <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行','新款','精选']"></tab-control>
      <goods-list :goods="showGoods" />

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />

  </div>
</template>

<script>
  // 首页组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommentView from './childComps/RecommentView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import TabControl from 'components/content/tabcontrol/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop'
  // 导入网络请求模块
  import { getHomeMultiData, getHomeGoods } from 'network/home.js'


  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommentView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 1, list: [] },
          'new': { page: 1, list: [] },
          'sell': { page: 1, list: [] },
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },

    },
    created() {
      // 1.请求多个数据，在页面创建完成后发送网络请求
      this.getHomeMultiData()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      const refresh = this.debouce(this.$refs.scroll.refresh(), 500)
      // 3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        // console.log('-----');打印30次
        refresh()
        // this.$refs.scroll.refresh()
      })

    },
    methods: {
      /* 
              事件监听相关的方法
              */
      debouce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            if (this) func.apply(this, args)
          }, delay)
        }
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        // console.log('111');
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position); 
        // position.y < 1000
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        // console.log('111');
        // 监听图片加载完然后，
        // 重新计算可滚动的高度
        // this.$refs.scroll.scroll.refresh()

      },
      /* 
        网络请求相关的方法
      */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          // console.log(res);
          // 保存请求的数据 函数执行完毕会消失，所以这里需要保存请求的数据
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        // 获取goods里的页码
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        })
      },

    },
  }


</script>

<style scoped>
  #home {
    height: 100vh;
    /* padding-top: 44px; */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /* position: sticky; */
    top: 44px;

  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>