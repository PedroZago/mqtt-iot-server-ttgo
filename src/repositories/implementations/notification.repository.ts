import Notification, {
  NotificationData,
  NotificationAttributes,
} from "../../models/notification.model";
import { INotificationRepository } from "../interfaces/notification.repository.interface";

export class NotificationRepository implements INotificationRepository {
  async findAll(): Promise<NotificationAttributes[]> {
    console.log("findAll");
    return Notification.findAll();
  }

  async findById(id: string): Promise<NotificationAttributes | null> {
    return Notification.findByPk(id);
  }

  async create(
    notificationData: NotificationData
  ): Promise<NotificationAttributes> {
    return Notification.create(notificationData);
  }

  async update(
    id: string,
    notificationData: NotificationData
  ): Promise<NotificationAttributes | null> {
    const notification = await Notification.findByPk(id);
    if (notification) {
      return notification.update(notificationData);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const notification = await Notification.findByPk(id);
    if (notification) {
      await notification.destroy();
    }
  }
}
