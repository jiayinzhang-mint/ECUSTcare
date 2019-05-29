<template>
  <v-layout fill-height>
    <v-flex xs12 sm4 class="route_list">
      <v-toolbar class="transparent" flat style="padding:0">
        <v-btn class="mt-3 hidden-sm-and-up" icon @click="backToLauncher">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <h1 class="headline font-weight-bold dim-title" style="margin-top:11px">{{year}} 疗养活动</h1>
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

            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-slide-y-transition>
            <v-list dense v-show="show">
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">日程</v-list-tile-title>
                <v-list-tile-title>{{currentGroup.startTime | moment("YYYY-MM-DD")}} 至 {{currentGroup.endTime | moment("YYYY-MM-DD")}}</v-list-tile-title>
              </v-list-tile>
              <v-divider></v-divider>

              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">二级部门工会审核</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-avatar>
                  <v-icon>{{unionCheck[userInfo.unionPassed].icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content class="text-xs-right">
                  <span>{{unionCheck[userInfo.unionPassed].text}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">校工会审核</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-avatar>
                  <v-icon>{{schoolCheck[userInfo.passed].icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content class="text-xs-right">
                  <span>{{schoolCheck[userInfo.passed].text}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">缴费情况</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-avatar>
                  <v-icon>{{payCheck[userInfo.paymentCondition].icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content class="text-xs-right">
                  <span>{{payCheck[userInfo.paymentCondition].text}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="showDetail(currentRoute.id)">
                <v-list-tile-title class="font-weight-bold">查看线路详情</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-slide-y-transition>
        </v-card>

        <v-card dark class="mb-3" color="primary lighten-1" v-else>
          <v-card-title class="font-weight-medium">
            {{userInfo.trueName}}老师, {{userInfo.travelable?"欢迎您报名参加今年的疗休养":"您不符合今年报名条件"}}
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-slide-y-transition>
            <v-list dense v-show="show">
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">当前状态</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content>
                  <span>{{currentPositionState.text}}</span>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon v-if="currentPositionState.value==11">done</v-icon>
                  <v-icon v-else>clear</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">工龄</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content>
                  <span>{{userInfo.workingYears}}</span>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon v-if="userInfo.workingYears>=5">done</v-icon>
                  <v-icon v-else>clear</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">最近一次疗养</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content>
                  <span>{{userInfo.lastTravelYear?userInfo.lastTravelYear:'无'}}</span>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon v-if="this.year-userInfo.lastTravelYear<4">clear</v-icon>
                  <v-icon v-else>done</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">身份证</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content class="text-xs-right" style="width:220px">
                  <span class="text-xs-right">{{userInfo.sfzjh}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">性别</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content class="text-xs-right" style="width:220px">
                  <span>{{userInfo.sex==1?'男':'女'}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">所在单位</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content class="text-xs-right" style="width:220px">
                  <span>{{userInfo.departmentName}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title class="font-weight-bold">手机号码</v-list-tile-title>
                <v-spacer></v-spacer>
                <v-list-tile-content class="text-xs-right" style="width:220px">
                  <span>{{userInfo.phone}}</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-sub-title>
                  <small>请核对个人基本信息，如有异议，请联系校工会老师。</small>
                </v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-slide-y-transition>
        </v-card>

        <h2 class="mb-3 mt-5 subheading font-weight-bold">疗养线路</h2>

        <v-card class="mb-3">
          <v-card-title class="font-weight-bold">
            报名时间段
            <v-spacer></v-spacer>
            <div>{{baseInfo.registrationStartTime | moment("YYYY-MM-DD")}} 至 {{baseInfo.registrationEndTime | moment("YYYY-MM-DD")}}</div>
          </v-card-title>
          <v-card-title class="font-weight-bold">
            {{countdownLabel}}
            <v-spacer></v-spacer>
            <div v-if="countdownLabel!='已结束'">
              <span class="count-down">{{day}}</span>&nbsp;天&nbsp;&nbsp;
              <span class="count-down">{{hr}}</span>&nbsp;:&nbsp;
              <span class="count-down">{{min}}</span>&nbsp;:&nbsp;
              <span class="count-down">{{sec}}</span>
            </div>
          </v-card-title>
        </v-card>
        <transition-group
          appear
          appear-active-class="card-enter"
          v-if="!baseInfo.ended && !baseInfo.temporaryClosed"
        >
          <template v-for="(item,i) in routeList">
            <v-layout row :key="i" class="mb-3">
              <v-flex xs12>
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
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
                        round
                        color="primary"
                        :disabled="userInfo.travelable==false"
                        :to="userInfo.device=='desktop'?'/route/'+item.id:'/mobile/route/'+item.id"
                        class="hidden-sm-and-down"
                      >我要报名</v-btn>
                    </v-card-title>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </template>
        </transition-group>

        <v-dialog v-model="loading" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              请稍后
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
      positionState: [
        {
          value: "11",
          text: "在岗"
        },
        {
          value: "2",
          text: "离岗"
        },
        {
          value: "3",
          text: "离校"
        },
        {
          value: "4",
          text: "离退休"
        },
        {
          value: "5",
          text: "提前退休"
        },
        {
          value: "6",
          text: "待岗"
        },
        {
          value: "10",
          text: "年度退休"
        },
        {
          value: "40",
          text: "临时在岗"
        },
        {
          value: "99",
          text: "特殊人员"
        }
      ],
      currentPositionState: {},
      now: null,
      close: false
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      authService.getUserInfo();
      await careService.getRouteList(this.year);
      this.currentPositionState = this.positionState.find(e => {
        return e.value == this.userInfo.positionState;
      });
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
      const startTime = Date.parse(
        new Date(this.baseInfo.registrationStartTime)
      );
      const endTime = Date.parse(new Date(this.baseInfo.registrationEndTime));
      const now = Date.parse(new Date());
      const msec = startTime - now > 0 ? startTime - now : now - startTime;
      this.countdownLabel = startTime - now > 0 ? "距离报名开始" : "已开始";
      if (endTime - now < 0) this.countdownLabel = "已结束";
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
    },
    backToLauncher() {
      window.location.href = "http://ghwx.ecust.edu.cn/wx/home";
    },
    showDetail(id) {
      this.$router.push({
        path:
          this.userInfo.device == "desktop"
            ? "/route/" + id
            : "/mobile/route/" + id
      });
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
    this.currentPositionState = this.positionState.find(e => {
      return e.value == this.userInfo.positionState;
    });

    console.log(this.baseInfo.ended);
  }
};
</script>


