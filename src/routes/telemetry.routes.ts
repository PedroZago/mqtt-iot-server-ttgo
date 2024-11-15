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
 * components:
 *   schemas:
 *     Telemetry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         topic:
 *           type: string
 *           example: "device/telemetry"
 *         message:
 *           type: object
 *           properties:
 *             temperature:
 *               type: number
 *               example: 37.5
 *             heartRate:
 *               type: number
 *               example: 80
 *             behavior:
 *               type: string
 *               example: "Comportamento normal"
 *             latitude:
 *               type: number
 *               format: float
 *               example: -23.55052
 *             longitude:
 *               type: number
 *               format: float
 *               example: -46.633308
 *             altitude:
 *               type: number
 *               format: float
 *               example: 500
 *             speed:
 *               type: number
 *               example: 10
 *         deviceId:
 *           type: string
 *           format: uuid
 *           example: "987e6543-e21b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /api/telemetries:
 *   get:
 *     summary: Retorna todas as telemetrias
 *     tags: [Telemetries]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as telemetrias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Telemetry'
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
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da telemetria
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Telemetria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Telemetry'
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
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Telemetry'
 *     responses:
 *       201:
 *         description: Telemetria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Telemetry'
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
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da telemetria
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Telemetry'
 *     responses:
 *       200:
 *         description: Telemetria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Telemetry'
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
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da telemetria
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
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
