import pino, { transport } from "pino";
import PinoHttp from "pino-http";

const logger = pino({
  level: "info",
  base: { serviceName: "ORE Hub" },
  serializers: pino.stdSerializers,
  timestamp: () => `,"time": "${new Date(Date.now()).toISOString()}"`,
  transport: {
    target: "pino-pretty",
    level: "error",
  },
});

export const httpLogger = PinoHttp({
  level: "error",
  logger,
});

export default logger;
