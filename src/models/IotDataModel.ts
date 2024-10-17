import {
  Schema,
  model,
  Document,
  Model,
  Error as MongooseError,
  mongo,
  Query,
} from "mongoose";

interface IMessage {
  temperature: number;
  heartRate: number;
  latitude: number;
  longitude: number;
}

interface IIotData {
  topic: string;
  message: IMessage;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface IIotDocument extends IIotData, Document {}

interface IIotModel extends Model<IIotDocument> {}

const IotDataSchema = new Schema<IIotDocument>({
  topic: { type: String, required: true },
  message: {
    temperature: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

IotDataSchema.pre<IIotDocument>("save", function (next) {
  try {
    this.updatedAt = new Date();
    next();
  } catch (error: unknown) {
    next(error as Error);
  }
});

IotDataSchema.pre<Query<IIotDocument, IIotDocument>>(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

IotDataSchema.post<IIotDocument>(
  "save",
  function (error: any, _: IIotDocument, next: (err?: Error) => void) {
    if (error instanceof MongooseError.ValidationError) {
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

IotDataSchema.index({ topic: 1 });
IotDataSchema.index({ "message.temperature": 1 });
IotDataSchema.index({ "message.heartRate": 1 });

const IotData = model<IIotDocument, IIotModel>("IotData", IotDataSchema);

export { IotData, IIotData, IMessage };
