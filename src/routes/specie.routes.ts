import { Router, Request, Response } from "express";
import { SpecieController } from "../controllers/specie.controller";

const router = Router();
const specieController = new SpecieController();

/**
 * @swagger
 * tags:
 *   name: Species
 *   description: Gerenciamento de espécies
 */

/**
 * @swagger
 * /api/specie:
 *   get:
 *     summary: Retorna todas as espécies
 *     tags: [Species]
 *     responses:
 *       200:
 *         description: Lista de todas as espécies
 *       500:
 *         description: Erro ao obter espécies
 */
router.get("/", async (req: Request, res: Response) => {
  await specieController.getAllSpecies(req, res);
});

/**
 * @swagger
 * /api/specie/{id}:
 *   get:
 *     summary: Retorna uma espécie pelo ID
 *     tags: [Species]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da espécie
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Espécie encontrada
 *       404:
 *         description: Espécie não encontrada
 *       500:
 *         description: Erro ao obter espécie
 */
router.get("/:id", async (req: Request, res: Response) => {
  await specieController.getSpecieById(req, res);
});

/**
 * @swagger
 * /api/specie:
 *   post:
 *     summary: Cria uma nova espécie
 *     tags: [Species]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               habitat:
 *                 type: string
 *     responses:
 *       201:
 *         description: Espécie criada com sucesso
 *       500:
 *         description: Erro ao criar espécie
 */
router.post("/", async (req: Request, res: Response) => {
  await specieController.createSpecie(req, res);
});

/**
 * @swagger
 * /api/specie/{id}:
 *   put:
 *     summary: Atualiza uma espécie pelo ID
 *     tags: [Species]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da espécie
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
 *               habitat:
 *                 type: string
 *     responses:
 *       200:
 *         description: Espécie atualizada com sucesso
 *       404:
 *         description: Espécie não encontrada
 *       500:
 *         description: Erro ao atualizar espécie
 */
router.put("/:id", async (req: Request, res: Response) => {
  await specieController.updateSpecie(req, res);
});

/**
 * @swagger
 * /api/specie/{id}:
 *   delete:
 *     summary: Remove uma espécie pelo ID
 *     tags: [Species]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da espécie
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Espécie removida com sucesso
 *       404:
 *         description: Espécie não encontrada
 *       500:
 *         description: Erro ao remover espécie
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await specieController.deleteSpecie(req, res);
});

export default router;
