import express from 'express'
import { CreateOrder, GetOrders } from './orderFunctions.js';


const router = express.Router();

router.post('/create', async (req, res) => {
    await CreateOrder(req, res);
})
router.post('/get', async (req, res) => {
    await GetOrders(req, res);
});


export default router