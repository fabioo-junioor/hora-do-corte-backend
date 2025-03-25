import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { limiter } from './core/security/performance.js';
import routes from './routes/index.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(routes);

export default app;