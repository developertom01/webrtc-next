import express, { Express } from "express";
import { AppPort } from "server/ports/app";
import { DbPort } from "server/ports/db";

export default class ExpressManager implements AppPort<Express> {
  private _instance: Express;
  constructor(public dbPort: DbPort) {
    this._instance = express();
    this._instance.use(express.urlencoded());
    this._instance.use(express.json());
  }
  public get instance(): Express {
    return this._instance;
  }
}
