import { Request, Response } from "express";
import Animal, { AnimalData } from "../models/AnimalModel";
import { logger } from "../config/logger";

export const createAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { birthDate, breed, name, specieId, weight } = req.body as AnimalData;

  if (!birthDate || !breed || !name || !specieId || !weight) {
    res.status(400).send({ message: "Dados de animal inválidos." });
    return;
  }

  try {
    const animal = await Animal.create({
      birthDate,
      breed,
      name,
      specieId,
      weight,
    });

    res.status(201).send({ message: "Animal criado com sucesso.", animal });
  } catch (error) {
    logger.error(
      `Erro ao criar animal: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao criar animal." });
  }
};

export const getAnimals = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { topic } = req.query as { topic: string };

  const query = topic ? { where: { topic } } : {};

  try {
    const animals = await Animal.findAll({
      ...query,
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res.status(200).send({ message: "Animais obtidos com sucesso.", animals });
  } catch (error) {
    logger.error(
      `Erro ao obter animal: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter animais." });
  }
};

export const getAnimalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const animal = await Animal.findByPk(id);

    if (!animal) {
      res.status(404).send({ message: "Animal não encontrado." });
      return;
    }

    res
      .status(200)
      .send({ message: "Animal obtido por ID com sucesso.", animal });
  } catch (error) {
    logger.error(
      `Erro ao obter animal por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao obter animal por ID." });
  }
};

export const deleteAnimalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await Animal.destroy({ where: { id } });

    if (!result) {
      res.status(404).send({ message: "Animal não encontrado." });
      return;
    }

    res.status(204).send({ message: "Animal deletado com sucesso." });
  } catch (error) {
    logger.error(
      `Erro ao deletar animal por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao deletar animal por ID." });
  }
};

export const updateAnimalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const animal = req.body as AnimalData;

  try {
    const [updated] = await Animal.update(animal, { where: { id } });

    if (!updated) {
      res.status(404).send({ message: "Animal não encontrado." });
      return;
    }

    const updatedAnimal = await Animal.findByPk(id);

    res
      .status(200)
      .send({ message: "Animal atualizado com sucesso.", updatedAnimal });
  } catch (error) {
    logger.error(
      `Erro ao atualizar animal por ID: ${
        error instanceof Error ? error.message : "Um erro desconhecido ocorreu"
      }`
    );
    res.status(400).send({ message: "Erro ao atualizar animal por ID." });
  }
};
