import sequelize from "../config/database";
import { Server } from "http";
import associateModels from "../models/associations";
import logger from "../config/logger";

const checkDatabaseConnection = async (
  server: Server,
  callback: () => void
) => {
  try {
    await sequelize.authenticate(); // Attempt to connect to the database

    associateModels();

    // Sync the database to create or update tables based on models
    /**
     *  INFO: With { alter: true } you dont have to do migrations.
     *  Its pretty handy when there are multiple models added so then you dont have to do migration for each model,
     *  it also takes out takes out the opiton of Rollbacking migration because you cant migrate anymore
     */
    await sequelize.sync({ alter: true });
    // await sequelize.sync();
    callback();

    // Execute the callback if successful
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    server.close(() => {
      logger.error("Server closed due to database connection error");
      process.exit(1); // Exit the process with an error code
    });
  }
};

export default checkDatabaseConnection;
