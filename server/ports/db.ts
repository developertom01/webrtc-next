import models from "server/adopters/framework/left/db/mongo/models";
export interface DbPort {
  authenticate: () => Promise<void>;
  models: typeof models;
}
