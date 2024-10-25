import Telemetry, {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";
import { ITelemetryRepository } from "../interfaces/telemetry.repository.interface";

export class TelemetryRepository implements ITelemetryRepository {
  async findAll(): Promise<TelemetryAttributes[]> {
    return Telemetry.findAll();
  }

  async findById(id: number): Promise<TelemetryAttributes | null> {
    return Telemetry.findByPk(id);
  }

  async create(TelemetryData: TelemetryData): Promise<TelemetryAttributes> {
    return Telemetry.create(TelemetryData);
  }

  async update(
    id: number,
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null> {
    const telemetry = await Telemetry.findByPk(id);
    if (telemetry) {
      return telemetry.update(TelemetryData);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const telemetry = await Telemetry.findByPk(id);
    if (telemetry) {
      await telemetry.destroy();
    }
  }
}
