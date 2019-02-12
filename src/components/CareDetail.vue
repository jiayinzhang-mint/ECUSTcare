<template>
  <div>
    <transition appear appear-active-class="card-enter">
      <div flat class="transparent">
        <v-toolbar flat color="transparent">
          <v-btn icon class="mr-3" v-if="userInfo.device=='mobile'" :to="'/mobile/home'">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <h2 class="font-weight-medium dim-title">{{baseInfo.routeName}}</h2>
          <v-spacer></v-spacer>
          <h2 class="font-weight-medium">¥ {{baseInfo.routePrice}}</h2>
        </v-toolbar>
        <v-tabs v-model="tab" centered color="transparent" slider-color="yellow">
          <v-tabs-slider></v-tabs-slider>
          <v-tab key="1">线路简介</v-tab>
          <v-tab key="2">疗休养团</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-tabs-items v-model="tab" class="mt-3 detail-tab">
          <v-tab-item key="1">
            <v-container>
              <div class="mt-5" v-html="routeInfo.activityContent"></div>
            </v-container>
          </v-tab-item>
          <v-tab-item key="2">
            <v-container>
              <transition-group appear appear-active-class="card-enter">
                <template v-for="(item,i) in groupList">
                  <v-layout row :key="i" class="mb-3">
                    <v-flex xs12>
                      <v-card>
                        <v-card-title>
                          <div>
                            <span class="subheading font-weight-medium">{{item.groupName}}</span>
                            <br>
                            <span
                              class="grey--text"
                            >{{item.startTime | moment("YYYY-MM-DD")}} 至 {{item.endTime | moment("YYYY-MM-DD")}}</span>
                          </div>
                          <v-spacer></v-spacer>
                          <div>
                            最大人数 {{item.maxNumber}}
                            <br>
                            最小人数 {{item.minNumber}}
                            <br>
                            剩余名额 {{item.maxNumber-item.applicantNumber}}
                          </div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            v-if="item.maxNumber-item.applicantNumber>0 && enrollInfo.groupId != item.id"
                            round
                            flat
                            color="primary"
                            :to="userInfo.device=='desktop'?'/enroll/'+$route.params.id+'/'+item.id:'/mobile/enroll/'+$route.params.id+'/'+item.id"
                          >报名</v-btn>
                          <v-btn
                            @click="cancel"
                            round
                            flat
                            v-if="enrollInfo.groupId == item.id"
                          >取消报名</v-btn>
                          <v-btn
                            round
                            flat
                            disabled
                            v-if="item.maxNumber-item.applicantNumber<=0 && enrollInfo.groupId != item.id"
                          >已满</v-btn>
                          <v-btn
                            round
                            flat
                            @click="enrollListDialog=true;groupId=item.id"
                          >查看已报名人员 {{item.applicantNumber}}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </template>
              </transition-group>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </transition>

    <v-dialog v-model="enrollListDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title class="subheading font-weight-bold">已报名人员
          <v-spacer></v-spacer>
          <v-btn icon @click="enrollListDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-list two-line>
          <div v-for="(item,i) in enrollList" :key="i">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>张三</v-list-tile-title>
                <v-list-tile-sub-title>男</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-list-tile-sub-title>工作单位：财务处</v-list-tile-sub-title>
                <v-list-tile-sub-title>部门工会：财务部门工会</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import qs from "qs";
import careService from "../service/CareService";
export default {
  data() {
    return {
      routeInfo: {
        activityContent: ""
      },
      baseInfo: [],
      groupList: [],
      enrollList: [{}, {}],
      titleImg: "",
      tab: null,
      enrollListDialog: false
    };
  },
  methods: {
    async getRouteInfo() {
      var rsp = await careService.getRouteInfo(this.$route.params.id);
      this.routeInfo = rsp.route;
      // console.log(rsp);
    },
    close() {
      this.$router.push({ path: "/mobile/home" });
    },
    getBaseInfo() {
      this.baseInfo = this.routeList.find(element => {
        return element.id == this.$route.params.id;
      });
      this.groupList = this.baseInfo.travelGroupList;
      // console.log(this.groupList);
      this.titleImg = "http://demo.chassstep.com" + this.baseInfo.imageUrl;
    },
    stopBodyScroll(isFixed) {
      // let bodyEl = document.body;
      // let top = 0;
      // if (isFixed) {
      //   top = window.scrollY;
      //   bodyEl.style.position = "fixed";
      //   bodyEl.style.top = -top + "px";
      // } else {
      //   bodyEl.style.position = "";
      //   bodyEl.style.top = "";
      //   window.scrollTo(0, top); // 回到原先的top
      // }
    },
    async cancel() {
      try {
        await this.$confirm("确认要取消报名吗?");
        await careService.cancel();
        this.getRouteInfo();
        this.getBaseInfo();
      } catch (err) {
        err;
      }
    }
  },
  computed: {
    ...mapGetters(["routeList", "userInfo", "enrollInfo"])
  },
  mounted() {
    this.getRouteInfo();
    this.getBaseInfo();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getRouteInfo();
    this.getBaseInfo();
  }
};
</script>

<style>
</style>
