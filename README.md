# my_shop

## 1.项目初始化和git托管

### 创建项目

不会的参照vue/cli官网`https://cli.vuejs.org/zh/guide/`

脚手架创建项目`vue create my_shop`

### github托管

1. 创建一个仓库 ——New repository

![image-20200907192308069](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200907192308069.png)

![image-20200907192404538](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200907192404538.png)

```
在项目中打开执行下面三个命令
链接本地仓库与远端仓库
git remote add origin https://github.com/ArichieDavis/123.git
创建并合并master分支
git branch -M master
将本地仓库推送到远程仓库（并初始化远程仓库）
git push -u origin master
```

## 2.划分目录结构

─App.vue
├─main.js  -------------------------------------------------------------------------------------入口文件
├─views	  -------------------------------------------------------------------------------------主页视图页面
|   ├─shopcart ----------------------------------------------------------------------------------购物车页面
|   |    └Shopcart.vue ----------------------------------------------------------------------------------购物车组件页面
|   ├─profile----------------------------------------------------------------------------------我的--页面
|   |    └Profile.vue--------------------------------------------------------------------------------我的组件--页面
|   ├─home----------------------------------------------------------------------------------首页页面
|   |  ├─Home.vue----------------------------------------------------------------------------------首页页面组件
|   |  ├─childComps-------------------------------------------------------------------------------首页页面子组件
|   |  |     ├─FeatureView.vue-----------------------------------------------------------------------------本周流行组件
|   |  |     ├─HomeSwiper.vue-------------------------------------------------------------------------首页轮播图组件
|   |  |     └RecommendView.vue-------------------------------------------------------------------首页推荐组件
|   ├─category-------------------------------------------------------------------------------------分类组件
|   |    └Category.vue----------------------------------------------------------------------------------分类子组件
├─store----------------------------------------------------------------------------------------vuex
|   └index.js----------------------------------------------------------------------------------
├─router----------------------------------------------------------------------------------router
|   └index.js----------------------------------------------------------------------------------
├─network----------------------------------------------------------------------------------网络请求
|    ├─home.js----------------------------------------------------------------------------------首页网络请求
|    └network.js----------------------------------------------------------------------------------
├─components----------------------------------------------------------------------------------组件
|     ├─content----------------------------------------------------------------------------------与业务相关的组件
|     |    ├─tabControl----------------------------------------------------------------------------------底部切换栏
|     |    |     └tabControl.vue-----------------------------------------------------------------------------流行-新款-精选
|     |    ├─tabbar----------------------------------------------------------------------------------底部tabbar切换
|     |    |   └MainTabBar.vue--------------------------------------------------------------------底部tabbar切换组件
|     |    ├─goods----------------------------------------------------------------------------------商品页
|     |    |   ├─GoodsList.vue----------------------------------------------------------------------------------
|     |    |   ├─GoodsListItem.vue----------------------------------------------------------------------------
|     |    |   ├─Good----------------------------------------------------------------------------------
|     |    |   |  └Item.vue----------------------------------------------------------------------------------
|     ├─common----------------------------------------------------------------------------与业务无关的可复用的组件
|     |   ├─tabbar----------------------------------------------------------------------------------
|     |   |   ├─TabBar.vue----------------------------------------------------------------------------------
|     |   |   └TabBarItem.vue----------------------------------------------------------------------------------
|     |   ├─swiper----------------------------------------------------------------------------------
|     |   |   ├─index.js----------------------------------------------------------------------------------
|     |   |   ├─Swiper.vue----------------------------------------------------------------------------------
|     |   |   └SwiperItem.vue----------------------------------------------------------------------------------
|     |   ├─navbar----------------------------------------------------------------------------------
|     |   |   └NavBar.vue----------------------------------------------------------------------------------
├─assets ----------------------------------------------------------------------------------
|   ├─img----------------------------------------------------------------------------------
|   |  ├─tabbar----------------------------------------------------------------------------------
|   |  |   ├─category.svg
|   |  |   ├─category_active.svg
|   |  |   ├─home.svg1
|   |  |   ├─home_active.svg
|   |  |   ├─profile.svg
|   |  |   ├─profile_active.svg
|   |  |   ├─shopcart.svg
|   |  |   └shopcart_active.svg
|   |  ├─profile----------------------------------------------------------------------------------
|   |  |    ├─avatar.svg
|   |  |    ├─cart.svg
|   |  |    ├─message.svg
|   |  |    ├─phone.svg
|   |  |    ├─pointer.svg
|   |  |    ├─shopping.svg
|   |  |    └vip.svg
|   |  ├─home----------------------------------------------------------------------------------
|   |  |  └recommend_bg.jpg
|   |  ├─detail----------------------------------------------------------------------------------
|   |  |   ├─cart.png
|   |  |   └detail_bottom.png
|   |  ├─common----------------------------------------------------------------------------------
|   |  |   ├─arrow-left.svg
|   |  |   ├─back.svg
|   |  |   ├─collect.svg
|   |  |   ├─placeholder.png
|   |  |   └top.png
|   |  ├─cart
|   |  |  └tick.svg
|   ├─css----------------------------------------------------------------------------------
|   |  ├─base.css
|   |  └normalize.css

