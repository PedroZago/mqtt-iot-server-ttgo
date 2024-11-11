import { Router, Request, Response } from "express";
import { TelemetryController } from "../controllers/telemetry.controller";

const router = Router();
const telemetryController = new TelemetryController();

/**
 * @swagger
 * tags:
 *   name: Telemetries
 *   description: Gerenciamento de telemetrias
 */

/**
 * @swagger
 * /api/telemetries:
 *   get:
 *     summary: Retorna todas as telemetrias
 *     tags: [Telemetries]
 *     responses:
 *       200:
 *         description: Lista de todas as telemetrias
 *       500:
 *         description: Erro ao obter telemetrias
 */
router.get("/", async (req: Request, res: Response) => {
  await telemetryController.getAllTelemetries(req, res);
});

/**
 * @swagger
 * /api/telemetries/{id}:
 *   get:
 *     summary: Retorna uma telemetria pelo ID
 *     tags: [Telemetries]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da telemetria
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Telemetria encontrada
 *       404:
 *         description: Telemetria não encontrada
 *       500:
 *         description: Erro ao obter telemetria
 */
router.get("/:id", async (req: Request, res: Response) => {
  await telemetryController.getTelemetryById(req, res);
});

/**
 * @swagger
 * /api/telemetries:
 *   post:
 *     summary: Cria uma nova telemetria
 *     tags: [Telemetries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: integer
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Telemetria criada com sucesso
 *       500:
 *         description: Erro ao criar telemetria
 */
router.post("/", async (req: Request, res: Response) => {
  await telemetryController.createTelemetry(req, res);
});

/**
 * @swagger
 * /api/telemetries/{id}:
 *   put:
 *     summary: Atualiza uma telemetria pelo ID
 *     tags: [Telemetries]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da telemetria
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
 *               deviceId:
 *                 type: integer
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Telemetria atualizada com sucesso
 *       404:
 *         description: Telemetria não encontrada
 *       500:
 *         description: Erro ao atualizar telemetria
 */
router.put("/:id", async (req: Request, res: Response) => {
  await telemetryController.updateTelemetry(req, res);
});

/**
 * @swagger
 * /api/telemetries/{id}:
 *   delete:
 *     summary: Remove uma telemetria pelo ID
 *     tags: [Telemetries]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da telemetria
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Telemetria removida com sucesso
 *       404:
 *         description: Telemetria não encontrada
 *       500:
 *         description: Erro ao remover telemetria
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await telemetryController.deleteTelemetry(req, res);
});

export default router;
