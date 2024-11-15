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
 * components:
 *   schemas:
 *     Specie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Bovino"
 *         description:
 *           type: string
 *           example: "Espécie de mamífero domesticado para produção de carne e leite"
 */

/**
 * @swagger
 * /api/species:
 *   get:
 *     summary: Retorna todas as espécies
 *     tags: [Species]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as espécies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Specie'
 *       500:
 *         description: Erro ao obter espécies
 */
router.get("/", async (req: Request, res: Response) => {
  await specieController.getAllSpecies(req, res);
});

/**
 * @swagger
 * /api/species/{id}:
 *   get:
 *     summary: Retorna uma espécie pelo ID
 *     tags: [Species]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da espécie
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Espécie encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specie'
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
 * /api/species:
 *   post:
 *     summary: Cria uma nova espécie
 *     tags: [Species]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specie'
 *     responses:
 *       201:
 *         description: Espécie criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specie'
 *       500:
 *         description: Erro ao criar espécie
 */
router.post("/", async (req: Request, res: Response) => {
  await specieController.createSpecie(req, res);
});

/**
 * @swagger
 * /api/species/{id}:
 *   put:
 *     summary: Atualiza uma espécie pelo ID
 *     tags: [Species]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da espécie
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
 *             $ref: '#/components/schemas/Specie'
 *     responses:
 *       200:
 *         description: Espécie atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specie'
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
 * /api/species/{id}:
 *   delete:
 *     summary: Remove uma espécie pelo ID
 *     tags: [Species]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID da espécie
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
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
