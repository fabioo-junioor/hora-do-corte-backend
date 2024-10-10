import { Router } from 'express';
const router = Router();

import routerUser from './routes.user.js';
import routerProfessional from './routes.professional.js';

router.use('/user', routerUser);
router.use('/professional', routerProfessional);

export default router;