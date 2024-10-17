import {
  Schema,
  model,
  Document,
  Model,
  Error as MongooseError,
  mongo,
  Query,
} from "mongoose";
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
  softDelete(): Promise<IUserDocument>;
}

interface IUserModel extends Model<IUserDocument> {
  findByUsername(username: string): Promise<IUserDocument | null>;
}

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v),
      message: (props) => `${props.value} is not a strong password!`,
    },
  },
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

UserSchema.pre<Query<IUserDocument, IUserDocument>>(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

UserSchema.pre<Query<IUserDocument, IUserDocument>>(
  "findOneAndUpdate",
  function (next) {
    this.set({ updatedAt: new Date() });
    next();
  }
);

UserSchema.post<IUserDocument>(
  "save",
  function (error: any, _: IUserDocument, next: (err?: Error) => void) {
    if (error instanceof mongo.MongoError) {
      if (error.code === 11000) {
        return next(new Error("Email must be unique"));
      }
    } else if (error instanceof MongooseError.ValidationError) {
      return next(
        new Error(
          "Validation failed: " +
            Object.values(error.errors)
              .map((err) => err.message)
              .join(", ")
        )
      );
    } else if (error instanceof MongooseError.CastError) {
      return next(
        new Error(
          `Cast to ${error.kind} failed for value "${error.value}" at path "${error.path}"`
        )
      );
    }

    next(error);
  }
);

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return compare(password, this.password);
};

UserSchema.methods.softDelete = async function (): Promise<IUserDocument> {
  this.deletedAt = new Date();
  return this.save();
};

UserSchema.statics.findByUsername = async function (
  username: string
): Promise<IUserDocument | null> {
  return this.findOne({ username });
};

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

const User = model<IUserDocument, IUserModel>("User", UserSchema);

export { User, IUser };
