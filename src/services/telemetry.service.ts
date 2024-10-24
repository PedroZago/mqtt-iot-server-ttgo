import { Request, Response } from "express";
import Telemetry, { TelemetryData } from "../models/TelemetryModel";
import { logger } from "../config/logger";

export const createTelemetry = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { topic, message, deviceId } = req.body as TelemetryData;

  if (!topic || !message || typeof message !== "object" || !deviceId) {
    res.status(400).send({
      message:
        "Dados de telemetria inválidos. O tópico, a mensagem e o deviceId devem ser fornecidos, e a mensagem deve ser um objeto JSON.",
    });
    return;
  }

  try {
    const telemetry = await Telemetry.create({
      topic,
      message,
      deviceId,
    });

    res
      .status(201)
      .send({ message: "Telemetria criada com sucesso.", telemetry });
  } catch (error) {
    logger.error(
      `Erro ao criar telemetria: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao criar telemetria." });
  }
};

export const getTelemetries = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { topic } = req.query as { topic: string };

  const query = topic ? { where: { topic } } : {};

  try {
    const telemetries = await Telemetry.findAll({
      ...query,
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res
      .status(200)
      .send({ message: "Telemetrias obtidas com sucesso.", telemetries });
  } catch (error) {
    logger.error(
      `Erro ao obter telemetria: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter telemetrias." });
  }
};

export const getTelemetryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const telemetry = await Telemetry.findByPk(id);

    if (!telemetry) {
      res.status(404).send({ message: "Telemetria não encontrada." });
      return;
    }

    res
      .status(200)
      .send({ message: "Telemetria obtida por ID com sucesso.", telemetry });
  } catch (error) {
    logger.error(
      `Erro ao obter telemetria por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter telemetria por ID." });
  }
};

export const deleteTelemetryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await Telemetry.destroy({ where: { id } });

    if (!result) {
      res.status(404).send({ message: "Telemetria não encontrado." });
      return;
    }

    res.status(204).send({ message: "Telemetria deletada com sucesso." });
  } catch (error) {
    logger.error(
      `Erro ao deletar telemetria por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao deletar telemetria por ID." });
  }
};

export const updateTelemetryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const telemetry = req.body as TelemetryData;

  try {
    const [updated] = await Telemetry.update(telemetry, { where: { id } });

    if (!updated) {
      res.status(404).send({ message: "Telemetria não encontrada." });
      return;
    }

    const updatedTelemetry = await Telemetry.findByPk(id);

    res
      .status(200)
      .send({ message: "Telemetria deletada com sucesso.", updatedTelemetry });
  } catch (error) {
    logger.error(
      `Erro ao atualizar telemetria por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao atualizar telemetria por ID." });
  }
};
