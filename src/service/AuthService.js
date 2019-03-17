import basicService from "./BasicService";
import detectDevice from "../utils/device";
import message from "../utils/message";
import store from "../store";
import qs from "qs";
import Vue from "vue";

class AuthService {
  static async login(username, password) {
    var rsp = await basicService.postRequest(
      "/login",
      qs.stringify({
        username: username,
        password: password,
        type: "normal"
      })
    );
    if (rsp.message == "登陆成功") {
      message.snackbar("success");
      return rsp;
    }
  }

  static async getUserInfo() {
    var rsp = await basicService.getRequest("/api/travel/pc/userInfo");
    const device = detectDevice();
    // console.log(rsp.code);

    if (rsp.code == 403) {
      if (device == "desktop") {
        window.location.href = "http://ghhd.ecnu.edu.cn/pc/login";
      } else {
        window.location.href = "http://ghhd.ecnu.edu.cn/wechat/index";
      }
    }
    var userInfo = rsp;
    var enrollInfo = {};
    try {
      enrollInfo.routeId = rsp.routeId;
      enrollInfo.groupId = rsp.groupId;
    } catch (err) {
      err;
    }
    store.dispatch("enroll", enrollInfo);

    userInfo.device = device;
    console.log(userInfo);
    store.commit("updateUserInfo", userInfo);
    return rsp;
  }
}
export default AuthService;
