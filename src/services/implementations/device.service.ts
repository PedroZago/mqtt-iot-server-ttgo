import { DeviceRepository } from "../../repositories/implementations/device.repository";
import { DeviceData, DeviceAttributes } from "../../models/device.model";
import { IDeviceService } from "../interfaces/device.service.interface";

export class DeviceService implements IDeviceService {
  private DeviceRepository: DeviceRepository;

  constructor(DeviceRepository: DeviceRepository) {
    this.DeviceRepository = DeviceRepository;
  }

  async getAllDevices(): Promise<DeviceAttributes[]> {
    return this.DeviceRepository.findAll();
  }

  async getDeviceById(id: string): Promise<DeviceAttributes | null> {
    return this.DeviceRepository.findById(id);
  }

  async createDevice(deviceData: DeviceData): Promise<DeviceAttributes> {
    return this.DeviceRepository.create(deviceData);
  }

  async updateDevice(
    id: string,
    deviceData: DeviceData
  ): Promise<DeviceAttributes | null> {
    return this.DeviceRepository.update(id, deviceData);
  }

  async deleteDevice(id: string): Promise<void> {
    return this.DeviceRepository.delete(id);
  }
}
