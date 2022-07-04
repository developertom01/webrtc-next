import { Mongoose } from "mongoose";
import { DbPort } from "server/ports/db";

export default class DatabaseManager implements DbPort {
  private _instance: Mongoose;
  private static mInstance: DatabaseManager;

  constructor() {
    this._instance = new Mongoose({
        
    });
  }
  async authenticate() {
    const HOST = process.env.DB_HOST;
    const PORT = process.env.DB_PORT;
    const USER = process.env.DB_USERNAME;
    const PASSWORD = process.env.DB_PASSWORD;
    const DB_NAME = process.env.DB_NAME;
    await this._instance.connect(
      `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`
    );
  }

  public get instance() {
    return this._instance;
  }

  public static get getInstance() {
    if (!DatabaseManager.mInstance) {
      DatabaseManager.mInstance = new DatabaseManager();
    }
    return DatabaseManager.mInstance;
  }
}
