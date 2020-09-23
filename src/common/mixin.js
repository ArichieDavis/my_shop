import { debounce } from "./untils";
import BackTop from "components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
    };
  },
  mounted() {
    // 1. 图片加载完成额事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      // console.log('-----');
      refresh();
      // this.$refs.scroll.refresh()
      this.$bus.$on("itemImgLoad", this.itemListenerMixin);
      // console.log("我是混入的内容");
    });
  },
};
export const BackTopMixin = {
  components: { BackTop },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
  },
};
