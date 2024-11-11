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
    notificationData: NotificationData
  ): Promise<NotificationAttributes> {
    return this.NotificationRepository.create(notificationData);
  }

  async updateNotification(
    id: string,
    notificationData: NotificationData
  ): Promise<NotificationAttributes | null> {
    return this.NotificationRepository.update(id, notificationData);
  }

  async deleteNotification(id: string): Promise<void> {
    return this.NotificationRepository.delete(id);
  }
}
