import { Schema, model, Document, Model } from "mongoose";
import { hash, compare } from "bcrypt";

interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>;
}

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

UserSchema.pre<IUserDocument>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10);
    }
    this.updatedAt = new Date();
    next();
  } catch (error: unknown) {
    next(error as Error);
  }
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await compare(password, this.password);
  } catch (error: unknown) {
    throw new Error(
      `Error comparing password: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};

const User = model<IUserDocument, IUserModel>("User", UserSchema);

export { User, IUser };
