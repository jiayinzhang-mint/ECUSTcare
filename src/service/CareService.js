import basicService from "./BasicService";
import store from "../store";
import message from "../utils/message";

class careService {
  static async getRouteList() {
    var today = new Date();
    var year = today.getFullYear();
    const rsp = await basicService.getRequest("/api/travel/" + year);
    await store.dispatch("getRouteList", rsp.routeList);
    return rsp;
  }

  static async getRouteInfo(routeId) {
    const rsp = basicService.getRequest("/api/travel-route/" + routeId);
    return rsp;
  }

  static async enroll(routeId, groupId) {
    const rsp = await basicService.postRequest("/api/travel-applicant/pc", {
      username: store.getters.userInfo.username,
      groupId: groupId
    });
    if (rsp.message == "报名成功") {
      message.snackbar("success");
      var enrollInfo = {};
      enrollInfo.routeId = routeId;
      enrollInfo.groupId = groupId;
      store.dispatch("enroll", enrollInfo);
      await this.getRouteList();
    } else {
      message.snackbar(rsp.message);
    }
    return rsp;
  }

  static async cancel() {
    const rsp = await basicService.deleteRequest("/api/travel-applicant/pc", {
      username: store.getters.userInfo.username
    });
    if (rsp.message == "取消成功") {
      message.snackbar("success");
      var enrollInfo = {};
      enrollInfo.routeId = null;
      enrollInfo.groupId = null;
      await store.dispatch("enroll", enrollInfo);
      await this.getRouteList();
    }
    return rsp;
  }
}

export default careService;
