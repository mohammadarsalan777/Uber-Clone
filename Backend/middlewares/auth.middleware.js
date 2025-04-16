import BlackListedTokenModel from "../models/blackListedToken.model.js";
import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
 

    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Check if the token is blacklisted
        const blackListedToken = await BlackListedTokenModel.findOne({ token });
        if (blackListedToken) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
         
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        const user = await UserModel.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
        
    }

 }