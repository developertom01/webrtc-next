import next from "next";
import DatabaseManager from "./manager/DatabaseManager";
import ExpressManager from "./manager/expressManager";
import ServerManager from "./manager/serverManager";
import SocketManager from "./manager/socketManager";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

const dbAdopter = new DatabaseManager();
const app = new ExpressManager(nextApp);
const serverAdopter = new ServerManager(app, dbAdopter);

nextApp.prepare().then(() => {
  SocketManager.initialize(serverAdopter.instance);

  serverAdopter.run({
    port,
    callBack: () => {
      console.log(`App listening on port http://localhost:${port}`);
    },
  });
});
