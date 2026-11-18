import express from "express";
import { AddBusinessLog, AddProj, DeleteBusinessLog, DeleteProj, loadAllProjects, LoadBusinessLogs, UpdateBusinessLog, UpdateProj } from "./services.js";



const router =  express.Router();

router.get('/projects', loadAllProjects);
router.post('/projects', AddProj);
router.put('/projects', UpdateProj);
router.delete('/projects', DeleteProj)
router.get('/businessLogs', LoadBusinessLogs);
router.post('/businessLogs', AddBusinessLog);
router.put('/businessLogs/:id', UpdateBusinessLog);
router.delete('/businessLogs/:id', DeleteBusinessLog);




export default router



