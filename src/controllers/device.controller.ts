import { Request, Response } from "express";
import { IDeviceService } from "../services/interfaces/device.service.interface";
import { DeviceService } from "../services/implementations/device.service";
import { DeviceRepository } from "../repositories/implementations/device.repository";

export class DeviceController {
  private deviceService: IDeviceService;

  constructor() {
    const deviceRepository = new DeviceRepository();
    this.deviceService = new DeviceService(deviceRepository);
  }

  async getAllDevices(_req: Request, res: Response): Promise<Response> {
    try {
      const devices = await this.deviceService.getAllDevices();
      return res.status(200).json(devices);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getDeviceById(req: Request, res: Response): Promise<Response> {
    try {
      const device = await this.deviceService.getDeviceById(
        Number(req.params.id)
      );
      return res.status(200).json(device);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createDevice(req: Request, res: Response): Promise<Response> {
    try {
      const newDevice = await this.deviceService.createDevice(req.body);
      return res.status(201).json(newDevice);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateDevice(req: Request, res: Response): Promise<Response> {
    try {
      const updatedDevice = await this.deviceService.updateDevice(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedDevice);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteDevice(req: Request, res: Response): Promise<Response> {
    try {
      await this.deviceService.deleteDevice(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
