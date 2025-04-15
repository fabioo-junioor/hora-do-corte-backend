import { createLogger, format, transports } from 'winston';
import path from 'path';

const { timestamp, combine, printf, colorize } = format;

const isProduction = process.env.LOGGER_MODE === 'production';

const devFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp, ...meta }) => {
        let context = meta.context ? JSON.stringify(meta.context, null, 2) : '';
        return `[${timestamp}] [${level}] ${message} ${context}`;

    })
);
const prodFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp, ...meta }) => {
        let context = meta.context ? JSON.stringify(meta.context) : '';
        return !!context ?
            `{"timestamp":"${timestamp}","level":"${level}","message":"${message}","context":${context}}` :
            `{"timestamp":"${timestamp}","level":"${level}","message":"${message}","context":"--"}`

    })
);
const getLogger = (logName) => {
    const loggers = {};
    if(loggers[logName]){
        return loggers[logName];

    };

    const filePath = path.resolve(`src/logs/${logName}.logs.log`);
    const logger = createLogger({
        level: 'debug',
        format: isProduction ? prodFormat : devFormat,
        transports: [
            isProduction ?
                new transports.File({ filename: filePath }) :
                new transports.Console()
        ]
    });

    loggers[logName] = logger;
    return logger;

};

export default getLogger;