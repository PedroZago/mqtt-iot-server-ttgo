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

  async getTelemetryById(id: number): Promise<TelemetryAttributes | null> {
    return this.TelemetryRepository.findById(id);
  }

  async createTelemetry(
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes> {
    return this.TelemetryRepository.create(TelemetryData);
  }

  async updateTelemetry(
    id: number,
    TelemetryData: TelemetryData
  ): Promise<TelemetryAttributes | null> {
    return this.TelemetryRepository.update(id, TelemetryData);
  }

  async deleteTelemetry(id: number): Promise<void> {
    return this.TelemetryRepository.delete(id);
  }
}
