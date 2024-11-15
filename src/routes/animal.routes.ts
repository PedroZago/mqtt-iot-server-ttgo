import { Router, Request, Response } from "express";
import { AnimalController } from "../controllers/animal.controller";

const router = Router();
const animalController = new AnimalController();

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: Gerenciamento de animais
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *         name:
 *           type: string
 *           example: "Bessie"
 *         specieId:
 *           type: string
 *           format: uuid
 *           example: "7b1f46be-9f2b-4a3e-b3a1-90bf7e5a8968"
 *         breedId:
 *           type: string
 *           format: uuid
 *           example: "1c98e8c5-5a6d-4b3a-b5e2-83f9f5d3765f"
 *         sex:
 *           type: string
 *           enum: [MALE, FEMALE, OTHER]
 *           example: "female"
 *         birthDate:
 *           type: string
 *           format: date-time
 *           example: "2020-05-15T14:30:00Z"
 *         weight:
 *           type: number
 *           example: 350.5
 */

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Retorna todos os animais
 *     tags: [Animals]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os animais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Erro ao obter animais
 */
router.get("/", async (req: Request, res: Response) => {
  await animalController.getAllAnimals(req, res);
});

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Retorna um animal pelo ID
 *     tags: [Animals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do animal
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       200:
 *         description: Animal encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro ao obter animal
 */
router.get("/:id", async (req: Request, res: Response) => {
  await animalController.getAnimalById(req, res);
});

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Cria um novo animal
 *     tags: [Animals]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Erro ao criar animal
 */
router.post("/", async (req: Request, res: Response) => {
  await animalController.createAnimal(req, res);
});

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Atualiza um animal pelo ID
 *     tags: [Animals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do animal
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
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Animal atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro ao atualizar animal
 */
router.put("/:id", async (req: Request, res: Response) => {
  await animalController.updateAnimal(req, res);
});

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Remove um animal pelo ID
 *     tags: [Animals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do animal
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       204:
 *         description: Animal removido com sucesso
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro ao remover animal
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await animalController.deleteAnimal(req, res);
});

export default router;
