<template>
  <div class="detail">
    <!-- 我是detail:{{$route.params.iid}} -->
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="goodsList"></goods-list>

    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>

  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import { debounce } from '../../common/untils.js'
  import { itemListenerMixin, BackTopMixin } from '../../common/mixin.js'

  import { getDetail, Goods, GoodsParam, getRecommend } from 'network/detail.js'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin, BackTopMixin],
    created() {
      //1.获取iid
      this.iid = this.$route.query.iid
      // console.log(typeof this.iid);

      //2.请求详情数据
      getDetail(this.iid).then(res => {

        // 1.获取数据
        const data = res.result
        // console.log(data);

        // 2.取出轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 3. 创建商品的对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.取出店铺的信息
        this.shopInfo = data.shopInfo

        // 5. 取出详情的信息
        this.detailInfo = data.detailInfo

        // 6. 取出参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // console.log(paramInfo);

        // 7.取出评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        this.$refs.scroll.refresh()
        this.$nextTick(() => {
          // 根据最新的数据，对应的DOM已经渲染完出来
          // 但是图片依然是没有加载完
          // offsetTop值不对的时候，都是因为图片的问题

        })
      })
      // 3.请求推荐的数据
      getRecommend().then(res => {
        // console.log(res);
        this.goodsList = res.data.list
      })
    },
    methods: {

      //点击滚动对应标题回执
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 300)
      },
      imageLoad() {

        this.$refs.scroll.refresh()
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
        console.log(this.themeTops);

      },

      contentScroll(position) {
        // console.log(position);
        // 是否显示backTop返回顶部


        // 1.获取y值
        const positionY = -position.y
        // 2.positionY和主题的值进行对比
        // [0, 10696, 11418, 11614, Number.MAX_VALUE]
        // positionY在0 ，10696之间 index=0
        // positionY在10696 ，11418之间 index=1
        // positionY在11418 ，11614之间 index=2
        // for (let i in this.themeTops) {
        // if (positionY > this.positionY[i] && positionY < positionY[i + 1]) {
        //   console.log(i);   i 是 str
        // }   
        // }
        let length = this.themeTops.length
        for (let i = 0; i < length; i++) {
          //   // if (positionY > this.themeTops[parseInt(i)] && positionY < this.themeTops[parseInt(i) + 1]) {
          //   //   console.log(i);
          //   // }
          // 做法一：
          // if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTops[i] && positionY < this.themeTops[i + 1]) || (this.currentIndex !== i && i === length - 1 && positionY >= this.themeTops[i])) {
          //   this.currentIndex = i
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          if (this.currentIndex !== i && (positionY >= this.themeTops[i] && (positionY < this.themeTops[i + 1]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.isShowBackTop = -position.y > 1000;
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        // console.log('-----------');
        const obj = {};
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0];
        obj.title = this.goods.title;
        obj.desc = this.goods.desc;
        obj.price = this.goods.realPrice;
        console.log(obj);
        this.$store.dispatch('addCart', obj)
      },
    },

    mounted() {


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
    z-index: 9;
  }
</style>