## 3.引入css样式

文件目录：assets  ---> css ----> base.css

在App.vue中引入css样式--->base.css,其中base.css中引入了normalize.css

```js
@import './assets/css/base.css';
```

## 4.配置文件路径

新建vue.config.js文件，配置路径别名

```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        components: "@/components",
        network: "@/network",
        common: "@/common",
        assets: "@/assets",
      },
    },
  },
};
```

在App.vue中修改路径

```js
@import '@/assets/css/base.css';
```

.editorcongfig.js  团队开发遵循的代码规范（略）

## 5.tabbar引入和模块划分

### tabbar引入

MainTabBar组件是基于Tabbar和TabBarItem封装的，

文件目录结构：

components  --->common ---> tabbar --->Tabbar.vue   &&&   TabBarItem.vue

components  --->content --->tabbar --->MainTabBar

这里的封装思想：通过预留的插槽，在MainTabBar中根据插槽的位置填充对应的内容

App.vue中引入MainTabBar

```js
<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MainTabBar from 'components/content/tabbar/MainTabBar.vue'
</script>
```

### 模块划分

src--->views---->home --->Home .vue   首页

src--->views---->category--->Category.vue   分类

src--->views---->detail--->Detail.vue   详情页

src--->views---->profile--->Profile.vue   我的

src--->views---->cart--->Cart.vue  购物车



通过vue-router配置跳转

路由安装`npm install vue-router `

路由使用

在src目录下创建 router--->index.js,代码如下

```js
import Vue from "vue";
import VueRouter from "vue-router";
// 路由懒加载
const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Detail = () => import("views/detail/Detail.vue");
const Profile = () => import("views/profile/Profile.vue");
const Cart = () => import("views/cart/Cart.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail",
    component: Detail,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

```

App.vue代码如下

```js
<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>   // 增加路由占位符
  </div>
</template>
<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar.vue'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>
<style>
  @import './assets/css/base.css';
</style>
```

main.js文件

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 导入路由

Vue.config.productionTip = false;

new Vue({
  router,// 注册路由
  render: (h) => h(App),
}).$mount("#app");

```

## 6.小图标

public目录下有个favicon.ico 替换掉即可

public/index.html   小图表显示位置

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

# 首页开发

## 1.首页导航栏的封装和使用

![image-20200908143511149](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200908143511149.png)

文件目录`components/navbar`

创建组件  NavBar.vue

开发步骤：创建好NavBar.vue组件，然后Home.vue中引入并使用，然后在NavBar.vue中开发，最后在Home通过预留插槽显示对应的内容，这里先写好html结构和css样式，最终使用slot。

布局：采用flex布局

为了组件的可复用性，使用了插槽预留位置

```js
<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .left {
    width: 60px;
  }

  .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
```

Home.vue引入---注册---使用

```js
<nav-bar class="home-nav">
      <div slot="center">购物街</div>
</nav-bar>

import NavBar from 'components/common/navbar/NavBar'

export default {
 components: {
  NavBar,
  }
},
<style>
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
</style>
```

## 2.请求首页的多个数据

网络模块封装: src--->networt---> request.js

封装的意义：避免以后第三方的模块不维护了，可以选择替代的模块，而且不要批量替换

```js
import axios from "axios";

export function request(config) {
  // 创建axios实例对象
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/z8",
    timeout: 5000,
  });
  // 2.axios拦截器
  // 2.1请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {}
  );
  // 2.2响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance(config);
}

```

home页相关的请求进行再一次封装，以后主页所有的网络请求都在一个地方，方便管理：src--->networt---> home.js

```js
import { request } from "./request";
export function getHomeMultiData() {
  return request({
    url: "/home/multidata",
  });
}

