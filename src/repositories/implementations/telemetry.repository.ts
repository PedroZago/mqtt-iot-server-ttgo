import Telemetry, {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";
import { ITelemetryRepository } from "../interfaces/telemetry.repository.interface";

export class TelemetryRepository implements ITelemetryRepository {
  async findAll(): Promise<TelemetryAttributes[]> {
    return Telemetry.findAll();
  }

  async findById(id: string): Promise<TelemetryAttributes | null> {
    return Telemetry.findByPk(id);
  }

  async create(telemetryData: TelemetryData): Promise<TelemetryAttributes> {
    return Telemetry.create(telemetryData);
  }

  async update(
    id: string,
    telemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null> {
    const telemetry = await Telemetry.findByPk(id);
    if (telemetry) {
      return telemetry.update(telemetryData);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const telemetry = await Telemetry.findByPk(id);
    if (telemetry) {
      await telemetry.destroy();
    }
  }
}
