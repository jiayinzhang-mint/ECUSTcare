<template>
  <v-app id="inspire"></v-app>
</template>

<script>
import authService from "../service/AuthService";
import careService from "../service/CareService";
import Cookies from "js-cookie";

import qs from "qs";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async login() {
      this.$loading.show(true);
      try {
        var data = await authService.login(this.username, this.password);
        await authService.getUserInfo();
        await careService.getRouteList();
        await careService.getBaseInfo();
        this.$loading.show(false);
        if (this.userInfo.device == "mobile") {
          this.$router.push({ path: "/mobile/home" });
        } else {
          this.$router.push({ path: "/home" });
        }
      } catch (err) {
        err;
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.login();
  }
};
</script>

<style>
</style>
