import { Router } from 'express';
const routerReservation = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import reservationController from '../controllers/reservation.controller.js';

// Routes reservation
routerReservation.get('/:pk/getAllReservation', verifyToken, reservationController.getReservationController);
routerReservation.post('/:pk/getAllReservationByProfessional', reservationController.getReservationByProfessionalController);
routerReservation.post('/createReservation', reservationController.createReservationController);
routerReservation.delete('/:pk/deleteReservation', verifyToken, reservationController.deleteReservationController);

export default routerReservation;