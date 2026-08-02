import { GetAllRestaraunts, GetRestarauntById, CreateRestaraunt, UpdateRestaraunt, DeleteRestaraunt } from "./restarauntServices.js";
import express from 'express'
const router = express.Router();

router.get('/', GetAllRestaraunts);
router.get('/:id', GetRestarauntById);
router.post('/', CreateRestaraunt);
router.put('/:id', UpdateRestaraunt);
router.delete('/:id', DeleteRestaraunt);

export default router;