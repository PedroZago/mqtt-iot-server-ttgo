import { Request, Response } from "express";
import { INotificationService } from "../services/interfaces/notification.service.interface";
import { NotificationService } from "../services/implementations/notification.service";
import { NotificationRepository } from "../repositories/implementations/notification.repository";

export class NotificationController {
  private notificationService: INotificationService;

  constructor() {
    const notificationRepository = new NotificationRepository();
    this.notificationService = new NotificationService(notificationRepository);
  }

  async getAllNotifications(_req: Request, res: Response): Promise<Response> {
    try {
      const notifications =
        await this.notificationService.getAllNotifications();
      return res.status(200).json(notifications);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getNotificationById(req: Request, res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.getNotificationById(
        req.params.id
      );
      return res.status(200).json(notification);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async createNotification(req: Request, res: Response): Promise<Response> {
    try {
      const newNotification = await this.notificationService.createNotification(
        req.body
      );
      return res.status(201).json(newNotification);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async updateNotification(req: Request, res: Response): Promise<Response> {
    try {
      const updatedNotification =
        await this.notificationService.updateNotification(
          req.params.id,
          req.body
        );
      return res.status(200).json(updatedNotification);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async deleteNotification(req: Request, res: Response): Promise<Response> {
    try {
      await this.notificationService.deleteNotification(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
