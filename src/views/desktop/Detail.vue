<template>
  <v-container style="height:calc(100vh - 64px);overflow :auto">
    <transition appear appear-active-class="card-enter">
      <v-card flat class="transparent">
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
                        <div>剩余 {{item.maxNumber-item.applicantNumber}}</div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn
                          v-if="item.maxNumber-item.applicantNumber>0"
                          round
                          flat
                          color="primary"
                          @click="enrollDialog=true;groupId=item.id"
                        >报名</v-btn>
                        <v-btn round flat disabled v-else>已满</v-btn>
                        <v-btn round flat @click="enrollListDialog=true;groupId=item.id">已报名人员</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </template>
            </transition-group>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </transition>

    <v-dialog v-model="enrollDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title class="subheading">报名须知
          <v-spacer></v-spacer>
          <v-btn icon @click="enrollDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text
          style="height: 300px;"
        >1、首次报名需使用学员身份证号注册，需如实、完整地填写学员信息，以便教学和应急所需。学员身份证号可在学员身份证、户口本、护照等有效证件上获得。确实无法获取的，可到孩子户籍所在地派出所查询。 非 中国大陆籍公民注册请到http://hzqsnhdzx.mikecrm.com/ytYqMbX ，填写学员国别与护照号（香港、澳门、台湾地区的为来往内地通行证号码）、姓名（证件上非中文名，但有中文名的请同时提供）、性别、出生年月日、学校、班 级、家长姓名、家长手机等信息，上传学员护照（香港、澳门、台湾地区的为来往内地通行证）照片，手机号务必填写正确，审核通过后注册账户信息将发至该手机 号，如有其他疑问可以发邮件到hzqsnjgc@126.com咨询。 2、在系统登记和确认学员年级信息时，以学员2019年春季在校就读年级为准。已经在网上报名系统中注册的，报名前请确认（修改）系统登记的秋季就读学校及年级信息，以免误报。网上报名系统可查询报名情况、再次选班报名、修改学员部分信息、查看摇号结果等。 3、报名者务必根据自身或子女身心情况选报适合的培训项目，避免因特异体质，认知、运动和沟通等不适应情况，或其他可能影响安全的疾病造成不良后果。 4、同一学期只能选报3个项目（不含已经在读项目）。同一项目只能选报一个班别，并以最后一次选报的为准。 5、各项目招收个别插班生，需报名的可到各项目教务室咨询。 6、所开设班级在报名人数不足以开班的情况下，有可能重新调整和安排，若调整请谅解和配合。 7、未收到短信通知的，请登入我中心网站网上报名系统查询结果。预约或报名结果以网上报名系统为准。 8、即日起可拨打“86510249或86510230”热线进行招生咨询，也可登录中心网站www.hzqsn.com查询。</v-card-text>
        <v-card-actions>
          <v-container>
            <v-layout>
              <v-flex xs12>
                <v-checkbox color="primary" v-model="agree" label="我已仔细阅读并同意本协议"></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-flex>
                <v-btn
                  block
                  depressed
                  round
                  color="primary"
                  v-if="agree"
                  @click="enroll(groupId);enrollDialog=false"
                >确认报名</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="enrollListDialog" scrollable max-width="600px">
      <v-card>
        <v-card-title class="subheading">已报名人员
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
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import qs from "qs";
export default {
  data() {
    return {
      routeInfo: [],
      baseInfo: [],
      groupList: [],
      enrollList: [{}, {}],
      titleImg: "",
      tab: null,
      enrollDialog: false,
      enrollListDialog: false,
      agree: false,
      groupId: null
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
    enroll(groupId) {
      let headers = new Headers({
        "Content-Type": "application/json;charset=utf-8"
      });
      this.$ajax.post(
        "/api/travel-applicant/pc",
        {
          username: this.userInfo.username,
          groupId: groupId
        },
        headers
      );
    }
  },
  computed: {
    ...mapGetters(["routeList", "userInfo"])
  },
  mounted() {
    this.getRouteInfo();
    this.getBaseInfo();
  }
};
</script>

<style>
</style>
