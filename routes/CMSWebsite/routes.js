import express from "express";
import { AddProj, DeleteProj, loadAllProjects, UpdateProj } from "./services.js";



const router =  express.Router();

router.get('/projects', loadAllProjects);
router.post('/projects', AddProj);
router.put('/projects', UpdateProj);
router.delete('/projects', DeleteProj)




export default router



