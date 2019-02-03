<template>
  <v-content style="height:calc(100vh - 56px);overflow :auto">
    <v-img :src="titleImg" aspect-ratio="1.7" v-if="baseInfo.imageUrl">
      <v-toolbar flat class="transparent">
        <v-spacer></v-spacer>
        <v-btn round color="white" class="mt-5" icon @click="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-img>
    <v-toolbar v-else flat class="transparent">
      <v-spacer></v-spacer>
      <v-btn round color="white" class="mt-5" icon @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <transition appear appear-active-class="card-enter">
      <v-card flat class="transparent">
        <v-container>
          <h2 class="headline font-weight-medium">{{baseInfo.routeName}}</h2>
          <h2
            class="subheading font-weight-medium grey--text"
          >{{baseInfo.publishTime | moment("YYYY-MM-DD")}}</h2>
          <v-tabs v-model="tab" centered color="transparent">
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="1">简介</v-tab>
            <v-tab key="2">场次</v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-tabs-items v-model="tab" class="mt-3">
            <v-tab-item key="1">
              <div class="mt-5" v-html="routeInfo.activityContent"></div>
            </v-tab-item>
            <v-tab-item key="2">
              <transition-group appear appear-active-class="card-enter">
                <template v-for="(item,i) in groupList">
                  <v-layout row :key="i" class="mb-3">
                    <v-flex xs12>
                      <v-card class="elevation-1">
                        <v-card-title>
                          <div>
                            <span class="subheading font-weight-medium">{{item.groupName}}</span>
                            <br>
                            <span
                              class="grey--text"
                            >{{item.startTime | moment("YYYY-MM-DD")}} 至 {{item.endTime | moment("YYYY-MM-DD")}}</span>
                          </div>
                          <v-spacer></v-spacer>
                          <div>剩余 {{item.maxNumber-item.applicantNumber}}</div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn round flat color="orange">报名</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </template>
              </transition-group>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-card>
    </transition>
  </v-content>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      routeInfo: [],
      baseInfo: [],
      groupList: [],
      titleImg: "",
      tab: null
    };
  },
  methods: {
    getRouteInfo() {
      this.$ajax
        .get("/api/travel-route/" + this.$route.params.id)
        .then(data => {
          data = data.data;
          this.routeInfo = data.route;
        });
    },
    close() {
      this.$router.push({ path: "/home" });
    },
    getBaseInfo() {
      this.baseInfo = this.routeList.find(element => {
        return element.id == this.$route.params.id;
      });
      this.groupList = this.baseInfo.travelGroupList;
      // console.log(this.groupList);
      this.titleImg = "http://ghhd.ecnu.edu.cn" + this.baseInfo.imageUrl;
    }
  },
  computed: {
    ...mapGetters(["routeList"])
  },
  mounted() {
    this.getRouteInfo();
    this.getBaseInfo();
  }
};
</script>

<style>
</style>
