import { QueryTypes } from "sequelize";
import sequelize from "../models";
import { AppError } from "../utils/AppError";
import httpStatus, { ReasonPhrases } from "http-status-codes";

export async function getQuery(query: string) {
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  if (!result) {
    throw new AppError(ReasonPhrases.NOT_FOUND, httpStatus.NOT_FOUND);
  }
  return result;
}
