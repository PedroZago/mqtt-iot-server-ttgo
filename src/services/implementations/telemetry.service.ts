import { TelemetryRepository } from "../../repositories/implementations/telemetry.repository";
import {
  TelemetryData,
  TelemetryAttributes,
} from "../../models/telemetry.model";
import { ITelemetryService } from "../interfaces/telemetry.service.interface";

export class TelemetryService implements ITelemetryService {
  private TelemetryRepository: TelemetryRepository;

  constructor(TelemetryRepository: TelemetryRepository) {
    this.TelemetryRepository = TelemetryRepository;
  }

  async getAllTelemetries(): Promise<TelemetryAttributes[]> {
    return this.TelemetryRepository.findAll();
  }

  async getTelemetryById(id: string): Promise<TelemetryAttributes | null> {
    return this.TelemetryRepository.findById(id);
  }

  async createTelemetry(
    telemetryData: TelemetryData
  ): Promise<TelemetryAttributes> {
    return this.TelemetryRepository.create(telemetryData);
  }

  async updateTelemetry(
    id: string,
    telemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null> {
    return this.TelemetryRepository.update(id, telemetryData);
  }

  async deleteTelemetry(id: string): Promise<void> {
    return this.TelemetryRepository.delete(id);
  }
}
