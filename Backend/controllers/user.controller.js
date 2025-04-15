import { UserModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

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
        console.log(user.password, password)
    

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
        
        return res.status(200).json({
            token, user, message: 'User logged in successfully', success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error ||'Internal service error.',
            success: false
        })
        
    }
 }