import { DeviceData, DeviceAttributes } from "../../models/device.model";

export interface IDeviceService {
  getAllDevices(): Promise<DeviceAttributes[]>;
  getDeviceById(id: number): Promise<DeviceAttributes | null>;
  createDevice(DeviceData: DeviceData): Promise<DeviceAttributes>;
  updateDevice(
    id: number,
    DeviceData: DeviceData
  ): Promise<DeviceAttributes | null>;
  deleteDevice(id: number): Promise<void>;
}
