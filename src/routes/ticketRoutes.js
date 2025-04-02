import express from 'express';
import * as ticketController from '../controllers/ticketController.js';

const router = express.Router();

router.get('/:id', ticketController.getTicketById);

export default router;
