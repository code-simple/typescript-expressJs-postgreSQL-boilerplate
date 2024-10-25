import sequelize from "../config/database";

const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate(); // Attempt to connect to the database
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default checkDatabaseConnection;
