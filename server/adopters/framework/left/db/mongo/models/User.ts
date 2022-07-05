import moment from "moment";
import mongoose, { model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { promisify } from "util";

export interface IUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  authenticate: (password: string) => Promise<boolean>;
}

export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

userSchema.method("authenticate", async function (password: string) {
  const compare = promisify(bcrypt.compare);
  return compare(this.password, password);
});
userSchema.pre("save", async function (next) {
  const hash = promisify(bcrypt.hash);
  this.password = await hash(this.password, 10);
  this.createdAt = moment.utc().toDate();
  this.updatedAt = moment.utc().toDate();
  next();
});
const User = model<IUser, UserModel>("User", userSchema);

export type UserType = InstanceType<typeof User>;

export default User;
