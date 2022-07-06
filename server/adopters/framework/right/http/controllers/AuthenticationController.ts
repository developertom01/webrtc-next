import { AppPort } from "server/ports/app";
import { Request, Response } from "express";
export default class AuthenticationController {
  public static authenticate =
    (appAdopter: AppPort) => async (req: Request, res: Response) => {
      console.log(req.body);
      const isAuth = await appAdopter.authenticate({ ...req.body });
      console.log(req.url, isAuth);
      return res.send("hello");
    };
}
