import { DeviceData, DeviceAttributes } from "../../models/device.model";

export interface IDeviceService {
  getAllDevices(): Promise<DeviceAttributes[]>;
  getDeviceById(id: string): Promise<DeviceAttributes | null>;
  createDevice(DeviceData: DeviceData): Promise<DeviceAttributes>;
  updateDevice(
    id: string,
    DeviceData: DeviceData
  ): Promise<DeviceAttributes | null>;
  deleteDevice(id: string): Promise<void>;
}
