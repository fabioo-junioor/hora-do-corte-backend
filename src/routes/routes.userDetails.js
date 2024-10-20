import { Router } from 'express';
const routerUserDetails = Router();

import userDetailsController from '../controllers/userDetails.controller.js';

// Routes userDetails
routerUserDetails.get('/:slug/getUserDetails', userDetailsController.getUserDetailsController);
routerUserDetails.get('/:pk/getUserDetailsByPk', userDetailsController.getUserDetailsByPkController);
routerUserDetails.post('/createUserDetails', userDetailsController.createUserDetailsController);
routerUserDetails.put('/:pk/updateUserDetails', userDetailsController.updateUserDetailsController);

export default routerUserDetails;