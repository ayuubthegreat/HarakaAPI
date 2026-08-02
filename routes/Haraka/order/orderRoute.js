import express from 'express'
import { CreateOrder, GetOrders, GetOrderById, UpdateOrder, DeleteOrder } from './orderFunctions.js';


const router = express.Router();

router.post('/', CreateOrder);
router.get('/', GetOrders);
router.get('/:id', GetOrderById);
router.put('/:id', UpdateOrder);
router.delete('/:id', DeleteOrder);


export default router