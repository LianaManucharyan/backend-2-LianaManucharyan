import express from 'express';
import { confirmPurchase } from '../controllers/orderController.js';

const router = express.Router();

router.post('/confirm', confirmPurchase);

export default router;