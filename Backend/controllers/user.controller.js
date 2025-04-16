import { UserModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlackListedTokenModel from "../models/blackListedToken.model.js";

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const { firstname, lastname, email, password } = req.body
        
        const checkExtistingUser = await UserModel.findOne({email})
        if (checkExtistingUser) {
            return res.status(409).json({
                message: 'User with this email already exists.',
                success: false
            })
        }
        const hashedPassword = await UserModel.hashPassword(password)
        
        const user = await UserModel.create(
            {
                fullname: {
                    firstname,
                    lastname
                },
                email,
                password: hashedPassword
            }
        )


        const token = user.generateAuthToken()
        
        return res.status(201).json({
            token, user, message: 'User created successfully', success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error ||'Internal service error.',
            success: false
        })
    }
}

export const loginUser = async (req, res) => {
   
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const { email, password } = req.body
    
        // Check if email is valid
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password are required.',
                success: false
            })
        }
        // Check if user exists
        const user = await UserModel.findOne({ email }).select('+password')
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }    

        // Check if password is correct
        const isMatch = await user.comparePassword(password)
       
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            })
        }

        const token = user.generateAuthToken()

        // Remove password and __v from user object before sending response
        user.password = undefined
        user.__v = undefined    

        return res.status(200).cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }).json({
             user, message: 'User logged in successfully', success: true
        })

        // return res.status(200).json({
        //     token, user, message: 'User logged in successfully', success: true
        // })
        
    } catch (error) {
        return res.status(500).json({
            message: error ||'Internal service error.',
            success: false
        })
    }
}
 
export const getUserProfile = async (req, res) => {
    try {
        return res.status(200).json({
             message: 'User profile retrieved successfully', success: true, user: req.user
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error ||'Internal service error.',
            success: false
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        if (token) {
            await BlackListedTokenModel.create({ token })
        }
        return res.status(200).json({
            message: 'User logged out successfully', success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error ||'Internal service error.',
            success: false
        })
    }
}