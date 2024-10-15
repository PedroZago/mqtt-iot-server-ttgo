import { Schema, model, Document, Model } from "mongoose";

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

interface IIotDocument extends IIotData, Document {
  comparePassword(password: string): Promise<boolean>;
}

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

const IotData = model<IIotDocument, IIotModel>("IotData", IotDataSchema);

export { IotData, IIotData, IMessage };
