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