```

在Home组件中使用

```js
// 导入网络请求模块
  import { getHomeMultiData } from 'network/home.js'
  export default {
    name: 'Home',
    components: {
      NavBar
    },
    data() {
      return {
        // 用于保存返回的banner网路数据
        banners: [],
          //用于保存 返回recommends的网路数据
        recommends: []
      }
    },
    created() {
      // 1.请求多个数据，在页面创建完成后发送网络请求
      //getHomeMultiData()返回的是promise ，直接then调用即可
      getHomeMultiData().then(res => {
        console.log(res);
        // 保存请求的数据 函数执行完毕会消失，所以这里需要保存请求的数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
  }
```

## 3.轮播图的展示

![image-20200908143458189](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200908143458189.png)

首先：轮播图是老师封装好的组件，然后直接拿过来即可

路径：components  --->common--->swiper--->index.js  &&  Swiper.vue  &&  SwiperItem

在Home.vue中使用如下：

```js
<template>
<swiper>
    
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>


 <script> 
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
```

轮播图的数据之前是保存在banners数组中，所以我们从banners 中通过v-for遍历取出数据即可

**注意**：要**动态绑定href**，也就是:href="item.link"  :src="item.image"  不然不会当成变量解析

最后：

把swiper再次封装成----HomeSwiper.vue  步骤如下

文件路径：home--->childComps--->HomeSwiper.vue

```js
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
    name: 'Home',
    components: {
      Swiper,
      SwiperItem
    },
     //父子组件的传值，
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
```

Home.vue 引用

```js
//父组件传个banners 过去，子组件props中banners接收，这里命名都相同，新手容易误导
//使用:vue中推荐用短横线命名法替换驼峰命名法，防止出错
<home-swiper  :banners="banners" ></home-swiper>
//导入
import HomeSwiper from './childComps/HomeSwiper'
//注册
 components: { 
      HomeSwiper, 
    },
data() {
      return {
        banners: [],       
      }
    },

```

![image-20200908105937245](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200908105937245.png)

## 4.推荐信息展示

![image-20200908143439453](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200908143439453.png)

封装一个组件 home---->childComps--->RecommentView    

思路：数据在Home.vue的data中的commends中，所以在子组件中使用需通过props传值

获取到数据在写样式（这里不推荐，最好先写好结构和样式在往里面填充内容）

代码如下：

```js
<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'RecommentView',
    components: {

    },
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
```

Home中引入

```js
//模板中添加
<recomment-view :recommends="recommends"></recomment-view>
//导入
import HomeSwiper from './childComps/HomeSwiper.vue'

// 注册组件
components:{
    RecommentView
  },
```

## 5.知识回顾2

### 5.1Promise

promise的基本使用

- 如何将异步操作放入到promise中
- （resolve，reject） => then/catch

Promise的链式调用

Promise的all方法

### 5.2 Vuex

1. 什么是状态管理

2. Vuex的基本使用
   -  state-->直接修改state（错误）
   - mutations  ->devtools

 3.核心概念

- state 单一状态数

- getters

- mutations
- actions--->异步操作（promise）
- modules

4.目录组织方式

### 5.3网络请求封装

- 网络请求方式的选择
- axios的基本使用
- axios的相关配置
- axios的创建实例
- axios的封装

#### 5.4项目开发

新项目：

1.划分目录结构

2.引入两个css文件

3.vue.config.js和.editorconfig

4.项目的模块划分;tabber---路由映射关系

5.首页开发

- navbar 的封装
- 网络数据的请求
- 轮播图
- 推荐信息

## 6. FeatureView的封装

![image-20200908143422443](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200908143422443.png)

源程序就是一张图片，然后这里封装成一个组件

路径如下：home--->childComps--->FeatureView.vue

```js
<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>
<script>
  export default {
    name: 'FeatureView'
  }
</script>
<style>
  .feature img {
    width: 100%;
  }
</style>
```

Home.vue中引入

```js
// 使用
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recomment-view :recommends="recommends"></recomment-view>
    <feature-view></feature-view>
  </div>
</template>
// 导入
import FeatureView from './childComps/FeatureView.vue'
// 注册
components: {
     
      FeatureView
    }, 
//样式
<style scope>
  #home {
    padding-top: 44px;
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
</style>
```

## 7.TabControl

![image-20200908143358235](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200908143358235.png)

开发思路：

文件路径：与业务有关的组件，放在：`components/content/tabcontrol/TabControl.vue`

动态绑定class，给个active类，index===currentIndex 来当前的index和currentIndex一致是显示active类的样式，

点击切换实现：绑定一个tabClick()事件，点击获取遍历的index，并将index赋值给currentIndex，然后程序判断`{active: index === currentIndex} `的布尔值来决定是否显示active类的样式

**TabControl.vue代码如下**

```js
<template>
  <div class="tab-control">
    <!-- 只是文字不一样的情况，没必要搞插槽 -->
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active: index === currentIndex}"
      @click="tabClick(index)">
      <span>{{item}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
        //这里要传入index值，然后index 的值赋值给currentIndex ，再在{active: index === currentIndex} 判断是否显示active类
      tabClick(index) {
        this.currentIndex = index
      }
    },
  }
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;

  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);

  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
