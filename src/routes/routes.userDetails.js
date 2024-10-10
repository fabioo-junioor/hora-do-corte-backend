import { Router } from 'express';
const routerUserDetails = Router();

import userDetailsController from '../controllers/userDetails.controller.js';

// Routes userDetails
routerUserDetails.post('/createDetails', userDetailsController.createUserDetailsController);
routerUserDetails.put('/:pk/updateDetails', userDetailsController.updateUserDetailsController);

export default routerUserDetails;