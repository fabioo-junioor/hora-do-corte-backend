import { Router } from 'express';
const routerUser = Router();

import userController from '../controllers/user.controller.js';

// Routes user
routerUser.post('/login', userController.loginUserController);
routerUser.post('/create', userController.createUserController);
routerUser.put('/:pk/update', userController.updateUserController);
routerUser.delete('/:pk/delete', userController.deleteUserController);

export default routerUser;