import { UserAttributes } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: UserAttributes;
    }
  }
}
