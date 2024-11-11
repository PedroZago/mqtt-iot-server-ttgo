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
 * /api/devices:
 *   get:
 *     summary: Retorna todos os dispositivos
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Lista de todos os dispositivos
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
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do dispositivo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               specs:
 *                 type: object
 *     responses:
 *       201:
 *         description: Dispositivo criado com sucesso
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
 *         description: ID do dispositivo
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
 *               type:
 *                 type: string
 *               specs:
 *                 type: object
 *     responses:
 *       200:
 *         description: Dispositivo atualizado com sucesso
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
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do dispositivo
 *         required: true
 *         schema:
 *           type: integer
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
