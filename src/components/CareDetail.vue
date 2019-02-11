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
        <v-tabs v-model="tab" centered color="transparent">
          <v-tabs-slider></v-tabs-slider>
          <v-tab key="1">简介</v-tab>
          <v-tab key="2">疗养团</v-tab>
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
                          </div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            v-if="item.maxNumber-item.applicantNumber>0 && enrollInfo.groupId != item.id"
                            round
                            flat
                            color="primary"
                            @click="enrollDialog=true;groupId=item.id"
                          >报名</v-btn>
                          <v-btn
                            @click="cancel"
                            color="error"
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
                          >已报名人员 {{item.applicantNumber}}</v-btn>
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

    <v-dialog v-model="enrollDialog" persistent scrollable max-width="800px">
      <v-card v-if="enrollProgress==0">
        <v-card-title class="subheading font-weight-bold">报名须知
          <v-spacer></v-spacer>
          <v-btn icon @click="enrollDialog=false;enrollProgress=0">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text
          style="height: 300px;"
        >1、首次报名需使用学员身份证号注册，需如实、完整地填写学员信息，以便教学和应急所需。学员身份证号可在学员身份证、户口本、护照等有效证件上获得。确实无法获取的，可到孩子户籍所在地派出所查询。 非 中国大陆籍公民注册请到http://hzqsnhdzx.mikecrm.com/ytYqMbX ，填写学员国别与护照号（香港、澳门、台湾地区的为来往内地通行证号码）、姓名（证件上非中文名，但有中文名的请同时提供）、性别、出生年月日、学校、班 级、家长姓名、家长手机等信息，上传学员护照（香港、澳门、台湾地区的为来往内地通行证）照片，手机号务必填写正确，审核通过后注册账户信息将发至该手机 号，如有其他疑问可以发邮件到hzqsnjgc@126.com咨询。 2、在系统登记和确认学员年级信息时，以学员2019年春季在校就读年级为准。已经在网上报名系统中注册的，报名前请确认（修改）系统登记的秋季就读学校及年级信息，以免误报。网上报名系统可查询报名情况、再次选班报名、修改学员部分信息、查看摇号结果等。 3、报名者务必根据自身或子女身心情况选报适合的培训项目，避免因特异体质，认知、运动和沟通等不适应情况，或其他可能影响安全的疾病造成不良后果。 4、同一学期只能选报3个项目（不含已经在读项目）。同一项目只能选报一个班别，并以最后一次选报的为准。 5、各项目招收个别插班生，需报名的可到各项目教务室咨询。 6、所开设班级在报名人数不足以开班的情况下，有可能重新调整和安排，若调整请谅解和配合。 7、未收到短信通知的，请登入我中心网站网上报名系统查询结果。预约或报名结果以网上报名系统为准。 8、即日起可拨打“86510249或86510230”热线进行招生咨询，也可登录中心网站www.hzqsn.com查询。</v-card-text>
        <v-card-actions>
          <v-checkbox color="primary" v-model="agree" label="我已仔细阅读并同意本协议"></v-checkbox>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            block
            depressed
            round
            color="primary"
            v-if="agree"
            @click="enrollProgress=1;agree=false"
          >下一步：信息确认</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="enrollProgress==1">
        <v-card-title class="subheading font-weight-bold">信息确认
          <v-spacer></v-spacer>
          <v-btn icon @click="enrollDialog=false;enrollProgress=0">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field label="姓名" disabled></v-text-field>
            <v-text-field label="身份证" disabled></v-text-field>
            <v-text-field label="性别" disabled></v-text-field>
            <v-text-field label="手机号码" disabled></v-text-field>
            <v-text-field label="工作单位" disabled></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-checkbox color="primary" v-model="agree" label="以上信息准确无误"></v-checkbox>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            block
            depressed
            round
            color="primary"
            v-if="agree"
            @click="enrollProgress=2;agree=false"
          >下一步：信息补全</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="enrollProgress==2">
        <v-card-title class="subheading font-weight-bold">信息补全
          <v-spacer></v-spacer>
          <v-btn icon @click="enrollDialog=false;enrollProgress=0">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-radio-group label="身体状况" row>
              <v-radio label="健康" value="radio-1"></v-radio>
              <v-radio label="一般" value="radio-1"></v-radio>
              <v-radio label="较弱" value="radio-1"></v-radio>
            </v-radio-group>
            <v-text-field label="紧急联系人" required></v-text-field>
            <v-text-field label="家庭电话" required></v-text-field>
            <v-text-field label="职称" required></v-text-field>
            <v-text-field label="职务" required></v-text-field>
            <v-text-field label="工作单位" required></v-text-field>
            <v-radio-group label="接受调剂" row>
              <v-radio label="是" value="radio-1"></v-radio>
              <v-radio label="否" value="radio-1"></v-radio>
            </v-radio-group>
            <v-radio-group label="出发地点" row>
              <v-radio label="闵行校区" value="radio-1"></v-radio>
              <v-radio label="中北校区" value="radio-1"></v-radio>
            </v-radio-group>
            <v-textarea counter="50" label="备注"></v-textarea>
            <v-checkbox color="primary" v-model="agree" label="确认信息填写准确无误"></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions></v-card-actions>
        <v-card-actions>
          <v-btn
            block
            depressed
            round
            color="primary"
            v-if="agree"
            @click="enrollProgress=0;agree=false;enroll(groupId);enrollDialog=false"
          >确认报名</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      enrollDialog: false,
      enrollListDialog: false,
      agree: false,
      groupId: null,
      enrollProgress: 0
    };
  },
  methods: {
    async getRouteInfo() {
      var rsp = await careService.getRouteInfo(this.$route.params.id);
      this.routeInfo = rsp.route;
      console.log(rsp);
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
    async enroll(groupId) {
      await careService.enroll(this.$route.params.id, groupId);
      this.getRouteInfo();
      this.getBaseInfo();
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
