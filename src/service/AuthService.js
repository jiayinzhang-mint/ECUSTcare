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
      const device = detectDevice();
      const userInfo = {};
      userInfo.username = username;
      userInfo.device = device;
      rsp.device = device;
      store.commit("updateUserInfo", userInfo);
      return rsp;
    }
  }
}
export default AuthService;
