<template>
  <v-layout fill-height>
    <v-flex xs12 sm4 style="height:calc(100vh - 64px);overflow :auto">
      <v-container>
        <v-toolbar class="transparent" flat style="padding:0">
          <h1 class="mb-3 mt-1 headline font-weight-medium dim-title">{{year}} 疗养活动</h1>
          <v-spacer></v-spacer>
          <v-btn icon flat class="mb-3" @click="refresh" style="margin-right:-16px">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <h2 class="mb-3 mt-1 subheading font-weight-medium" v-if="enrollInfo.groupId">已报名</h2>
        <v-card
          class="mb-3"
          color="primary lighten-1"
          dark
          ripple
          v-if="enrollInfo.groupId"
          :to="userInfo.device=='desktop'?'/route/'+currentRoute.id:'/mobile/route/'+currentRoute.id"
        >
          <v-card-title class="font-weight-medium">
            {{currentRoute.routeName}} - {{currentGroup.groupName}}
            <v-spacer></v-spacer>
            <v-btn
              flat
              round
              dark
              small
              icon
              :to="userInfo.device=='desktop'?'/route/'+currentRoute.id:'/mobile/route/'+currentRoute.id"
            >
              <v-icon>info</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>

        <v-card class="mb-3" v-else>
          <v-card-title class="font-weight-medium">当前状态：可报名</v-card-title>
        </v-card>

        <h2 class="mb-3 mt-5 subheading font-weight-medium">疗养项目</h2>
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">报名时间段
            <v-spacer></v-spacer>2019.1.2 00:00 - 2019.11.1 00:00
          </v-card-title>
          <v-card-title class="font-weight-medium">剩余时间
            <v-spacer></v-spacer>240天 00:00:00
          </v-card-title>
        </v-card>
        <transition-group appear appear-active-class="card-enter">
          <template v-for="(item,i) in routeList">
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card
                  ripple
                  :to="userInfo.device=='desktop'?'/route/'+item.id:'/mobile/route/'+item.id"
                >
                  <v-img
                    class="white--text"
                    height="200px"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549824939310&di=ce3363d93c5aeffe60e415593afacf1e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D4256572454%2C870597285%26fm%3D214%26gp%3D0.jpg"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-medium">{{item.routeName}}</span>
                      <br>
                      <span
                        class="body-2 grey--text"
                      >¥ {{item.routePrice}} &nbsp;{{item.travelGroupList.length}}个疗养团</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      block
                      round
                      color="primary"
                      :to="userInfo.device=='desktop'?'/route/'+item.id:'/mobile/route/'+item.id"
                    >查看详情</v-btn>
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
    </v-flex>
    <v-flex class="hidden-sm-and-down" sm8 style="background-color:#f5f5f5">
      <router-view v-if="$route.params.id"></router-view>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择项目</div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import careService from "../service/CareService";
export default {
  data() {
    return {
      loading: false,
      year: null,
      currentRoute: "",
      currentGroup: ""
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      await careService.getRouteList(this.year);
      this.loading = false;
    },
    async getCurrentGroup() {
      this.currentRoute = this.routeList.find(e => {
        return e.id == this.enrollInfo.routeId;
      });
      console.log(this.currentRoute);
      this.currentGroup = this.currentRoute.travelGroupList.find(e => {
        return e.id == this.enrollInfo.groupId;
      });
    }
  },
  computed: {
    ...mapGetters(["routeList", "userInfo", "enrollInfo"])
  },
  mounted() {
    var today = new Date();
    this.year = today.getFullYear();
    if (this.enrollInfo.groupId) {
      this.getCurrentGroup();
    }
  }
};
</script>

<style>
</style>
