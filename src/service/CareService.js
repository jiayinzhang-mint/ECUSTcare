import basicService from "./BasicService";
import store from "../store";
class careService {
  static async getRouteList(year) {
    const rsp = await basicService.getRequest("/api/travel/" + year);
    await store.dispatch("getRouteList", rsp.routeList);
    return rsp;
  }
}

export default careService;
