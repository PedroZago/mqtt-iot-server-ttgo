import Device from "../../models/device.model";
import Telemetry, {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";
import { ITelemetryRepository } from "../interfaces/telemetry.repository.interface";

export class TelemetryRepository implements ITelemetryRepository {
  async findAll(): Promise<TelemetryAttributes[]> {
    return Telemetry.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: Device,
          as: "device",
          attributes: ["id", "serialNumber", "model"],
        },
      ],
    });
  }

  async findById(id: string): Promise<TelemetryAttributes | null> {
    return Telemetry.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: Device,
          as: "device",
          attributes: ["id", "serialNumber", "model"],
        },
      ],
    });
  }

  async create(telemetryData: TelemetryData): Promise<TelemetryAttributes> {
    const telemetry = await Telemetry.create(telemetryData);
    return telemetry.get({ plain: true });
  }

  async update(
    id: string,
    telemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null> {
    const telemetry = await Telemetry.findByPk(id);
    if (telemetry) {
      await telemetry.update(telemetryData);
      return telemetry.get({ plain: true });
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
