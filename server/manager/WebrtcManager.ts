import { ExpressPeerServer } from "peer";
import http from "http";
import { CustomExpress, IClient } from "peer";
export default class WebRtcManager {
  public static mInstance: WebRtcManager;
  public instance: CustomExpress;
  constructor(server: http.Server) {
    this.instance = ExpressPeerServer(server);
    this.instance.on("connection", (client: IClient) => {
      client.userId = "hello";
      this.instance.on("disconnect", (client: IClient) => {
        client.userId = "";
      });
    });
  }
  public static initialize(server: http.Server) {
    if (WebRtcManager.mInstance) {
      return;
    }
    WebRtcManager.mInstance = new WebRtcManager(server);
  }
}
