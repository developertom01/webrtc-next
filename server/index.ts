import next from "next";
import ApiAdopter from "./adopters/app";
import DbAdopter from "./adopters/framework/left/db";
import ExpressManager from "./manager/expressManager";
import ServerManager from "./manager/serverManager";
import SocketManager from "./manager/socketManager";
import WebRtcManager from "./manager/WebrtcManager";
import { AppPort } from "./ports/app";
import { DbPort } from "./ports/db";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

const dbAdopter: DbPort = new DbAdopter();
const apiAdopter: AppPort = new ApiAdopter(dbAdopter);
const app = new ExpressManager(nextApp, WebRtcManager.mInstance, apiAdopter);
const serverAdopter = new ServerManager(app, dbAdopter);

nextApp.prepare().then(() => {
  SocketManager.initialize(serverAdopter.instance);
  WebRtcManager.initialize(serverAdopter.instance);

  serverAdopter.run({
    port,
    callBack: () => {
      console.log(`App listening on port http://localhost:${port}`);
    },
  });
});
