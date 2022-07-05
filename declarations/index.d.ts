import { UserType } from "server/adopters/framework/left/db/mongo/models/User";
import Express from "express";

declare module "Express" {
  interface Request {
    user: UserType | null;
  }
}
declare module "peer" {
  export interface IClient {
    getId(): string;
    getToken(): string;
    getSocket(): MyWebSocket | null;
    setSocket(socket: MyWebSocket | null): void;
    getLastPing(): number;
    setLastPing(lastPing: number): void;
    send(data: any): void;
    userId: string;
    user: UserType;
  }
  export interface CustomExpress extends Express.Express {
    on(event: string, callback: (...args: any[]) => void): this;
    on(event: "connection", callback: (client: IClient) => void): this;
    on(event: "disconnect", callback: (client: IClient) => void): this;
    on(
      event: "message",
      callback: (client: IClient, message: IMessage) => void
    ): this;
    on(event: "error", callback: (error: Error) => void): this;
  }
}

declare module "socket.io" {
  interface Socket {
    user: UserType;
  }
}
