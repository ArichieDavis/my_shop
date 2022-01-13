<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="topTab"
      v-show="isTabFixed"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      :probe-type="3"
    >
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recomment-view :recommends="recommends"></recomment-view>
      <feature-view></feature-view>
      <tab-control
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="contentTab"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 首页组件
import NavBar from "components/common/navbar/NavBar.vue"
import HomeSwiper from "./childComps/HomeSwiper.vue"
import RecommentView from "./childComps/RecommentView.vue"
import FeatureView from "./childComps/FeatureView.vue"
import TabControl from "components/content/tabcontrol/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll.vue"
// import BackTop from "components/content/backTop/BackTop";
// 导入网络请求模块
import { getHomeMultiData, getHomeGoods } from "network/home.js"

import { debounce } from "../../common/untils.js"
import { itemListenerMixin, BackTopMixin } from "../../common/mixin.js"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommentView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  mixins: [itemListenerMixin, BackTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },

  destroyed() {
    console.log("销毁")
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    // this.$bus.$off("itemImageLoad",this.itemListener)
  },
  created() {
    // 1.请求多个数据，在页面创建完成后发送网络请求
    this.getHomeMultiData()

    // 2. 请求商品数据
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")

    // 3.赋值
    // this.$bus.$on('imgLoad', () => {
    //   this.$refs.scroll.refresh()
    // })
  },

  methods: {
    /*
              事件监听相关的方法
              */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }
      this.$refs.contentTab.currentIndex = index
      this.$refs.topTab.currentIndex = index
    },
    //点击backTop回到顶部
    // backClick() {
    //   // console.log('111');
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    contentScroll(position) {
      // console.log(position);
      // position.y < 1000
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000

      //2.决定tabControl是都吸顶（position:fixed）

      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      // 上拉加载更多
      // console.log("加载更多");
      this.getHomeGoods(this.currentType)
      // console.log('111');
      // 监听图片加载完然后，
      // 重新计算可滚动的高度
      this.$refs.scroll.refresh()
    },

    swiperImageLoad() {
      // 2. 获取tabControl的offsetTop
      // 又有的组件都有一个属性$el:用于获取组件中的元素
      // console.log('-----');
      this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop
    },
    /*
        网络请求相关的方法
      */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        // console.log(res);
        // 保存请求的数据 函数执行完毕会消失，所以这里需要保存请求的数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        console.log(this.recommends)
      })
    },
    getHomeGoods(type) {
      // 获取goods里的页码
      const page = this.goods[type].page
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishedPullUp()
        // this.$refs.scroll.refresh()
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
  /* 在使用浏览器原生滚动时，为了让导航栏不跟着滚动加的 */
  /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  position: relative;
  z-index: 9;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
