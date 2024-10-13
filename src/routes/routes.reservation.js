import { Router } from 'express';
const routerReservation = Router();

import reservationController from '../controllers/reservation.controller.js';

// Routes reservation
routerReservation.get('/:pk/getAllReservation', reservationController.getReservationController);
routerReservation.post('/createReservation', reservationController.createReservationController);
routerReservation.delete('/:pk/deleteReservation', reservationController.deleteReservationController);

export default routerReservation;