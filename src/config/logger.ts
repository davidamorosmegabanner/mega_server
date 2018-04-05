import {Logger, LoggerInstance, LoggerOptions, transports} from "winston";
import "winston-daily-rotate-file";

export const logger: LoggerInstance = new Logger({
    exitOnError: false,
    transports: [
        new transports.DailyRotateFile({
            filename: "log/log-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
        }),
        new transports.Console({ level: "info" }),
    ],
} as LoggerOptions);

export class Stream {
    public static write(message: string) {
        logger.info(message);
    }
}
