import {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";

export interface ITelemetryRepository {
  findAll(): Promise<TelemetryAttributes[]>;
  findById(id: number): Promise<TelemetryAttributes | null>;
  create(TelemetryData: TelemetryData): Promise<TelemetryAttributes>;
  update(
    id: number,
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null>;
  delete(id: number): Promise<void>;
}