```

**Home.vue代码新增**

```js
//使用
<tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>

import TabControl from 'components/content/tabcontrol/TabControl.vue'

export default {
    
    components: {
      
      TabControl
    },
<style>
    //实现简单的停留效果，
.tab-control {
    position: sticky;
    top: 44px;

  }
```

## 8.保存商品的数据结构设计

#### 分析：如何设计商品的数据结构

第一步：请求商品列表数据

点击流行 新款精选的时候数据不跟着切换：原因是vue数据的一个复用问题，绑定key 即可解决

根据不同的点击，展示不同的数据

保存数据的时候，把所有的数据都保存下来

用一个变量中存储着：流行、新款、精选

流行的数据：

goods：(流行/新款/精选/)

```js
goods:{
    'pop':{page:1,list:[150]},// page用于记录当前加载到第几页，list用于记录当前已经加载了多少条数据
    'new':{page:2,list:[60]},
    'sell':{page:1,list:[30]}
}


```

Home.vue新增如下代码

```js
 data() {
      return {
        banners: [],
        recommends: [],
         // 新增以下
        goods: {
          'pop': { page: 0, list: [] },
          'news': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        }
      }
    },
```

在created（）｛｝写一些主要逻辑

在methods写一些方法

怎么把一个数组放进另一个数组

方法一遍历

```js
for（let n of num）{
	total.push(n)
}
ES6   ...扩展运算符

total.push(...num)
```

## 9.首页数据的请求和保存

```js
created() {
      // 1.请求多个数据，在页面创建完成后发送网络请求
      getHomeMultiData().then(res => {
          console.log(res);
          // 保存请求的数据 函数执行完毕会消失，所以这里需要保存请求的数据
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })

      // 2. 请求商品数据
       getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
    },
```

原先将数据请求都放在created里，考虑到这里代码越来越多，逻辑复杂，将其再次封装在methods里

```js
 created() {
      // 1.请求多个数据，在页面创建完成后发送网络请求  
     // 注意：当created里的函数和methods 函数名字一致时，使用this调用
      this.getHomeMultiData()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

methods: {
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          console.log(res);
          // 保存请求的数据 函数执行完毕会消失，所以这里需要保存请求的数据
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        // 获取goods里的页码
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
```

这里的主要逻辑就是动态的决定你要传入的类型（type），来获取此类型对应的数据，page用于记录当前获取数据的页码，当上拉刷新请求的时候，这个page就+1，

返回的数据保存在list中，方便使用，这里使用ES6 扩展运算符（...）来讲返回的结果添加到list数组中

## 10.首页商品数据的展示

从Home.vue中取出数据，绑定在goods 上 传递到 GoodList.vue组件

 GoodList.vue通过props接收，然后将数据传递到GoodsListItem.vue组件

GoodsListItem通过props接收，然后显示

Home.vue 代码如下

```js
//template内新增
<goods-list :goods="goods.pop.list"></goods-list>
//script新增
import GoodsList from '../../components/content/goods/GoodsList.vue'
components: {
      GoodsList
   },

```

GoodList.vue组件代码如下

```js
<template>
  <div class="goods-list">
    <goods-list-item v-for='item in goods' :goods-item="item" class="item" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default {
    name: 'GoodsList',
    components: { GoodsListItem },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>
```

GoodsListItem组件展示数据代码如下

```js

<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
<style scoped>

.goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
```

## 11.TabControl点击切换商品

思路：点击TabControl，拿到对应的index ，将事件通过`this.$emit('tabClick', index)`发送出去，然后在Home.vue中接受此事件。`<tab-control @tabClick="tabClick">  `,然后根据事件传入的index值来判断属于['pop','new','sell']中的哪个，然后`<goods-list :goods=" goods[currentType].list" />`就动态的选择要传的goods是哪个分类

TabControl.vue中代码实现

```js
 在方法中，将tabClick点击事件传出
 methods: {
      tabClick(index) {
        this.currentIndex = index
          //新增
        this.$emit('tabClick', index)
      }
    },
```

在Home.vue中

```js
//绑定传入的tabClick事件，
<tab-control @tabClick="tabClick" class="tab-control" :titles="['流行','新款','精选']"></tab-control>

//原先的goods后面略长
<goods-list :goods="goods[currentType].list" />
//搞个计算属性，见下
<goods-list :goods="showGoods" />
    
// 代码优化，
computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
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
         //新增，用于记录当前点击的类
        currentType: 'pop'
      }
    },
  methods: {
      // index 的值为0，1，2根据点击传入的index 来判断你点击的哪个，并将点击的这个类，从goods数据取出，传入到goodsList中。在goodsListItem中展示
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
```

## 12.Better-Scroll的安装和使用

### 安装指定版本

`npm install better-scroll@1.13.2 --save`  

安装完毕在package.json文件中看到如下：

![image-20200911115938524](C:\Users\David.du\AppData\Roaming\Typora\typora-user-images\image-20200911115938524.png)

注意：直接`npm install better-scoll`是安装的最新版本，也就是2.0版本

[这是一篇关于npm技巧的文章  ] http://www.fly63.com/article/detial/4015

**建议将better-scroll封装成一个组件，这样在其他地方也能使用，减少耦合度**

**注意：**

- ref如果是绑定在组件中的，那么通过**this.$refs.refname**获取到的是一个组件对象
- ref如果是绑定在普通的元素中的，那么通过**this.$refs.refname**获取到的是一个元素对象

vh ---> 视口单位

### Better-Scroll的封装

在components/common文件下新建文件夹scroll，再新建Scroll组件

组件代码如下

```js
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
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {})
    },
  }
