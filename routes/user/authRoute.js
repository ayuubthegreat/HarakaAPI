import express from 'express'
import { Login, Register, FindUserById, DeleteUserById, UpdateUserById, StandardUserRouteFunc, FindAllUsers } from './authServices.js';


const router = express.Router();
router.post('/login', Login);
router.post('/register', Register);
router.get('/user/:id', FindUserById);
router.delete('/user/:id', DeleteUserById);
router.put('/user/:id', UpdateUserById);
router.get('/', StandardUserRouteFunc);
router.get('/users', FindAllUsers);

export default router;