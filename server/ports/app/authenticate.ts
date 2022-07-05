import { UserType } from "server/adopters/framework/left/db/mongo/models/User";

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthenticatePayload {
  email: string;
  password: string;
}

export interface AuthenticatePort {
  signUp: (options: SignupPayload) => Promise<UserType | null>;
  authenticate: (options: AuthenticatePayload) => Promise<UserType | null>;
}
