import {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";

export interface ITelemetryService {
  getAllTelemetries(): Promise<TelemetryAttributes[]>;
  getTelemetryById(id: number): Promise<TelemetryAttributes | null>;
  createTelemetry(TelemetryData: TelemetryData): Promise<TelemetryAttributes>;
  updateTelemetry(
    id: number,
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null>;
  deleteTelemetry(id: number): Promise<void>;
}
