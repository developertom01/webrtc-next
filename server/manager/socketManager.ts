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
  private static _instance: Server;
  public static mInstance: SocketManager;
  constructor(httpServer: http.Server) {
    SocketManager._instance = new Server(httpServer, {
      cors: {
        origin: "*",
      },
      transports: ["websocket"],
    });
  }

  public static initialize(httpServer: http.Server) {
    if (SocketManager.mInstance) {
      return;
    }
    SocketManager.mInstance = new SocketManager(httpServer);
  }

  public get instance() {
    return SocketManager._instance;
  }
}
