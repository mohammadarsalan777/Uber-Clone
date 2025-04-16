import express from 'express'
import {body} from 'express-validator'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { authUser } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password length should be more than 5 characters.')
], registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password length should be more than 5 characters.')
], loginUser)

router.get('/profile', authUser, getUserProfile)
router.get('/logout', authUser, logoutUser)

export default router