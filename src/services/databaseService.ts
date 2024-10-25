import sequelize from "../config/database";
import { Server } from "http";

const checkDatabaseConnection = async (
  server: Server,
  callback: () => void
) => {
  try {
    await sequelize.authenticate(); // Attempt to connect to the database
    callback(); // Execute the callback if successful
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    server.close(() => {
      console.log("Server closed due to database connection error");
      process.exit(1); // Exit the process with an error code
    });
  }
};

export default checkDatabaseConnection;
