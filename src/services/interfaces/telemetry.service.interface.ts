import {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";

export interface ITelemetryService {
  getAllTelemetries(): Promise<TelemetryAttributes[]>;
  getTelemetryById(id: string): Promise<TelemetryAttributes | null>;
  createTelemetry(TelemetryData: TelemetryData): Promise<TelemetryAttributes>;
  updateTelemetry(
    id: string,
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null>;
  deleteTelemetry(id: string): Promise<void>;
}
