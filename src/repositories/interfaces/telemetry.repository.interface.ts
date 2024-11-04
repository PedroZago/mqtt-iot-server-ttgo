import {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";

export interface ITelemetryRepository {
  findAll(): Promise<TelemetryAttributes[]>;
  findById(id: string): Promise<TelemetryAttributes | null>;
  create(TelemetryData: TelemetryData): Promise<TelemetryAttributes>;
  update(
    id: string,
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null>;
  delete(id: string): Promise<void>;
}
