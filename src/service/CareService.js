import basicService from "./BasicService";
import store from "../store";
import message from "../utils/message";

class careService {
  static async getBaseInfo() {
    var rsp = await basicService.getRequest("/api/travel/pc/info");
    var baseInfo = {};
    baseInfo = rsp.info;
    await store.dispatch("updateBaseInfo", baseInfo);
    return rsp;
  }

  static async getRouteList() {
    var today = new Date();
    var year = today.getFullYear();
    const rsp = await basicService.getRequest("/api/travel/pc/routeList");
    await store.dispatch("getRouteList", rsp.list);
    return rsp;
  }

  static async getRouteInfo(routeId) {
    const rsp = basicService.getRequest("/api/travel/pc/route/" + routeId);
    return rsp;
  }

  static async getGroupMember(groupId) {
    const rsp = basicService.getRequest(
      "/api/travel/pc/group/" + groupId + "/applicantList"
    );
    return rsp;
  }

  static async enroll(routeId, groupId, fillInfo) {
    console.log(fillInfo);
    const rsp = await basicService.postRequest("/api/travel-applicant/pc", {
      username: store.getters.userInfo.username,
      groupId: groupId,
      job: fillInfo.job,
      physicalState: fillInfo.physicalState,
      emergencyContact: fillInfo.emergencyContact,
      homeTelephone: fillInfo.homeTelephone,
      acceptAdjustment: fillInfo.acceptAdjustment,
      campus: fillInfo.campus,
      comment: fillInfo.comment
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
