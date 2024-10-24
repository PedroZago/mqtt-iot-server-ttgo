import { Request, Response } from "express";
import Specie, { SpecieData } from "../models/SpecieModel";
import { logger } from "../config/logger";

export const createSpecie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description } = req.body as SpecieData;

  if (!name || !description) {
    res.status(400).send({ message: "Dados de espécie inválidos." });
    return;
  }

  try {
    const specie = await Specie.create({
      name,
      description,
    });

    res.status(201).send({ message: "Espécie criada com sucesso.", specie });
  } catch (error) {
    logger.error(
      `Erro ao criar espécie: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao criar espécie." });
  }
};

export const getSpecies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.query as { name: string };

  const query = name ? { where: { name } } : {};

  try {
    const species = await Specie.findAll({
      ...query,
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res.status(200).send({ message: "Espécies obtidas com sucesso.", species });
  } catch (error) {
    logger.error(
      `Erro ao obter espécies: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter espécies." });
  }
};

export const getSpecieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const specie = await Specie.findByPk(id);

    if (!specie) {
      res.status(404).send({ message: "Espécie não encontrada." });
      return;
    }

    res
      .status(200)
      .send({ message: "Espécie obtida por ID com sucesso.", specie });
  } catch (error) {
    logger.error(
      `Erro ao obter espécie por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter espécie por ID." });
  }
};

export const deleteSpecieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await Specie.destroy({ where: { id } });

    if (!result) {
      res.status(404).send({ message: "Espécie não encontrada." });
      return;
    }

    res.status(204).send({ message: "Espécie deletada com sucesso." });
  } catch (error) {
    logger.error(
      `Erro ao deletar espécie por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao deletar espécie por ID." });
  }
};

export const updateSpecieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const specie = req.body as SpecieData;

  try {
    const [updated] = await Specie.update(specie, { where: { id } });

    if (!updated) {
      res.status(404).send({ message: "Espécie não encontrada." });
      return;
    }

    const updatedSpecie = await Specie.findByPk(id);

    res
      .status(200)
      .send({ message: "Espécie atualizada com sucesso.", updatedSpecie });
  } catch (error) {
    logger.error(
      `Erro ao atualizar espécie por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao atualizar espécie por ID." });
  }
};
