import { createServer, Server } from "http";
import { AppPort, RunOptions } from "server/ports/app";
import { DbPort } from "server/ports/db";

export default class ServerManager {
  private _instance: Server;
  constructor(public app: AppPort, public dbPort: DbPort) {
    this._instance = createServer(app.instance);
  }
  public get instance(): Server {
    return this._instance;
  }
  public async run({ port, callBack }: RunOptions) {
    try {
      await this.dbPort.authenticate();
      this._instance.listen(port ?? 3000, callBack);
    } catch (error: any) {
      console.error(`App failed to run, err:${error.message}`);
    }
  }
}
