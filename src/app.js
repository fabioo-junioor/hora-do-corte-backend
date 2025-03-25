import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';
import rateLimit from 'express-rate-limit';

const app = express();
const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15min!
        max: 50, // Limite de 50 req por IP!
        message: 'Muitas requisições deste IP, tente novamente mais tarde.'
    
});

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(limiter);

export default app;