</script>

<style scoped>

</style>
```

在Home.vue    Home.vue新增代码如下

```js

<scroll class="content">

      <home-swiper :banners="banners"></home-swiper>
      <recomment-view :recommends="recommends"></recomment-view>
      <feature-view></feature-view>
      <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行','新款','精选']"></tab-control>
      <goods-list :goods="showGoods" />

</scroll>
import Scroll from 'components/common/scroll/Scroll.vue'
export default {
    name: 'Home',
    components: {
      Scroll
    },
    
<style scoped>
  #home {
    height: 100vh;
    /* padding-top: 44px; */
    position: relative;
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
```

## 13.Back-Top组件的封装和使用

当滚动 一定位置的时候，添加回到顶部按钮，多个地方应用，所以封装成一个组件

components/content/backTop/BackTop

修饰符.native 什么时候使用？

- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听

### 13.1 Back-Top组件的封装

封装路径：components/content/backTop/BackTop.vue

代码如下

```js
<template>
  <div class="back-top">
    <img src="~assets//img/common/top.png" alt="">
  </div>
</template>
<script>
  export default {
    name: "BackTop",

  }
</script>
<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
```

在Home.vue中使用

```js
//使用 ,注意不要放入scroll中，因为这个不是滚动的元素
<back-top @click.native="backClick" />
//导入
import BackTop from 'components/content/backTop/BackTop'
//注册
components: {
      BackTop
},
```

### 13.2 回到顶部

在Back-Top组件内监听事件，然后在Home.vue中实现滚动很麻烦，所以在Home.vue中监听组件的点击事件，使用.native修饰符就可以监听组件的点击了

```js
// 给这个组件绑定一个backClick点击事件
<back-top @click.native="backClick" />
    //methods实现这个方法
methods: {
    backClick() {  
		// scrollTo()方法是BS里的方法
        
        // this.refs.scroll.scroll.srcollTo(0,0,300)  
        
        //由于上面代码太冗长，不易阅读，所以我们在scroll.vue组件中进一步封装了scrollTo()方法，封装代码见下，封装完了就可以调用我们自己写的 this.$refs.scroll.scrollTo()方法了
        this.$refs.scroll.scrollTo(0, 0)
      },
}
```

Scroll.vue  组件 

```js
// 封装了 scrollTo方法
 <script>
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      }
    },
  }
</script>


```

## 14.Back-Top的显示和隐藏

实时监听滚动的位置

思路：

- 在scroll组件中，监听滚动的位置，（ probeType属性要设置为3，但是为了和其他组件不起冲突，我们就动态的传入这个值，所以Home.vue中就有我们动态绑定的probeType，）position.y就是滚动的值，(通过 this.$emit('scroll', position)发出这个事件，)这个事件在Home.vue中接收

- contentScroll(){}这个函数是接受组件scroll发出的事件，并在里面做相应的事情，参数positon就是滚动的位置

- 从Home.vue中拿到滚动的值，做判断，控制back-top的显示和隐藏（v-show）

在Scroll.vue中增加代码：

```js
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
props: {
	//bs使用的时候监听滚动要给probeType一个值，值有：0,1,2,3,
      probeType: {
        type: Number,
        default: 0
      }
    }, 

mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType  //这里要动态传一个值，这里的值从Home.vue中传过来的，不给这个值，下面是无法监听这个滚动的位置

      })
      //2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
          // 这里监听是位置，只能在Scroll组件中使用 ，我们想在Home.vue中使用，所以将事件发出去。所以绑定个ref，见上面的 div
        this.$emit('scroll', position)
      })
    },
