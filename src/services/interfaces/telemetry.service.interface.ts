import {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";

export interface ITelemetryService {
  getAllTelemetries(): Promise<TelemetryAttributes[]>;
  getTelemetryById(id: string): Promise<TelemetryAttributes | null>;
  createTelemetry(telemetryData: TelemetryData): Promise<TelemetryAttributes>;
  updateTelemetry(
    id: string,
    telemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null>;
  deleteTelemetry(id: string): Promise<void>;
}
