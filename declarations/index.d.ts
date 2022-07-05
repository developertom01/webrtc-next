import { UserType } from "server/adopters/framework/left/db/mongo/models/User";
import Express from "express";

declare module "Express" {
  interface Request {
    user: UserType;
  }
}

declare module "socket.io" {
  interface Socket {
    user: UserType;
  }
}
