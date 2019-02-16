import Vue from "vue";
import Vuex from "vuex";
import vuexAlong from "vuex-along";
import axios from "axios";

Vue.use(Vuex);
vuexAlong.onlySession(true);
export default new Vuex.Store({
  state: {
    userInfo: {
      username: ""
    },
    baseInfo: [],
    routeList: [],
    enrollInfo: {}
  },
  getters: {
    baseInfo: state => {
      return state.baseInfo;
    },
    userInfo: state => {
      return state.userInfo;
    },
    routeList: state => {
      return state.routeList;
    },
    enrollInfo: state => {
      return state.enrollInfo;
    }
  },
  mutations: {
    updateBaseInfo: (state, baseInfo) => {
      state.baseInfo = baseInfo;
    },
    updateUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    getRouteList: (state, routeList) => {
      state.routeList = routeList;
    },
    enroll: (state, enrollInfo) => {
      state.enrollInfo = enrollInfo;
    }
  },
  actions: {
    async updateBaseInfo(context, baseInfo) {
      context.commit("updateBaseInfo", baseInfo);
    },
    async getRouteList(context, routeList) {
      context.commit("getRouteList", routeList);
    },
    async enroll(context, enrollInfo) {
      context.commit("enroll", enrollInfo);
    }
  },
  plugins: [vuexAlong]
});
