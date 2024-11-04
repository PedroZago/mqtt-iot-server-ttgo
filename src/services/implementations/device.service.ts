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

  async createDevice(DeviceData: DeviceData): Promise<DeviceAttributes> {
    return this.DeviceRepository.create(DeviceData);
  }

  async updateDevice(
    id: string,
    DeviceData: DeviceData
  ): Promise<DeviceAttributes | null> {
    return this.DeviceRepository.update(id, DeviceData);
  }

  async deleteDevice(id: string): Promise<void> {
    return this.DeviceRepository.delete(id);
  }
}
