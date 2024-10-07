import { Router } from 'express';
const routerUser = Router();

import userController from '../controllers/user.controller.js';

routerUser.post('/login', userController.loginUser);
routerUser.post('/create', userController.createUser);

export default routerUser;