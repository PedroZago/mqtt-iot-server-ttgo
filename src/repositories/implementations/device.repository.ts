import Device, {
  DeviceData,
  DeviceAttributes,
} from "../../models/device.model";
import { IDeviceRepository } from "../interfaces/device.repository.interface";

export class DeviceRepository implements IDeviceRepository {
  async findAll(): Promise<DeviceAttributes[]> {
    return Device.findAll();
  }

  async findById(id: number): Promise<DeviceAttributes | null> {
    return Device.findByPk(id);
  }

  async create(DeviceData: DeviceData): Promise<DeviceAttributes> {
    return Device.create(DeviceData);
  }

  async update(
    id: number,
    DeviceData: DeviceData
  ): Promise<DeviceAttributes | null> {
    const device = await Device.findByPk(id);
    if (device) {
      return device.update(DeviceData);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const device = await Device.findByPk(id);
    if (device) {
      await device.destroy();
    }
  }
}
