import {
  NotificationData,
  NotificationAttributes,
} from "../../models/notification.model";

export interface INotificationService {
  getAllNotifications(): Promise<NotificationAttributes[]>;
  getNotificationById(id: string): Promise<NotificationAttributes | null>;
  createNotification(
    NotificationData: NotificationData
  ): Promise<NotificationAttributes>;
  updateNotification(
    id: string,
    NotificationData: NotificationData
  ): Promise<NotificationAttributes | null>;
  deleteNotification(id: string): Promise<void>;
}
