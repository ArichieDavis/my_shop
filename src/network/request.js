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
