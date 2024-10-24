import { Request, Response } from "express";
import Device, { DeviceData } from "../models/DeviceModel";
import { logger } from "../config/logger";

export const createDevice = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { battery_level, serialNumber, status, type } = req.body as DeviceData;

  if (!battery_level || !type || !status || !serialNumber) {
    res.status(400).send({ message: "Dados de dispositivo inválidos." });
    return;
  }

  try {
    const device = await Device.create({
      battery_level,
      serialNumber,
      status,
      type,
    });

    res
      .status(201)
      .send({ message: "Dispositivo criado com sucesso.", device });
  } catch (error) {
    logger.error(
      `Erro ao criar dispositivo: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao criar dispositivo." });
  }
};

export const getDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { ownerId } = req.query as { ownerId: string };

  const query = ownerId ? { where: { ownerId } } : {};

  try {
    const devices = await Device.findAll({
      ...query,
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res
      .status(200)
      .send({ message: "Dispositivos obtidos com sucesso.", devices });
  } catch (error) {
    logger.error(
      `Erro ao obter dispositivos: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter dispositivos." });
  }
};

export const getDeviceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const device = await Device.findByPk(id);

    if (!device) {
      res.status(404).send({ message: "Dispositivo não encontrado." });
      return;
    }

    res
      .status(200)
      .send({ message: "Dispositivo obtido por ID com sucesso.", device });
  } catch (error) {
    logger.error(
      `Erro ao obter dispositivo por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter dispositivo por ID." });
  }
};

export const deleteDeviceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await Device.destroy({ where: { id } });

    if (!result) {
      res.status(404).send({ message: "Dispositivo não encontrado." });
      return;
    }

    res.status(204).send({ message: "Dispositivo deletado com sucesso." });
  } catch (error) {
    logger.error(
      `Erro ao deletar dispositivo por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao deletar dispositivo por ID." });
  }
};

export const updateDeviceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const device = req.body as DeviceData;

  try {
    const [updated] = await Device.update(device, { where: { id } });

    if (!updated) {
      res.status(404).send({ message: "Dispositivo não encontrado." });
      return;
    }

    const updatedDevice = await Device.findByPk(id);

    res
      .status(200)
      .send({ message: "Dispositivo atualizado com sucesso.", updatedDevice });
  } catch (error) {
    logger.error(
      `Erro ao atualizar dispositivo por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao atualizar dispositivo por ID." });
  }
};
