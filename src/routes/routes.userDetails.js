import { Router } from 'express';
const routerUserDetails = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import userDetailsController from '../controllers/userDetails.controller.js';

// Routes userDetails
routerUserDetails.get('/:slug/getUserDetails', userDetailsController.getUserDetailsController);
routerUserDetails.get('/:pk/getUserDetailsByPk', verifyToken, userDetailsController.getUserDetailsByPkController);
routerUserDetails.post('/createUserDetails', verifyToken, userDetailsController.createUserDetailsController);
routerUserDetails.put('/:pk/updateUserDetails', verifyToken, userDetailsController.updateUserDetailsController);

export default routerUserDetails;