import { Router } from 'express';
const routerUser = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import userController from '../controllers/user.controller.js';

// Routes user
routerUser.post('/create', userController.createUserController);
routerUser.put('/:pk/update', verifyToken, userController.updateUserController);
routerUser.delete('/:pk/delete', verifyToken, userController.deleteUserController);
routerUser.post('/recoverPassUser', userController.recoverPassUser);

export default routerUser;