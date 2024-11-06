import {
  NotificationData,
  NotificationAttributes,
} from "../../models/notification.model";

export interface INotificationRepository {
  findAll(): Promise<NotificationAttributes[]>;
  findById(id: string): Promise<NotificationAttributes | null>;
  create(notificationData: NotificationData): Promise<NotificationAttributes>;
  update(
    id: string,
    notificationData: NotificationData
  ): Promise<NotificationAttributes | null>;
  delete(id: string): Promise<void>;
}
