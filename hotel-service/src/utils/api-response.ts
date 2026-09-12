import type { Response } from "express";

type SuccessPayload<T> = {
  success: true;
  data: T;
  message?: string;
};

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, message?: string) {
  const payload: SuccessPayload<T> = {
    success: true,
    data,
  };

  if (message) {
    payload.message = message;
  }

  res.status(statusCode).json(payload);
}
