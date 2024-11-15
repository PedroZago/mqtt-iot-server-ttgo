import { Router, Request, Response } from "express";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();
const notificationController = new NotificationController();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Gerenciamento de notificações
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *         title:
 *           type: string
 *           example: "Bem-vindo!"
 *         message:
 *           type: string
 *           example: "Seja bem-vindo à nossa plataforma!"
 *         dateTime:
 *           type: string
 *           example: "Seja bem-vindo à nossa plataforma!"
 *         userId:
 *           type: string
 *           format: uuid
 *           example: "1c98e8c5-5a6d-4b3a-b5e2-83f9f5d3765f"
 *         read:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Retorna todas as notificações
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as notificações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Erro ao obter notificações
 */
router.get("/", async (req: Request, res: Response) => {
  await notificationController.getAllNotifications(req, res);
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Retorna uma notificação pelo ID
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da notificação
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       200:
 *         description: Notificação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro ao obter notificação
 */
router.get("/:id", async (req: Request, res: Response) => {
  await notificationController.getNotificationById(req, res);
});

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Cria uma nova notificação
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notificação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Erro ao criar notificação
 */
router.post("/", async (req: Request, res: Response) => {
  await notificationController.createNotification(req, res);
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Atualiza uma notificação pelo ID
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da notificação
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notificação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro ao atualizar notificação
 */
router.put("/:id", async (req: Request, res: Response) => {
  await notificationController.updateNotification(req, res);
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Remove uma notificação pelo ID
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da notificação
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       204:
 *         description: Notificação removida com sucesso
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro ao remover notificação
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await notificationController.deleteNotification(req, res);
});

export default router;
