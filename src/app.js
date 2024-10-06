import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routes);

export default app;