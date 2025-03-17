import { Router } from 'express';
const routerUser = Router();
import { verifyToken, validAuth } from '../core/auth/auth.jwt.js';

import userController from '../controllers/user.controller.js';

// Routes user
routerUser.get('/authUser', validAuth, (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Autorizado!',
        data: []
    });
});
routerUser.post('/login', userController.loginUserController);
routerUser.post('/create', userController.createUserController);
routerUser.put('/:pk/update', verifyToken, userController.updateUserController);
routerUser.delete('/:pk/delete', verifyToken, userController.deleteUserController);
routerUser.post('/recoverPassUser', userController.recoverPassUser);

export default routerUser;