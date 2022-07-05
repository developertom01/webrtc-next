import express, { Express } from "express";
import { NextServer } from "next/dist/server/next";
import { AppPort } from "server/ports/app";
import { FrameworkRightPort } from "server/ports/frameworkRight";
import { parse } from "url";
import WebRtcManager from "./WebrtcManager";
export default class ExpressManager implements FrameworkRightPort<Express> {
  private _instance: Express;

  constructor(
    nextApp: NextServer,
    webRtcServer: WebRtcManager,
    appAdopter: AppPort
  ) {
    this._instance = express();
    this._instance.use(express.urlencoded());
    this._instance.use(express.json());
    const handle = nextApp.getRequestHandler();
    this._instance.use("webrtc", webRtcServer.instance);
    this._instance.use((req, res) => {
      handle(req, res, parse(req.url!, true));
    });
  }
  public get instance(): Express {
    return this._instance;
  }
}
