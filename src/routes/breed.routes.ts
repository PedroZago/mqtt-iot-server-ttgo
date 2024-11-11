import { Router, Request, Response } from "express";
import { BreedController } from "../controllers/breed.controller";

const router = Router();
const breedController = new BreedController();

/**
 * @swagger
 * tags:
 *   name: Breeds
 *   description: Gerenciamento de raças
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Breed:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *         name:
 *           type: string
 *           example: "Nelore"
 *         description:
 *           type: string
 *           example: "Raça de gado bovino originária da Índia"
 */

/**
 * @swagger
 * /api/breeds:
 *   get:
 *     summary: Retorna todas as raças
 *     tags: [Breeds]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as raças
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Breed'
 *       500:
 *         description: Erro ao obter raças
 */
router.get("/", async (req: Request, res: Response) => {
  await breedController.getAllBreeds(req, res);
});

/**
 * @swagger
 * /api/breeds/{id}:
 *   get:
 *     summary: Retorna uma raça pelo ID
 *     tags: [Breeds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da raça
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       200:
 *         description: Raça encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breed'
 *       404:
 *         description: Raça não encontrada
 *       500:
 *         description: Erro ao obter raça
 */
router.get("/:id", async (req: Request, res: Response) => {
  await breedController.getBreedById(req, res);
});

/**
 * @swagger
 * /api/breeds:
 *   post:
 *     summary: Cria uma nova raça
 *     tags: [Breeds]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Breed'
 *     responses:
 *       201:
 *         description: Raça criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breed'
 *       500:
 *         description: Erro ao criar raça
 */
router.post("/", async (req: Request, res: Response) => {
  await breedController.createBreed(req, res);
});

/**
 * @swagger
 * /api/breeds/{id}:
 *   put:
 *     summary: Atualiza uma raça pelo ID
 *     tags: [Breeds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da raça
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
 *             $ref: '#/components/schemas/Breed'
 *     responses:
 *       200:
 *         description: Raça atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breed'
 *       404:
 *         description: Raça não encontrada
 *       500:
 *         description: Erro ao atualizar raça
 */
router.put("/:id", async (req: Request, res: Response) => {
  await breedController.updateBreed(req, res);
});

/**
 * @swagger
 * /api/breeds/{id}:
 *   delete:
 *     summary: Remove uma raça pelo ID
 *     tags: [Breeds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da raça
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       204:
 *         description: Raça removida com sucesso
 *       404:
 *         description: Raça não encontrada
 *       500:
 *         description: Erro ao remover raça
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await breedController.deleteBreed(req, res);
});

export default router;
