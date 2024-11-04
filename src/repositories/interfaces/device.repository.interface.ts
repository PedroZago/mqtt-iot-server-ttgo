import { DeviceData, DeviceAttributes } from "../../models/device.model";

export interface IDeviceRepository {
  findAll(): Promise<DeviceAttributes[]>;
  findById(id: string): Promise<DeviceAttributes | null>;
  create(DeviceData: DeviceData): Promise<DeviceAttributes>;
  update(id: string, DeviceData: DeviceData): Promise<DeviceAttributes | null>;
  delete(id: string): Promise<void>;
}
