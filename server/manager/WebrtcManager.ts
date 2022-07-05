import http from "http";
import { ExpressPeerServer } from "peer";
export default class WebRtcManager {
  public static mInstance: WebRtcManager;
  public instance: ReturnType<typeof ExpressPeerServer>;
  constructor(server: http.Server) {
    this.instance = ExpressPeerServer(server);
    this.instance.on("connection", (client) => {
      console.log(client);
      // client.userId = "hello";
      this.instance.on("disconnect", (client) => {
        console.log(client);

        // client.userId = "";
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
