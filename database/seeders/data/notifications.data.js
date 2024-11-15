const users = require("./users.data");

const notifications = {
  Welcome: {
    id: "b1c8a3d7-52d1-4d4d-9a71-bda2f8f5cb52",
    title: "Bem-vindo!",
    message: "Seja bem-vindo à nossa plataforma!",
    dateTime: new Date(),
    userId: users.User1.id,
    read: false,
  },
  DataUpdate: {
    id: "e9b4f92d-b36c-456a-9fa4-345f7b68266f",
    title: "Atualização de Dados",
    message: "Seus dados foram atualizados com sucesso.",
    dateTime: new Date(),
    userId: users.User2.id,
    read: true,
  },
  NewMessage: {
    id: "6e06f3f1-7367-4fa1-bd4a-3b6c804f6d5f",
    title: "Nova Mensagem",
    message: "Você recebeu uma nova mensagem.",
    dateTime: new Date(),
    userId: users.Admin1.id,
    read: false,
  },
  SecurityAlert: {
    id: "c9d10fbe-2071-4600-b631-41e978b2cde9",
    title: "Alerta de Segurança",
    message: "Detectamos um novo login na sua conta.",
    dateTime: new Date(),
    userId: users.Admin2.id,
    read: false,
  },
};

module.exports = notifications;
