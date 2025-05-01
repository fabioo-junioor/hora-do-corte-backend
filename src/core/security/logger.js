import { createLogger, format, transports } from 'winston';
import { getTimeZone } from '../../helpers/global.helper.js';

const { combine, printf, colorize } = format;


const devFormat = format.combine(
    format.colorize(),
    //format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp, ...meta }) => {
        let context = meta.context ? JSON.stringify(meta.context, null, 2) : '';
        let status = meta.status ? JSON.stringify(meta.status) : '';
        return !!context ?
            `{"timestamp":"${getTimeZone()}","level":"${level}","message":"${message}","status":${status},"context":${context}}` :
            `{"timestamp":"${getTimeZone()}","level":"${level}","message":"${message}","status":${status},"context":"--"}`;

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