import {
  Attributes,
  FindOptions,
  Model,
  ModelStatic,
  WhereOptions,
} from "sequelize";
import { AppError } from "./AppError";
import {
  ReasonPhrases,
  StatusCodes as httpStatusCode,
} from "http-status-codes";

const updateRecordById = async (
  model: ModelStatic<Model>,
  recordId: number,
  updateBody: object
) => {
  const [updatedCount, updatedRows] = await model.update(updateBody, {
    where: { id: recordId },
    returning: true,
  });

  if (updatedCount === 0) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  const result = updatedRows[0];

  return result.dataValues;
};

const getAllRecords = async (
  model: ModelStatic<Model>,
  options: FindOptions = {}
) => {
  const records = await model.findAll(options);

  return records;
};

const deleteRecordById = async (
  model: ModelStatic<Model>,
  recordId: number
) => {
  const deletedCount = await model.destroy({
    where: { id: recordId },
  });

  if (deletedCount === 0) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  return { message: "Record deleted successfully" };
};

const getRecordById = async (
  model: ModelStatic<Model>,
  recordId: number,
  options: FindOptions = {}
) => {
  const record = await model.findByPk(recordId, options);

  if (!record) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatusCode.NOT_FOUND);
  }

  return record;
};

const findRecordsByCondition = async (
  model: ModelStatic<Model>,
  condition: WhereOptions, // Use WhereOptions for correct typing
  options: FindOptions = {}
) => {
  const records = await model.findAll({
    where: condition,
    ...options,
  });

  return records;
};

const createRecord = async (
  model: ModelStatic<Model>,
  data: Attributes<Model>
) => {
  const record = await model.create(data);

  return record;
};

const countRecords = async (
  model: ModelStatic<Model>,
  condition: WhereOptions = {}
) => {
  const count = await model.count({
    where: condition,
  });

  return count;
};

// Consolidated exports at the bottom
export {
  updateRecordById,
  getAllRecords,
  deleteRecordById,
  getRecordById,
  findRecordsByCondition,
  createRecord,
  countRecords,
};
