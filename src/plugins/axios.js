import Vue from "vue";
import axios from "axios";
import qs from "qs";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
Vue.prototype.$ajax = axios;

axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (config.method === "post" || config.method === "put") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
