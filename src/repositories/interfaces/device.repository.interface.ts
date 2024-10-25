import { DeviceData, DeviceAttributes } from "../../models/device.model";

export interface IDeviceRepository {
  findAll(): Promise<DeviceAttributes[]>;
  findById(id: number): Promise<DeviceAttributes | null>;
  create(DeviceData: DeviceData): Promise<DeviceAttributes>;
  update(id: number, DeviceData: DeviceData): Promise<DeviceAttributes | null>;
  delete(id: number): Promise<void>;
}
