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
 * /api/notification:
 *   get:
 *     summary: Retorna todos os notificações
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Lista de todos os notificações
 *       500:
 *         description: Erro ao obter notificações
 */
router.get("/", async (req: Request, res: Response) => {
  await notificationController.getAllNotifications(req, res);
});

/**
 * @swagger
 * /api/notification/{id}:
 *   get:
 *     summary: Retorna um notification pelo ID
 *     tags: [Notifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do notification
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification encontrado
 *       404:
 *         description: Notification não encontrado
 *       500:
 *         description: Erro ao obter notification
 */
router.get("/:id", async (req: Request, res: Response) => {
  await notificationController.getNotificationById(req, res);
});

/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Cria um novo notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specieId:
 *                 type: integer
 *               breed:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: Notification criado com sucesso
 *       500:
 *         description: Erro ao criar notification
 */
router.post("/", async (req: Request, res: Response) => {
  await notificationController.createNotification(req, res);
});

/**
 * @swagger
 * /api/notification/{id}:
 *   put:
 *     summary: Atualiza um notification pelo ID
 *     tags: [Notifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do notification
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specieId:
 *                 type: integer
 *               breed:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Notification atualizado com sucesso
 *       404:
 *         description: Notification não encontrado
 *       500:
 *         description: Erro ao atualizar notification
 */
router.put("/:id", async (req: Request, res: Response) => {
  await notificationController.updateNotification(req, res);
});

/**
 * @swagger
 * /api/notification/{id}:
 *   delete:
 *     summary: Remove um notification pelo ID
 *     tags: [Notifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do notification
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Notification removido com sucesso
 *       404:
 *         description: Notification não encontrado
 *       500:
 *         description: Erro ao remover notification
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await notificationController.deleteNotification(req, res);
});

export default router;
