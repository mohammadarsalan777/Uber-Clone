import express from 'express'
import {body} from 'express-validator'
import { registerUser } from '../controllers/user.controller.js'
const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password length should be more than 5 characters.')
], registerUser)

export default router