<template>
  <v-app>
    <v-content>
      <router-view @updatetab="updateTab()"></router-view>
    </v-content>
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
