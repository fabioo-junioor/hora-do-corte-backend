import { createLogger, format, transports } from 'winston';

const { timestamp, combine, printf, colorize } = format;

const devFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp, ...meta }) => {
        let context = meta.context ? JSON.stringify(meta.context, null, 2) : '';
        return !!context ?
            `{"timestamp":"${timestamp}","level":"${level}","message":"${message}","context":${context}}` :
            `{"timestamp":"${timestamp}","level":"${level}","message":"${message}","context":"--"}`;

    })
);
const logger = createLogger({
    level: 'debug',
    format: devFormat,
    transports: [
        new transports.Console()
    ]
});

export default logger;