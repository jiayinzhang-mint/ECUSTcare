<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
      <v-btn
        icon
        style="margin-top:17px"
        :to="userInfo.device=='desktop'?'/route/'+$route.params.id:'/mobile/route/'+$route.params.id"
      >
        <v-icon>clear</v-icon>
      </v-btn>
    </v-stepper-header>

    <v-stepper-items style="height:calc(100vh - 128px);overflow :auto">
      <v-stepper-content step="1">
        <div class="subheading font-weight-bold mb-3">报名须知</div>
        <div>1、首次报名需使用学员身份证号注册，需如实、完整地填写学员信息，以便教学和应急所需。学员身份证号可在学员身份证、户口本、护照等有效证件上获得。确实无法获取的，可到孩子户籍所在地派出所查询。 非 中国大陆籍公民注册请到http://hzqsnhdzx.mikecrm.com/ytYqMbX ，填写学员国别与护照号（香港、澳门、台湾地区的为来往内地通行证号码）、姓名（证件上非中文名，但有中文名的请同时提供）、性别、出生年月日、学校、班 级、家长姓名、家长手机等信息，上传学员护照（香港、澳门、台湾地区的为来往内地通行证）照片，手机号务必填写正确，审核通过后注册账户信息将发至该手机 号，如有其他疑问可以发邮件到hzqsnjgc@126.com咨询。 2、在系统登记和确认学员年级信息时，以学员2019年春季在校就读年级为准。已经在网上报名系统中注册的，报名前请确认（修改）系统登记的秋季就读学校及年级信息，以免误报。网上报名系统可查询报名情况、再次选班报名、修改学员部分信息、查看摇号结果等。 3、报名者务必根据自身或子女身心情况选报适合的培训项目，避免因特异体质，认知、运动和沟通等不适应情况，或其他可能影响安全的疾病造成不良后果。 4、同一学期只能选报3个项目（不含已经在读项目）。同一项目只能选报一个班别，并以最后一次选报的为准。 5、各项目招收个别插班生，需报名的可到各项目教务室咨询。 6、所开设班级在报名人数不足以开班的情况下，有可能重新调整和安排，若调整请谅解和配合。 7、未收到短信通知的，请登入我中心网站网上报名系统查询结果。预约或报名结果以网上报名系统为准。 8、即日起可拨打“86510249或86510230”热线进行招生咨询，也可登录中心网站www.hzqsn.com查询。</div>
        <div>
          <v-checkbox color="primary" v-model="agree" label="我已仔细阅读并同意本协议"></v-checkbox>
        </div>
        <div>
          <v-btn
            block
            depressed
            round
            color="primary"
            v-if="agree"
            @click="e1=2;agree=false"
          >下一步：信息确认</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <div class="subheading font-weight-bold mb-3">信息确认</div>

        <v-form>
          <v-text-field label="姓名" disabled></v-text-field>
          <v-text-field label="身份证" disabled></v-text-field>
          <v-text-field label="性别" disabled></v-text-field>
          <v-text-field label="手机号码" disabled></v-text-field>
          <v-text-field label="工作单位" disabled></v-text-field>
        </v-form>
        <v-checkbox color="primary" v-model="agree" label="以上信息准确无误"></v-checkbox>
        <v-btn block depressed round color="primary" v-if="agree" @click="e1=3;agree=false">下一步：信息补全</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <div class="subheading font-weight-bold mb-3">信息补全</div>

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
        <v-btn
          block
          depressed
          round
          color="primary"
          v-if="agree"
          @click="enroll($route.params.groupId)"
        >确认报名</v-btn>
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
      agree: false
    };
  },
  methods: {
    async enroll() {
      this.$loading.show(true);

      const rsp = await careService.enroll(
        this.$route.params.id,
        this.$route.params.groupId
      );
      this.$loading.show(false);
      if (rsp.message == "报名成功") {
        this.$emit("enroll");
      }
      if (this.userInfo.device == "desktop") {
        this.$router.push({ path: "/route/" + this.$route.params.id });
      } else {
        this.$router.push({ path: "/mobile/route/" + this.$route.params.id });
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style>
</style>
