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
    NotificationData: NotificationData
  ): Promise<NotificationAttributes> {
    return Notification.create(NotificationData);
  }

  async update(
    id: string,
    NotificationData: NotificationData
  ): Promise<NotificationAttributes | null> {
    const notification = await Notification.findByPk(id);
    if (notification) {
      return notification.update(NotificationData);
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
