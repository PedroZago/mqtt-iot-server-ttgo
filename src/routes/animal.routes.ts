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
 * /api/animal:
 *   get:
 *     summary: Retorna todos os animais
 *     tags: [Animals]
 *     responses:
 *       200:
 *         description: Lista de todos os animais
 *       500:
 *         description: Erro ao obter animais
 */
router.get("/", async (req: Request, res: Response) => {
  await animalController.getAllAnimals(req, res);
});

/**
 * @swagger
 * /api/animal/{id}:
 *   get:
 *     summary: Retorna um animal pelo ID
 *     tags: [Animals]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do animal
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Animal encontrado
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
 * /api/animal:
 *   post:
 *     summary: Cria um novo animal
 *     tags: [Animals]
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
 *         description: Animal criado com sucesso
 *       500:
 *         description: Erro ao criar animal
 */
router.post("/", async (req: Request, res: Response) => {
  await animalController.createAnimal(req, res);
});

/**
 * @swagger
 * /api/animal/{id}:
 *   put:
 *     summary: Atualiza um animal pelo ID
 *     tags: [Animals]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do animal
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
 *         description: Animal atualizado com sucesso
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
 * /api/animal/{id}:
 *   delete:
 *     summary: Remove um animal pelo ID
 *     tags: [Animals]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do animal
 *         required: true
 *         schema:
 *           type: integer
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
