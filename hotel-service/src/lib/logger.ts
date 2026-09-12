import winston from "winston";
import { asyncLocalStorage } from "./async-context.js";

const isDevelopment = process.env.NODE_ENV !== "production";

const correlationIdFormat = winston.format((info) => {
  const context = asyncLocalStorage.getStore();

  if (context?.correlationId) {
    info.correlationId = context.correlationId;
  }

  return info;
});

const developmentFormat = winston.format.combine(
  correlationIdFormat(),
  winston.format.colorize(),
  winston.format.timestamp({
    format: "HH:mm:ss",
  }),
  winston.format.printf((info) => {
    const correlationId = info.correlationId ? ` [${info.correlationId}]` : "";
    return `${info.timestamp} ${info.level}${correlationId}: ${info.message}`;
  }),
);

const productionFormat = winston.format.combine(
  correlationIdFormat(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: isDevelopment ? developmentFormat : productionFormat,
  defaultMeta: { service: "hotel-service" },
  transports: [
    new winston.transports.Console(),
    ...(isDevelopment
      ? []
      : [
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
          new winston.transports.File({
            filename: "logs/combined.log",
          }),
        ]),
  ],
});
