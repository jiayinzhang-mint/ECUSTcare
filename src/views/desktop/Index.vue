<template>
  <div>
    <v-toolbar color="primary" dark app fixed>
      <v-toolbar-title class="pr-4">
        <span class="hidden-sm-and-down">疗休养</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y left>
        <v-btn slot="activator" flat>
          <v-avatar size="32px" tile>{{userInfo.username}}</v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in userMenu" :key="index" :to="item.route">
            <v-list-tile-avatar>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
