import { Router } from 'express';
import {body} from 'express-validator'
import { registerCaptain, captainLogin, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password length should be more than 5 characters.'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required.'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required.'),   
    body('vehicle.capacity').isInt({min: 1, max: 8  }).withMessage('Vehicle capacity should be more than 0.'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'bike']).withMessage('Vehicle type must be either car, motorcycle or bike.'),
], registerCaptain)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password length should be more than 5 characters.')
], captainLogin)

router.get('/logout', authCaptain, logoutCaptain)
router.get('/profile', authCaptain, getCaptainProfile)
export default router;