import { Router } from 'express';
const routerAuth = Router();
import { checkUserStatus } from '../core/auth/auth.jwt.js';

import authController from '../controllers/auth.controller.js';

// Routes user
routerAuth.get('/authUser', checkUserStatus);
routerAuth.post('/login', authController.loginAuthController);

export default routerAuth;