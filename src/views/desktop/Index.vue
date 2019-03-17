<template>
  <div>
    <v-toolbar color="primary lighten-1" dark app fixed>
      <v-btn icon @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="pr-4" style="margin-left:0">
        <span class="hidden-sm-and-down">疗休养</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>{{userInfo.username}} {{userInfo.trueName}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      userMenu: [
        {
          icon: "exit_to_app",
          title: "注销",
          route: "/"
        }
      ]
    };
  },
  methods: {
    goBack() {
      window.location.href = "http://ghhd.ecnu.edu.cn";
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  async mounted() {
    const data = await this.$ajax.get("/api/travel/pc/routeList");
    console.log(data);
  }
};
</script>

<style>
</style>