```

Home.vue下新增代码

```js
//这里首页动态的传入 :probe-type="3" 然后接收scroll组件的scroll事件，
<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
//v-show接受一个布尔值来控制显示和隐藏，这个布尔值的结果就是 (-position.y) > 800返回的布尔值
<back-top @click.native="backClick" v-show="isShowBackTop" />

    //这里搞个变量用于存储，
 data() {
      return {
        isShowBackTop: false
      }
    },
// 这里contentScroll是接收scroll组件的事件，我们将其命名为：contentScroll
    
contentScroll(position) {
        // console.log(position); 
        // position.y < 1000
        this.isShowBackTop = (-position.y) > 800 // 这里返回布尔值，这个布尔值就控制了back-top的显示和隐藏
      },
```



## 15.上拉加载更多

Better-Scroll有个pullingUp事件，用于上拉加载更多，所以，我们监听此事件即可

**pullUpLoad**

- 类型：Boolean | Object
- 默认值：false
- 作用：这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载

**pullingUp**

- 参数：无
- 触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。

**finishPullUp**

- 参数：无
- 返回值：无
- 作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。

**这里有个bug**，监听"pullingUp"事件，当我们觉得下拉完成时，并没有回调里面的函数，原因是scroll并不知道你这次的数据加载完成了。所以，我们数据完成成先调用一下**finishPullUp**这个函数，scroll才知道，数据已经加载

整体思路：

- 先在Home.vue中发送网络请求的代码中新增

  ```js
  finishPullUp() {
          this.scroll.finishPullUp()
      // 没封装的代码
       this.scroll.scroll.finishPullUp()
        }
  // 这个方法是scroll 的， 所以我们要通过this.$refs.scroll.finishPullUp() 拿到scroll里的方法  ，前提是 scroll 里已经封装了这个方法
  // scroll组件中 封装如下：
  finishPullUp() {
          this.scroll.finishPullUp()
   }
  
  
  ```

- 上面代码就是告诉scroll，数据请求过来了，并且已经加载完成，然后我们就可以做上拉加载了

  ```js
  // 有了这个，我们就可以设置pullUpLoad的布尔值，来启用pullingUp 方法
  //这个方法就是做上拉加载更多功能的，代码如下
  this.scroll.on('pullingUp', () => {
          // 监听这个方法，并将这个方法发出去，因为我们在Home组件中做上拉加载更多，不是scroll
          this.$emit("pullingUp")
  })
  ```

- 将上拉加载事件发送出去，并在Home.vue组件中接收

  ```js
  <scroll  
  		:pull-up-load="true" // 动态的传入一个true 开启上拉加载.false关闭上拉加载功能
       	 @pullingUp="loadMore" //将scroll组件发出的pullingUp事件绑定在loadMore>
  
  //loadMore()实现数据的请求
  loadMore() {
          this.getHomeGoods(this.currentType)
  }
  
  ```

  

Scroll.vue代码如下

```js

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
         // 新增
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        // 新增
        pullUpload: this.pullUpLoad,

      })
      //2. 监听滚动的位置
      
      //3.监听上拉加载事件

      this.scroll.on('pullingUp', () => {
        // console.log("222");
        this.$emit("pullingUp")
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
       // 新增 
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
  }
</script>

```

Home.vue代码如下：

```js
<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"// 动态的传入一个true 开启上拉加载
      @pullingUp="loadMore" //将scroll组件发出的pullingUp事件绑定在loadMore>
//新增
methods{
   loadMore() {
        this.getHomeGoods(this.currentType)//根据当前的分类，请求相关的数据
   }
     /* 
        网络请求相关的方法
      */
     getHomeGoods(type) {
        // 获取goods里的页码
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
           // 新增代码
		//调用finishPullUp方法，告诉scroll数据已经加载完了，每次加载完都调用这个方法，然后在scroll.vue中通过 pullingUp 这个事件监听上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }, 
}

```

## 16.知识回顾3

### 一.FeatureView

- 独立组件封装FeatureView
  - div>a>img

### 二. TabControl

- 独立组件的封装
  - props --> titiles 
  - div -->根据titles v-for遍历 -->span{{title}}
  - css相关
  - 选中哪一个tab,哪一个tab的文字颜色变色，下面border-bottom
    - currentIndex



### 三.首页商品数据请求

#### 3.1设计数据结构，用于保存数据

goods{

pop:page/list

new:page/list

sell:page/list

}

#### 3.2 发送数据请求

- 在home.js中封装getHomeGoodes(type,page)

- 在Home.vue，由在methods中getHomeGoodes（type）

- 调用getHomeGoodes('pop')/getHomeGoodes('new')/getHomeGoodes('sell')

  - page:动态的获取对应的page

- 获取到数据：res

  - this.goods[type].list.push(...res.data.lsit)
  - this.goods[type] += 1 

  

  goods{

  pop:page1/list[30]

  new:page1/list[30]

  sell:page1/list[30]

  }

### 四.对商品数据进行展示

#### 4.1 封装GoodsList.vue组件

- props:goods   -->list[30]

#### 4.2 封装GoodsListItem.vue组件

- props：goodsItem   
- goodsItem  取出数据，并且使用正确的div/span/img基本标签进行展示

### 五. 对滚动进行重构：Better-Scroll

#### 5.1  在index.html中使用Better-Scroll

- const bscroll = new BScroll(el,{})

- 注意：wrapper -> content -> 很多内容
- 1.监听滚动
  - probeType ：0/1/2(手指滚动)/3(只要是滚动)
  - bscroll.on('scroll',position =>{})
- 2.上拉加载
  - pullUpLoad：true
  - bscroll.on('pullingUp',()=>{})
- 3.click：false
  - button 可以监听点击
  - div不可以

#### 5.2 在Vue项目中使用Better-Scroll

- 在Profile.vue中简单的演示
- 对Better-Scroll进行封装：Scroll.vue
- Home.vue和Scroll.vue之间进行通信
  - Home.vue将probeType设置为3
  - Scroll.vue需要通过$emit，实时将事件发送到Hoem.vue



### 六.回到顶部BackTop

#### 6.1 对BackTop.vue组件的封装

#### 6.2如何监听组件的点击

- 直接监听back-top的点击，但是可以直接监听？
  - 不可以，必须添加修饰符.native
- 回到顶部
  - scroll对象，scroll.scrollTo(*x*, *y*, *time*)
  - this.scroll.scrollTo(0, 0, 500)

#### 6.3.BackTop组件的显示和隐藏

- isShowBackTop：false
- 监听滚动，拿到滚动的位置
  - -position.y >1000 ->isShowBackTop：true
  - isShowBackTop = -position.y >1000 

## 17.解决首页中Better-Scroll可滚动区域的问题

- Better-Scroll在 决定有多少区域可以滚动时，是根据scrollerHeight属性决定
  - scrollerHeight属性是根据放在Better-Scroll的content中的子组件的高度
  - 但是我们的首页中，刚开始计算scrollerHeight属性时，是没有将图片计算在内的
  - 所以，计算出来的告诉是错误的（1300+）
  - 后来图片加载进来之后新的高度，但是scrollerHeight属性并没有进行更新
  - 所以滚动出现了问题
- 如何解决这个问题？
  - 监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次refresh()
  - 如何监听图片加载完成了？
    - 原生的js监听图片img.onload= function(){}
    - Vue中监听：@load=“方法”
  - 调用scroll的refresh()
- 如何将GoodsListItem.vue中的事件传入到Home.vue中
  - 因为涉及到非父子组件的通信，所以我们选择了**事件总线**
    - bus   -> 总线
    - Vue.prototype.$bus = **new** Vue()
    - this.$bus.$emit("事件名称")
    - this.$bus.$on('事件名称'，回调函数(参数))

GoodsListItem.vue 代码如下

```js
//监听每个图片都加载完毕  
<img :src="goodsItem.show.img" alt="" @load="imageLoad">

      methods: {
      imageLoad() {
        // 将图片加载完毕的事件发送出去
        this.$bus.$emit('itemImageLoad')
      }
    },
```

main.js 代码

```js
// 给vue的原型绑定一个事件总线$bus
Vue.prototype.$bus = new Vue()

```

Home.vue

```js
mounted() {
      // 3.监听item中图片加载完成 通过事件总线监听到GoodsListItem.vue发出的事件
      this.$bus.$on('itemImageLoad', () => {
        // 调用scroll.refresh()函数，重新计算 better-scroll（图片的高度）
        this.$refs.scroll.refresh()
      })
    },
   // 最好放mounted进行调用，因为在created生命周期函数中，scroll 未初始化完成
        
```

Scroll.vue

```js
//封装这个方法，这样在Home.vue中就不用this.scroll.scroll.refresh()

refresh() {
    //这里防止refresh找不到，所以前面加了判断
        this.scroll && this.scroll.scrollTo && this.scroll.refresh()
      }
```

**refresh()**

- 参数：无
- 返回值：无
- 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。

## 20.refresh函数找不到bug处理

见上面。将refresh函数调用放在mounted调用

## 21.刷新频繁防抖处理

- 对于refresh非常频繁的问题，进行防抖操作
  - 防抖debounce、节流throttle
  - 防抖函数起作用的过程
    - 如果我们直接执行refresh,那么refresh函数会执行30次
    - 可以将refresh函数传入到debounce中，生成一个新的函数
    - 之后在调用非常频繁的时候，就使用新生成的函数
    - 而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉

```js
debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            if (this) func.apply(this, args)
          }, delay)
        }
      },
