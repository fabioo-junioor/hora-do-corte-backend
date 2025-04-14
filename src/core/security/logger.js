import { createLogger, format, transports } from 'winston';
import path from 'path';

const { timestamp, combine, printf, colorize } = format;

const isProduction = process.env.LOGGER_MODE === 'production';
console.log(isProduction)
const devFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp, ...meta }) => {
        let context = meta.context ? JSON.stringify(meta.context, null, 2) : '';
        return `[${timestamp}] [${level}] ${message} ${context}`;

    })
);
const prodFormat = format.combine(
    format.timestamp(),
    format.json()

);

const logger = createLogger({
    level: 'info',
    format: isProduction ? prodFormat : devFormat,
    transports: [
        new transports.Console(),
        ...(isProduction ? [new transports.File({ filename: path.resolve('logs/user.logs.log') })] : [])
    ]
});

export default logger;