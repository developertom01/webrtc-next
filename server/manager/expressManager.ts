import express, { Express } from "express";
import { NextServer } from "next/dist/server/next";
import { AppPort } from "server/ports/app";
import { parse } from "url";
export default class ExpressManager implements AppPort<Express> {
  private _instance: Express;

  constructor(nextApp: NextServer) {
    this._instance = express();
    this._instance.use(express.urlencoded());
    this._instance.use(express.json());
    const handle = nextApp.getRequestHandler();
    this._instance.use((req, res) => {
      handle(req, res, parse(req.url!, true));
    });
  }
  public get instance(): Express {
    return this._instance;
  }
}
