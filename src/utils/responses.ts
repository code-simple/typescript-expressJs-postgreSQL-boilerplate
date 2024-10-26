import httpStatus from "http-status-codes";
import { Response } from "express";

export function sendSuccessResponse(res: Response, data: any) {
  res.status(httpStatus.OK).json({
    status: "success",
    data,
  });
}
