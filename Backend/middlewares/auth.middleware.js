import BlackListedTokenModel from "../models/blackListedToken.model.js";
import captainModel from "../models/captain.model.js";
import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized user access' });
        }

        // Check if the token is blacklisted
        const blackListedToken = await BlackListedTokenModel.findOne({ token });
        if (blackListedToken) {
            return res.status(401).json({ message: 'Unauthorized user access' });
        }
         
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized user access' });
        }
        const user = await UserModel.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user access' });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized captain access' });
        }

        const blackListedToken = await BlackListedTokenModel.findOne({ token });
        if (blackListedToken) {
            return res.status(401).json({ message: 'Unauthorized captain access' });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized captain access' });
        }

        const captain = await captainModel.findOne({_id: decoded._id})
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized captain access' });
        }

        req.token = token;
        req.captain = captain;
        next();
        
    } catch (error) {
        return res.status(500).json({ message: error || 'Unauthorized captain access', success: false });
    }
 }