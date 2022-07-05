import DatabaseManager from "../../../../manager/DatabaseManager";
import { DbPort } from "../../../../ports/db";
import model from "./mongo/models";
export default class DbAdopter implements DbPort {
  public async authenticate() {
    const manager = new DatabaseManager();
    await manager.authenticate();
  }
  public get models() {
    return model;
  }
}
