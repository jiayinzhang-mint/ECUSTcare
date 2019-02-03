<template>
  <v-app>
    <v-content>
      <router-view @updatetab="updateTab()"></router-view>
    </v-content>
    <v-bottom-nav :active.sync="bottomNav" :value="true">
      <v-btn color="primary" flat value="home" to="/home">
        <span>主页</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="user" to="/user">
        <span>用户</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "home",
      transitionName: ""
    };
  },
  methods: {
    updateTab(tab) {
      this.bottomNav = tab;
    }
  }
};
</script>

<style>
</style>
