import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido e token de acesso retornado
 *       400:
 *         description: Erro ao fazer login
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Desconecta um usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Desconectado com sucesso
 */
router.post("/logout", logout);

export default router;
