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
 * /api/users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
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
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário
 *                 role:
 *                   type: string
 *                   description: Cargo ou papel do usuário
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
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
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
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
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
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
 *         required: true
 *         schema:
 *           type: integer
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
