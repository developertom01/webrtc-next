import { AppPort } from "server/ports/app";
import { Router } from "express";
import getAuthRouter from "./authRouter";

const getRouter = (appAdopter: AppPort) => {
  const router = Router();

  router.use("auth", getAuthRouter(appAdopter));

  return router;
};

export default getRouter;
