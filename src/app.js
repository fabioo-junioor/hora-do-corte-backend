import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';
import { limiter } from './core/security/performance.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(limiter);

export default app;