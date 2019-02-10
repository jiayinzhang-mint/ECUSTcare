<template>
  <v-container style="height:calc(100vh - 56px);overflow :auto">
    <v-toolbar class="transparent" flat>
      <h1 class="mb-3 mt-1 display-1 font-weight-medium" style="margin-left:-16px">{{year}}</h1>
      <v-spacer></v-spacer>
      <v-btn icon flat @click="refresh" style="margin-right:-16px">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="mb-3">
      <v-card-title class="font-weight-medium">报名时间段
        <v-spacer></v-spacer>2019.1.2 - 2019.11.1
      </v-card-title>
    </v-card>
    <transition-group appear appear-active-class="card-enter">
      <template v-for="(item,i) in routeList">
        <v-layout row :key="i" class="mb-3">
          <v-flex xs12>
            <v-card :to="'/route/'+item.id" ripple>
              <v-img
                class="white--text"
                height="200px"
                :src="'http://demo.chassstep.com'+item.imageUrl"
                v-if="item.imageUrl"
              ></v-img>
              <v-card-title>
                <div>
                  <span class="subheading font-weight-medium">{{item.routeName}}</span>
                  <br>
                  <span class="grey--text">于 {{item.publishTime | moment("YYYY-MM-DD")}} 发布</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </transition-group>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>请稍后
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      year: null
    };
  },
  methods: {
    ...mapActions(["getRouteList"]),
    async refresh() {
      this.loading = true;
      await this.getRouteList({ year: this.year });
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["routeList"])
  },
  mounted() {
    var today = new Date();
    this.year = today.getFullYear();
  }
};
</script>
