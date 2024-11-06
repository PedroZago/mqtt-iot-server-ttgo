import Animal from "../../models/animal.model";
import Device, {
  DeviceData,
  DeviceAttributes,
} from "../../models/device.model";
import { IDeviceRepository } from "../interfaces/device.repository.interface";

export class DeviceRepository implements IDeviceRepository {
  async findAll(): Promise<DeviceAttributes[]> {
    return Device.findAll({
      include: [
        {
          model: Animal,
          as: "animal",
          attributes: ["id", "name"],
        },
        {
          model: Device,
          as: "gateway",
          attributes: ["id", "model", "serialNumber"],
        },
      ],
    });
  }

  async findById(id: string): Promise<DeviceAttributes | null> {
    return Device.findByPk(id, {
      include: [
        {
          model: Animal,
          as: "animal",
          attributes: ["id", "name"],
        },
        {
          model: Device,
          as: "gateway",
          attributes: ["id", "model", "serialNumber"],
        },
      ],
    });
  }

  async create(deviceData: DeviceData): Promise<DeviceAttributes> {
    return Device.create(deviceData);
  }

  async update(
    id: string,
    deviceData: DeviceData
  ): Promise<DeviceAttributes | null> {
    const device = await Device.findByPk(id);
    if (device) {
      return device.update(deviceData);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const device = await Device.findByPk(id);
    if (device) {
      await device.destroy();
    }
  }
}
