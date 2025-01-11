import { createLogger, transports, format } from "winston";
import morgan from "morgan";

// Initialize Winston logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({
      filename: "combined.log", // Specify log file path
      level: "info", // Log level
    }),
  ],
});

// Custom Morgan middleware
morgan.token("response-time", (req, res) => {
  return `${res.getHeaders()["x-response-time"] || "0"} ms`;
});

const morganMiddleware = morgan(":method :url :status :response-time ms", {
  stream: {
    write: (message) => {
      // Log message via Winston
      logger.info(message.trim());
    },
  },
});

export { logger, morganMiddleware };
