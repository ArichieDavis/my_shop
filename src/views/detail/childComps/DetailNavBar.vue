<template>
  <nav-bar class="nav-bar">
    <img
      class="back"
      slot="left"
      src="~assets/img/common/back.svg"
      alt
      @click="backClick"
    />
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        class="title-item"
        @click="titleClick(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props: {
    titles: {
      type: Array,
      default: () => {
        return ["商品", "参数", "评论", "推荐"];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
}

.back {
  margin-top: 12px;
}

.title {
  display: flex;
  padding: 0 20px;
}

.title-item {
  flex: 1;
  font-size: 14px;
}

.active {
  color: var(--color-high-text);
}
</style>
