import { SocketPort } from "server/ports/socket";
import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import http from "http";
export interface SocketData {}

export interface IServer<D = DefaultEventsMap, S = DefaultEventsMap>
  extends Server<D, S> {}
export interface ISocket<D = DefaultEventsMap, S = DefaultEventsMap>
  extends Socket<D, S, never, SocketData> {}

export default class SocketManager implements SocketPort<Server> {
  private _instance: Server;
  public static mInstance: SocketManager;
  constructor(httpServer: http.Server) {
    this._instance = new Server(httpServer, {
      cors: {
        origin: "*",
      },
      transports: ["websocket"],
    });
    this._instance.on("connection", () => {
      //Add listeners and middleware
    });
  }

  public static initialize(httpServer: http.Server) {
    if (SocketManager.mInstance) {
      return;
    }
    SocketManager.mInstance = new SocketManager(httpServer);
  }

  public get instance() {
    return this._instance;
  }
}
