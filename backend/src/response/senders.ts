import { Response } from "express";
import { errorMessages } from "../global/errors";
import { TErrorCode } from "../global/types";

export function sendError(res: Response, code: TErrorCode, info?: Record<string, any>) {
  return res.status(code).json({
    success: false,
    message: errorMessages[code],
    ...info
  })
}

export function sendSuccess(res: Response, body: Record<string, any>) {
  return res.status(200).json({
    success: true,
    ...body
  })
}