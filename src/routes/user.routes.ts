import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *         name:
 *           type: string
 *           example: "User One"
 *         email:
 *           type: string
 *           example: "user1@example.com"
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           example: "user"
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao obter usuários
 */
router.get("/", async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res);
});

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Retorna as informações do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado - Token inválido ou ausente
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter usuário
 */
router.get("/me", async (req: Request, res: Response) => {
  await userController.getMe(req, res);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do usuário
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter usuário
 */
router.get("/:id", async (req: Request, res: Response) => {
  await userController.getUserById(req, res);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao criar usuário
 */
router.post("/", async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do usuário
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
router.put("/:id", async (req: Request, res: Response) => {
  await userController.updateUser(req, res);
});

/**
 * @swagger
 * /api/users/update-password:
 *   patch:
 *     summary: Atualiza a senha do usuário
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Senha antiga do usuário
 *               newPassword:
 *                 type: string
 *                 description: Nova senha do usuário
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a senha
 */
router.patch("/update-password", async (req: Request, res: Response) => {
  await userController.updatePassword(req, res);
});

/**
 * @swagger
 * /api/users/update-role:
 *   patch:
 *     summary: Atualiza a função do usuário
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário
 *               newRole:
 *                 type: string
 *                 description: Nova função do usuário
 *     responses:
 *       200:
 *         description: Função do usuário atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a função do usuário
 */
router.patch("/update-role", async (req: Request, res: Response) => {
  await userController.updateUserRole(req, res);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: UUID do usuário
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "302f8f76-414f-48a0-be8d-d934e8635666"
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao remover usuário
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await userController.deleteUser(req, res);
});

export default router;
