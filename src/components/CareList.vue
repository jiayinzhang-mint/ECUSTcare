<template>
  <v-layout fill-height>
    <v-flex xs12 sm4 style="height:calc(100vh - 64px);overflow :auto">
      <v-toolbar class="transparent" flat style="padding:0">
        <h1 class="mt-3 headline font-weight-bold dim-title">{{year}} 疗养活动</h1>
        <v-spacer></v-spacer>
        <v-btn class="mt-3" icon flat @click="refresh">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <h2 class="mb-3 mt-1 subheading font-weight-bold" v-if="enrollInfo.groupId">已报名</h2>
        <v-card class="mb-3" color="primary lighten-1" dark ripple v-if="enrollInfo.groupId">
          <v-card-title class="font-weight-bold">
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
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-slide-y-transition>
            <v-list dense v-show="show">
              <v-list-tile v-if="userInfo.unionPassed!=null">
                <v-list-tile-title class="font-weight-bold">二级部门工会审核</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-avatar>
                  <v-icon>{{unionCheck[userInfo.unionPassed].icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <span>{{unionCheck[userInfo.unionPassed].text}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="userInfo.passed!=null">
                <v-list-tile-title class="font-weight-bold">校工会审核</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-avatar>
                  <v-icon>{{schoolCheck[userInfo.passed].icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <span>{{schoolCheck[userInfo.passed].text}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="userInfo.paymentCondition!=null">
                <v-list-tile-title class="font-weight-bold">缴费情况</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-avatar>
                  <v-icon>{{payCheck[userInfo.paymentCondition].icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <span>{{payCheck[userInfo.paymentCondition].text}}</span>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-slide-y-transition>
        </v-card>

        <v-card class="mb-3" v-else>
          <v-card-title class="font-weight-medium">当前状态: {{userInfo.travelable?"可报名":"不可报名"}}</v-card-title>
        </v-card>

        <h2 class="mb-3 mt-5 subheading font-weight-bold">疗养线路</h2>
        <v-card class="mb-3">
          <v-card-title class="font-weight-bold">报名时间段
            <v-spacer></v-spacer>
            {{baseInfo.registrationStartTime | moment("YYYY-MM-DD")}} 至 {{baseInfo.registrationEndTime | moment("YYYY-MM-DD")}}
          </v-card-title>
          <v-card-title class="font-weight-bold">
            {{countdownLabel}}
            <v-spacer></v-spacer>
            <span class="count-down">{{day}}</span>&nbsp;天&nbsp;&nbsp;
            <span class="count-down">{{hr}}</span>&nbsp;:&nbsp;
            <span class="count-down">{{min}}</span>&nbsp;:&nbsp;
            <span class="count-down">{{sec}}</span>
          </v-card-title>
        </v-card>
        <transition-group appear appear-active-class="card-enter" v-if="!userInfo.ended || !close">
          <template v-for="(item,i) in routeList">
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-card
                  ripple
                  :to="userInfo.device=='desktop'?'/route/'+item.id:'/mobile/route/'+item.id"
                >
                  <v-img
                    class="white--text"
                    :aspect-ratio="16/6"
                    :src="picUrl+item.imageUrl"
                    v-if="item.imageUrl"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="subheading font-weight-bold">{{item.routeName}}</span>
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
                    >我要报名</v-btn>
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
      <router-view @enroll="getCurrentGroup" v-if="$route.params.id"></router-view>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择线路</div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import picUrl from "../plugins/picUrl";
import { mapGetters } from "vuex";
import careService from "../service/CareService";
import authService from "../service/AuthService";
export default {
  data() {
    return {
      picUrl: picUrl,
      loading: false,
      year: null,
      currentRoute: "",
      currentGroup: "",
      day: 0,
      hr: 0,
      min: 0,
      sec: 0,
      countdownLabel: "",
      show: false,
      unionCheck: [
        {
          text: "待审核",
          icon: "more_horiz"
        },
        {
          text: "已通过",
          icon: "check"
        },
        {
          text: "未通过",
          icon: "warning"
        }
      ],
      schoolCheck: [
        {
          text: "待审核",
          icon: "more_horiz"
        },
        {
          text: "已通过",
          icon: "check"
        },
        {
          text: "未通过",
          icon: "warning"
        }
      ],
      payCheck: [
        {
          text: "待缴费",
          icon: "more_horiz"
        },
        {
          text: "已缴费",
          icon: "check"
        },
        {
          text: "无需缴费",
          icon: "check"
        }
      ],
      now: null,
      close: false
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      authService.getUserInfo();
      await careService.getRouteList(this.year);
      this.loading = false;
    },
    async getCurrentGroup() {
      console.log("this");
      this.currentRoute = this.routeList.find(e => {
        return e.id == this.enrollInfo.routeId;
      });
      this.currentGroup = this.currentRoute.travelGroupList.find(e => {
        return e.id == this.enrollInfo.groupId;
      });
    },
    countdown() {
      const end = Date.parse(new Date(this.baseInfo.registrationStartTime));
      const now = Date.parse(new Date());
      const msec = end - now > 0 ? end - now : now - end;
      this.countdownLabel = end - now > 0 ? "距离报名开始" : "已开始";
      let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.day = day;
      this.hr = hr > 9 ? hr : "0" + hr;
      this.min = min > 9 ? min : "0" + min;
      this.sec = sec > 9 ? sec : "0" + sec;
      const that = this;
      setTimeout(function() {
        that.countdown();
      }, 1000);
    }
  },
  computed: {
    ...mapGetters(["baseInfo", "routeList", "userInfo", "enrollInfo"])
  },
  mounted() {
    var today = new Date();
    this.year = today.getFullYear();
    if (this.enrollInfo.groupId) {
      this.getCurrentGroup();
    }
    this.countdown();
    const now = Date.parse(new Date());
    if (this.baseInfo.registrationEndTime < now) {
      this.close = true;
    }
  }
};
</script>


