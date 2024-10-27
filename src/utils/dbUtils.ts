import { FindOptions, Model, ModelStatic } from "sequelize";
import { AppError } from "./AppError";
import {
  ReasonPhrases,
  StatusCodes as httpStatusCode,
} from "http-status-codes";

export const updateRecordById = async (
  model: ModelStatic<Model>, // Correct typing for the model
  recordId: number,
  updateBody: object
) => {
  // Fetch the record by ID
  const [updatedCount, updatedRows] = await model.update(updateBody, {
    where: { id: recordId },
    returning: true, // Optional: returns the updated rows
  });

  if (updatedCount === 0) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  // Return the first updated record
  const result = updatedRows[0];

  return result.dataValues;
};

export const getAllRecords = async (
  model: ModelStatic<Model>,
  options: FindOptions = {}
) => {
  const records = await model.findAll(options);

  return records;
};
