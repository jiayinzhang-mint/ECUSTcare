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
    routeList: []
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    routeList: state => {
      return state.routeList;
    }
  },
  mutations: {
    updateUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    getRouteList: (state, routeList) => {
      state.routeList = routeList;
    }
  },
  actions: {
    getRouteList(context, params) {
      return new Promise((resolve, reject) => {
        axios.get("/api/travel/" + params.year).then(data => {
          data = data.data;
          const routeList = data.routeList;
          context.commit("getRouteList", routeList);
          resolve();
        });
      });
    }
  },
  plugins: [vuexAlong]
});
