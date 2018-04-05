import {default as winston, Logger, LoggerInstance, LoggerOptions, transports} from "winston";

export const logger: LoggerInstance = new Logger({
    exitOnError: false,
    transports: [
        new transports.File({
            level: "info",
            filename: "./log/all-logs.log",
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
        }),
        new transports.Console({ level: "info" }),
    ],
} as LoggerOptions);

export class stream {
    public static write(message: string) {
        logger.info(message);
    }
}