```

## 22.上拉加载更多功能

见15，上拉加载更多

这里如果出现上拉刷新，卡顿或者卡住的情况，在loadMore函数里调用*this*.$refs.scroll.refresh(),刷新，重新计算可滚动的高度，即可解决，

## 23.TabControl吸顶效果

### 23.1 获取到tabControl 的offsetTop

如何拿到offsetTop？

```js

mounted() 
2. 获取tabControl的offsetTop

  又有的组件都有一个属性$el:用于获取组件中的元素，这里图片可能没加载完，所以获取的值是不对的

   console.log(*this*.$refs.tabControl.$el.offsetTop);
}
```

- 必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControl 的offsetTop
- 但是，如果直接在mounted中获取tabControl 的offsetTop，那么值是不正确的
- 如何获取正确的值？
  - 监听HomeSwiper 中的img的加载完成
  - 加载完成后，发出事件，在 Home.vue中，获取正确的值
  - 补充：
    - 为了不让HomeSwiper 多次发出事件，
    - 可以使用isLoad的变量进行状态记录，
  - 注意：这里不进行多次调用和debounce的区别

### 23.2 监听滚动，动态的改变tabControl的样式

- 问题：动态的改变tabControl的样式时，会出现两个问题，
  - 问题一：下面的商品的内容，会突然上移
  - 问题二：tabControl虽然设置了fixed，但是也随着better-scroll一起滚出去了
- 其他方案来解决停留问题
  - 在最上面，多复制了一份PlaceHolder（占位的意思） TabControl组件对象，利用他来实现停留效果
  - 当用户滚动到一定位置时，PlaceHolder TabControl显示出来
  - 当用户滚动没有达到一定位置时，PlaceHolder TabControl隐藏起来
  
  

## 24.让Home保持原来的状态

### 24.1 让Home不要随意销毁掉

- keep-alive


## 24.2 让Home.vue保存原来的位置

这个没遇到视频中的问题

- 离开时，保存一个位置信息 

- 进来时，将位置设置原来保存的位置saveY信息即可

  - 注意：最好 回来时，进行一次refresh

  

# 详情页实现思路

## 1.点击商品进入详情页

当点击某个商品进入商品的详情页，根据商品的id请求商品的详情数据，并且，将对应数据做一个展示

监听goodsListItem组件的点击，

并不是获取goodsItem的详细信息，只需拿到商品的iid即可，根据iid去请求更加详细的商品信息

http://152.136.185.210:8000/api/z8/detail?iid=1jw0sr2

配置路由映射关系，并且跳转对应的路由，将iid传过去即可

## 2.详情页导航栏的实现

封装一个DetailNavBar.vue组件

代码如下：

```js
<template>
  <nav-bar>
    <img class="back" slot="left" src="~assets/img/common/back.svg" alt="">
    <div slot="center" class="title">
      <div v-for="(item,index) in titles" class="title-item" @click='titleClick(index)'
        :class="{active:currentIndex === index}">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: {
          type: Number,
          default: 0
        }
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
      }
    },
  }
