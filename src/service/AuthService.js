import basicService from "./BasicService";
import detectDevice from "../utils/device";
import message from "../utils/message";
import store from "../store";
import qs from "qs";

class AuthService {
  static async login(username, password) {
    var rsp = await basicService.postRequest(
      "/login",
      qs.stringify({
        username: username,
        password: password
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
    const userInfo = {};
    userInfo.username = rsp.username;
    userInfo.trueName = rsp.trueName;
    userInfo.sfzjh = rsp.sfzjh;
    userInfo.sex = rsp.sex;
    userInfo.phone = rsp.phone;
    userInfo.departmentName = rsp.departmentName;

    var enrollInfo = {};
    try {
      enrollInfo.routeId = rsp.routeId;
      enrollInfo.groupId = rsp.groupId;
    } catch (err) {
      err;
    }
    store.dispatch("enroll", enrollInfo);

    userInfo.device = device;
    rsp.device = device;
    store.commit("updateUserInfo", userInfo);
    return rsp;
  }
}
export default AuthService;
