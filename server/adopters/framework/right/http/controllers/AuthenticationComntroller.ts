import { AppPort } from "server/ports/app";
import { Request, Response } from "express";
export default class AuthenticationController {
  constructor(private readonly appAdopter: AppPort) {}
  public authenticate(req: Request, res: Response) {
    const isAuth = this.appAdopter.authenticate({ ...req.body });
    console.log(req.url, isAuth);
    res.send("hello");
  }
}
