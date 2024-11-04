import { Request, Response } from "express";
import { ITelemetryService } from "../services/interfaces/telemetry.service.interface";
import { TelemetryService } from "../services/implementations/telemetry.service";
import { TelemetryRepository } from "../repositories/implementations/telemetry.repository";

export class TelemetryController {
  private telemetryService: ITelemetryService;

  constructor() {
    const telemetryRepository = new TelemetryRepository();
    this.telemetryService = new TelemetryService(telemetryRepository);
  }

  async getAllTelemetries(_req: Request, res: Response): Promise<Response> {
    try {
      const telemetries = await this.telemetryService.getAllTelemetries();
      return res.status(200).json(telemetries);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getTelemetryById(req: Request, res: Response): Promise<Response> {
    try {
      const telemetry = await this.telemetryService.getTelemetryById(
        req.params.id
      );
      return res.status(200).json(telemetry);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createTelemetry(req: Request, res: Response): Promise<Response> {
    try {
      const newTelemetry = await this.telemetryService.createTelemetry(
        req.body
      );
      return res.status(201).json(newTelemetry);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateTelemetry(req: Request, res: Response): Promise<Response> {
    try {
      const updatedTelemetry = await this.telemetryService.updateTelemetry(
        req.params.id,
        req.body
      );
      return res.status(200).json(updatedTelemetry);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteTelemetry(req: Request, res: Response): Promise<Response> {
    try {
      await this.telemetryService.deleteTelemetry(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
