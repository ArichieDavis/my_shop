import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type";

export default {
  addCart(context, payload) {
    // 法一
    //1 判断payload新添加的商品是否和之前重复
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // 2.判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1;
    // } else {
    //   payload.count = 1;
    //   state.cartList.push(payload);
    // }
    // 法二:查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(
      (item) => item.iid === payload.iid
    );
    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload);
    }
  },
};
