<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">报名须知</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">信息确认</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">信息补全</v-stepper-step>
      <v-btn
        icon
        style="margin-top:17px"
        :to="userInfo.device=='desktop'?'/route/'+$route.params.id:'/mobile/route/'+$route.params.id"
      >
        <v-icon>clear</v-icon>
      </v-btn>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="subheading font-weight-bold mb-3">报名须知</div>
        <div class="ql-editor" v-html="baseInfo.notification"></div>
        <div>
          <v-checkbox color="primary" v-model="agree" label="我已仔细阅读并同意本协议"></v-checkbox>
        </div>
        <v-layout justify-center>
          <v-flex xs12 sm6>
            <v-btn
              block
              depressed
              round
              color="primary"
              v-if="agree"
              @click="e1=2;agree=false"
            >下一步：信息确认</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="2">
        <div class="subheading font-weight-bold mb-3">信息确认</div>

        <v-form>
          <v-text-field label="姓名" :value="userInfo.trueName" disabled>{{userInfo.trueName}}</v-text-field>
          <v-text-field label="身份证" :value="userInfo.sfzjh" disabled>{{userInfo.sfzjh}}</v-text-field>
          <v-text-field label="性别" :value="userInfo.sex==1?'男':'女'" disabled></v-text-field>
          <v-text-field label="手机号码" :value="userInfo.phone" disabled>{{userInfo.phone}}</v-text-field>
          <v-text-field label="工作单位" :value="userInfo.departmentName" disabled></v-text-field>
        </v-form>
        <v-checkbox color="primary" v-model="agree" label="以上信息准确无误"></v-checkbox>
        <small>请各位老师和对个人基本信息，如有异议，请联系校工会老师。</small>
        <v-layout justify-center>
          <v-flex xs12 sm6>
            <v-btn
              block
              depressed
              round
              color="primary"
              v-if="agree"
              @click="e1=3;agree=false"
            >下一步：信息补全</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="3">
        <div class="subheading font-weight-bold mb-3">信息补全</div>

        <v-form ref="enrollForm">
          <v-radio-group
            required
            label="身体状况"
            row
            v-model="fillInfo.physicalState"
            :rules="[v => !!v || '必填项']"
          >
            <v-radio label="健康" value="健康"></v-radio>
            <v-radio label="一般" value="一般"></v-radio>
            <v-radio label="较弱" value="较弱"></v-radio>
          </v-radio-group>
          <v-text-field
            label="紧急联系人"
            required
            v-model="fillInfo.emergencyContact"
            :rules="[v => !!v || '必填项']"
          ></v-text-field>
          <v-text-field
            label="联系电话"
            required
            v-model="fillInfo.homeTelephone"
            :rules="[v => !!v || '必填项']"
          ></v-text-field>
          <v-text-field
            label="职称 / 职务"
            required
            v-model="fillInfo.job"
            :rules="[v => !!v || '必填项']"
          ></v-text-field>
          <v-radio-group label="出发地点" v-model="fillInfo.campus" row :rules="[v => !!v || '必填项']">
            <v-radio label="闵行校区" value="0"></v-radio>
            <v-radio label="中北校区" value="1"></v-radio>
          </v-radio-group>
          <v-radio-group
            label="接受调剂"
            v-model="fillInfo.acceptAdjustment"
            row
            :rules="[v => !!v || '必填项']"
          >
            <v-radio label="接受" value="true"></v-radio>
            <v-radio label="不接受" value="false"></v-radio>
          </v-radio-group>
          <v-textarea v-model="fillInfo.comment" counter="50" label="备注"></v-textarea>
          <v-checkbox color="primary" v-model="agree" label="确认信息填写准确无误"></v-checkbox>
        </v-form>
        <v-layout justify-center>
          <v-flex xs12 sm6>
            <v-btn
              block
              depressed
              round
              color="primary"
              v-if="agree"
              @click="enroll($route.params.groupId)"
            >确认报名</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters } from "vuex";
import careService from "../service/CareService";

export default {
  data() {
    return {
      e1: 1,
      agree: false,
      fillInfo: []
    };
  },
  methods: {
    async enroll() {
      if (this.$refs.enrollForm.validate()) {
        this.$loading.show(true);
        const rsp = await careService.enroll(
          this.$route.params.id,
          this.$route.params.groupId,
          this.fillInfo
        );
        this.$loading.show(false);
        if (rsp.message == "报名成功") {
          this.$emit("enroll");
        }
        window.location.href = "http://ghhd.ecnu.edu.cn/care";
      }
    }
  },
  computed: {
    ...mapGetters(["baseInfo", "userInfo"])
  },
  mounted() {}
};
</script>

<style>
</style>
