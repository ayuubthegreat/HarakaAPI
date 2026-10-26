import express from 'express';
import { createPretechAppointment, updatePretechAppointment, deletePretechAppointment, fetchPretechAppointments, fetchPretechAppointmentTimes, createPretechAppointmentTime, deletePretechAppointmentTime } from './pretechAppointmentRouteFunctions.js';


const router = express.Router();

router.get('/', fetchPretechAppointments);
router.post('/', createPretechAppointment);
router.put('/:id', updatePretechAppointment);
router.delete('/:id', deletePretechAppointment);
router.get('/times', fetchPretechAppointmentTimes);
router.post('/times', createPretechAppointmentTime);
router.delete('/times/:id', deletePretechAppointmentTime);

export default router;