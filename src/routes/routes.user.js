import { Router } from 'express';
const routerUser = Router();

import userController from '../controllers/user.controller.js';

// Routes user
routerUser.post('/login', userController.loginUserController);
routerUser.post('/create', userController.createUserController);
routerUser.put('/:pk/update', userController.updateUserController);


// Routes userDetails
routerUser.post('/:pk/createDetails', userController.createUserDetailsController);
routerUser.put('/:pk/updateDetails', userController.updateUserDetailsController);

export default routerUser;