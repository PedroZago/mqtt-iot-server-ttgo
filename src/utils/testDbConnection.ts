import sequelize from "../config/database";
import { logger } from "../config/logger";

export async function testDbConnection() {
  try {
    await sequelize.authenticate();
    logger.info("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    logger.info("Não foi possível conectar ao banco de dados:", error);
  }
}
