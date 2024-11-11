import { DeviceData, DeviceAttributes } from "../../models/device.model";

export interface IDeviceService {
  getAllDevices(): Promise<DeviceAttributes[]>;
  getDeviceById(id: string): Promise<DeviceAttributes | null>;
  createDevice(deviceData: DeviceData): Promise<DeviceAttributes>;
  updateDevice(
    id: string,
    deviceData: DeviceData
  ): Promise<DeviceAttributes | null>;
  deleteDevice(id: string): Promise<void>;
}
