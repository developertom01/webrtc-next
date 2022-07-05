import { createServer, Server } from "http";
import { DbPort } from "server/ports/db";
import { FrameworkRightPort, RunOptions } from "server/ports/frameworkRight";
import WebRtcManager from "./WebrtcManager";

export default class ServerManager<T> {
  private _instance: Server;
  constructor(
    public app: FrameworkRightPort<T>,
    private readonly dbPort: DbPort
  ) {
    this._instance = createServer(this.app.instance);
    WebRtcManager.initialize(this._instance);
  }
  public get instance(): Server {
    return this._instance;
  }
  public async run({ port, callBack }: RunOptions) {
    await this.dbPort.authenticate();
    this._instance.listen(port ?? 3000, callBack);
  }
}
