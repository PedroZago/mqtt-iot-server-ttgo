import { Request, Response } from "express";
import { IotData, IIotData } from "../models/IotData";
import { logger } from "../config/logger";
import { mqttClient } from "../config/mqtt";

// export const createData = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const data = new IotData(req.body);
//     await data.save();
//     res.status(201).send(data);
//   } catch (error: unknown) {
//     res.status(400).send({
//       error: error instanceof Error ? error.message : "An error occurred",
//     });
//   }
// };

export const getStatus = async (_: Request, res: Response): Promise<void> => {
  res.json({ status: "Server is running" });
};

export const createData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { topic, message } = req.body as IIotData;

    if (!topic || !message || typeof message !== "object") {
      res.status(400).json({
        status: "error",
        message:
          "Dados inválidos. O tópico e a mensagem devem ser fornecidos, e a mensagem deve ser um objeto JSON.",
      });
      return;
    }

    const finalMessage = { ...message, clientId: process.env.CLIENT_ID };

    const payload = JSON.stringify(finalMessage);

    mqttClient.publish(topic, payload, async (err) => {
      if (err) {
        console.error("Erro ao publicar mensagem:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Falha ao publicar mensagem" });
      }

      console.log(`Mensagem publicada no tópico ${topic}:`, finalMessage);

      res.status(201).json({
        message: "Dado IoT publicado com sucesso.",
        payload: { topic, message },
      });
    });
  } catch (err: any) {
    console.error("Erro ao publicar dado IoT:", err);
    logger.error(`Erro ao publicar dado IoT: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// // Rota para obter dados IoT
// app.get("/dados-iot", authenticateJWT, async (req, res) => {
//   try {
//     const { topic } = req.query;

//     let query = {};
//     if (topic) {
//       query.topic = topic;
//     }

//     const dados = await IotData.find(query, { _id: 0 })
//       .sort({ timestamp: -1 })
//       .limit(100);
//     res.json(dados);
//   } catch (err) {
//     console.error("Erro ao obter dados IoT:", err);
//     logger.error(`Erro ao obter dados IoT: ${err.message}`);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Rota para obter um único dado IoT por ID
// app.get("/dados-iot/:id", authenticateJWT, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const dado = await IotData.findById(id);
//     if (!dado) {
//       return res.status(404).json({ message: "Dado não encontrado." });
//     }
//     res.json(dado);
//   } catch (err) {
//     console.error("Erro ao obter dado IoT:", err);
//     logger.error(`Erro ao obter dado IoT: ${err.message}`);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Rota para obter dados IoT em tempo real
// app.get("/dados-iot/tempo-real", authenticateJWT, (req, res) => {
//   res.json({ message: "Conectado ao stream de dados em tempo real." });
// });

// // Rota para deletar dado IoT por ID
// app.delete("/dados-iot/:id", authenticateJWT, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await IotData.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(404).json({ message: "Dado não encontrado." });
//     }
//     res.json({ message: "Dado deletado com sucesso." });
//   } catch (err) {
//     console.error("Erro ao deletar dado IoT:", err);
//     logger.error(`Erro ao deletar dado IoT: ${err.message}`);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Rota para atualizar dado IoT por ID
// app.put("/dados-iot/:id", authenticateJWT, async (req, res) => {
//   const { id } = req.params;
//   const { payload } = req.body;

//   try {
//     const result = await IotData.findByIdAndUpdate(
//       id,
//       { payload },
//       { new: true }
//     );
//     if (!result) {
//       return res.status(404).json({ message: "Dado não encontrado." });
//     }
//     res.json(result);
//   } catch (err) {
//     console.error("Erro ao atualizar dado IoT:", err);
//     logger.error(`Erro ao atualizar dado IoT: ${err.message}`);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });
