import { Router } from 'express';
const router = Router();

import routerUser from './routes.user.js';

router.use('/user', routerUser);

export default router;