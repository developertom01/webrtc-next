import { AppPort } from "server/ports/app";
import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const getAuthRouter = (appAdopter: AppPort) => {
  const router = Router();
  router.post("/", AuthenticationController.authenticate(appAdopter));

  return router;
};

export default getAuthRouter;
