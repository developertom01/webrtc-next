import { AppPort } from "server/ports/app";
import { AuthenticatePayload } from "server/ports/app/authenticate";
import { DbPort } from "server/ports/db";

export default class ApiAdopter implements AppPort {
  constructor(private readonly db: DbPort) {}
  public async signUp<SignupPayload>(options: SignupPayload) {
    const user = new this.db.models.User({ ...options });
    await user.save();
    return user;
  }
  public async authenticate({ email, password }: AuthenticatePayload) {
    const user = await this.db.models.User.findOne({ email });
    if (!user) {
      return null;
    }
    const isAuth = await user.authenticate(password);
    if (!isAuth) {
      return null;
    }
    return user;
  }
}
