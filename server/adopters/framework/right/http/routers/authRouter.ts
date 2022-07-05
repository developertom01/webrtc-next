import { AppPort } from "server/ports/app";
import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationComntroller";

const getAuthRouter = (appAdopter: AppPort) => {
  const router = Router();

  const authController = new AuthenticationController(appAdopter);
  router.post("", authController.authenticate);

  return router;
};

export default getAuthRouter;