</script>

<style scoped>
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
    color: var(--color-high-text)
  }
</style>
```

## 3.请求详情的数据

封装detail.js

```js
import { request } from './request'


export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}
```

Detail.vue的代码

```js

<template>
  <div class="detail">
    <!-- 我是detail:{{$route.params.iid}} -->
    <detail-nav-bar></detail-nav-bar>
    详情页:{{$route.query.iid}}
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import { getDetail } from 'network/detail.js'
  export default {
    name: 'detail',
    components: {
      DetailNavBar,
    },
    data() {
      return {
        iid: null
      }
    },
    created() {
      //1.获取iid
      this.iid = this.$route.query.iid
      // console.log(typeof this.iid);

      //2.请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
      })
    },
    methods: {

    },
  }
</script>

<style scoped>

</style>
```

## 4.顶部轮播图的展示

这里有个bug，因为主页有个keep-alive这个东西，所以我们每次点击拿到的iid 都是同一个iid，要解决这个问题，在App.vue，加上exclude="Detail"，将这个组件排除，keep-alive就不会记住detail组件的状态了

```
 <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
```

DetailSwiper.vue

```js
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
```

Detail.vue

```js
<detail-swiper :top-images="topImages" />


 data() {
      return {
        iid: null,
        topImages: []
      }
    },
 created() {
    getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取数据
        const data = res.result
        console.log(data);

        // 2.取出轮播图的数据
        this.topImages = data.itemInfo.topImages
      })
      }
```

