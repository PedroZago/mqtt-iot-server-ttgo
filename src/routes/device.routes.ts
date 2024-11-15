import { Router, Request, Response } from "express";
import { DeviceController } from "../controllers/device.controller";

const router = Router();
const deviceController = new DeviceController();

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Gerenciamento de dispositivos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *         serialNumber:
 *           type: string
 *           example: "GW-001"
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, MAINTENANCE]
 *           example: "active"
 *         model:
 *           type: string
 *           example: "T-Beam V1.1"
 *         batteryLevel:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           example: 85
 *         type:
 *           type: string
 *           enum: [NODE, GATEWAY]
 *           example: "gateway"
 *         gatewayId:
 *           type: string
 *           format: uuid
 *           example: "e01223e5-73b5-4e23-98dd-a47cfcdce512"
 *         animalId:
 *           type: string
 *           format: uuid
 *           example: "1936f535-11f7-4592-8689-fe86a7c7e208"
 *         activationDate:
 *           type: string
 *           format: date-time
 *           example: "2024-11-13T14:30:00Z"
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Retorna todos os dispositivos
 *     tags: [Devices]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 *       500:
 *         description: Erro ao obter dispositivos
 */
router.get("/", async (req: Request, res: Response) => {
  await deviceController.getAllDevices(req, res);
});

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Retorna um dispositivo pelo ID
 *     tags: [Devices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do dispositivo
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo não encontrado
 *       500:
 *         description: Erro ao obter dispositivo
 */
router.get("/:id", async (req: Request, res: Response) => {
  await deviceController.getDeviceById(req, res);
});

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Cria um novo dispositivo
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Dispositivo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       500:
 *         description: Erro ao criar dispositivo
 */
router.post("/", async (req: Request, res: Response) => {
  await deviceController.createDevice(req, res);
});

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Atualiza um dispositivo pelo ID
 *     tags: [Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do dispositivo
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
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Dispositivo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo não encontrado
 *       500:
 *         description: Erro ao atualizar dispositivo
 */
router.put("/:id", async (req: Request, res: Response) => {
  await deviceController.updateDevice(req, res);
});

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Remove um dispositivo pelo ID
 *     tags: [Devices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do dispositivo
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       204:
 *         description: Dispositivo removido com sucesso
 *       404:
 *         description: Dispositivo não encontrado
 *       500:
 *         description: Erro ao remover dispositivo
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await deviceController.deleteDevice(req, res);
});

export default router;
