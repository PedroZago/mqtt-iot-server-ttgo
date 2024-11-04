import { NotificationRepository } from "../../repositories/implementations/notification.repository";
import {
  NotificationData,
  NotificationAttributes,
} from "../../models/notification.model";
import { INotificationService } from "../interfaces/notification.service.interface";

export class NotificationService implements INotificationService {
  private NotificationRepository: NotificationRepository;

  constructor(NotificationRepository: NotificationRepository) {
    this.NotificationRepository = NotificationRepository;
  }

  async getAllNotifications(): Promise<NotificationAttributes[]> {
    return this.NotificationRepository.findAll();
  }

  async getNotificationById(
    id: string
  ): Promise<NotificationAttributes | null> {
    return this.NotificationRepository.findById(id);
  }

  async createNotification(
    NotificationData: NotificationData
  ): Promise<NotificationAttributes> {
    return this.NotificationRepository.create(NotificationData);
  }

  async updateNotification(
    id: string,
    NotificationData: NotificationData
  ): Promise<NotificationAttributes | null> {
    return this.NotificationRepository.update(id, NotificationData);
  }

  async deleteNotification(id: string): Promise<void> {
    return this.NotificationRepository.delete(id);
  }
}
