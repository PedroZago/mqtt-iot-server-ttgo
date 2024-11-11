import {
  NotificationData,
  NotificationAttributes,
} from "../../models/notification.model";

export interface INotificationService {
  getAllNotifications(): Promise<NotificationAttributes[]>;
  getNotificationById(id: string): Promise<NotificationAttributes | null>;
  createNotification(
    notificationData: NotificationData
  ): Promise<NotificationAttributes>;
  updateNotification(
    id: string,
    notificationData: NotificationData
  ): Promise<NotificationAttributes | null>;
  deleteNotification(id: string): Promise<void>;
}
