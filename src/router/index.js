import Vue from "vue";
import VueRouter from "vue-router";

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
