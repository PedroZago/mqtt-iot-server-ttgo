import Notification, {
  NotificationData,
  NotificationAttributes,
} from "../../models/notification.model";
import User from "../../models/user.model";
import { INotificationRepository } from "../interfaces/notification.repository.interface";

export class NotificationRepository implements INotificationRepository {
  async findAll(): Promise<NotificationAttributes[]> {
    return Notification.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async findById(id: string): Promise<NotificationAttributes | null> {
    return Notification.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async create(
    notificationData: NotificationData
  ): Promise<NotificationAttributes> {
    const notification = await Notification.create(notificationData);
    return notification.get({ plain: true });
  }

  async update(
    id: string,
    notificationData: NotificationData
  ): Promise<NotificationAttributes | null> {
    const notification = await Notification.findByPk(id);
    if (notification) {
      await notification.update(notificationData);
      return notification.get({ plain: true });
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
