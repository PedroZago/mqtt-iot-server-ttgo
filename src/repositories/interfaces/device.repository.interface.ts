import { DeviceData, DeviceAttributes } from "../../models/device.model";

export interface IDeviceRepository {
  findAll(): Promise<DeviceAttributes[]>;
  findById(id: string): Promise<DeviceAttributes | null>;
  create(deviceData: DeviceData): Promise<DeviceAttributes>;
  update(id: string, deviceData: DeviceData): Promise<DeviceAttributes | null>;
  delete(id: string): Promise<void>;
}
