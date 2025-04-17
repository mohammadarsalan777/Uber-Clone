import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import BlackListedTokenModel from "../models/blackListedToken.model.js";

// REGISTER CAPTAIN
export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;
        const { color, plate, capacity, vehicleType } = vehicle;
        const { firstname, lastname } = fullname;

        // Check if email is already in use
        const isCaptainExist = await captainModel.findOne({ email });
        if (isCaptainExist) {
            return res.status(409).json({ error: 'Captain already exists' });
        }

        // Check if plate already exists
        const isPlateExist = await captainModel.findOne({ 'vehicle.plate': plate });
        if (isPlateExist) {
            return res.status(409).json({ error: 'Vehicle plate already exists' });
        }

        // Hash the password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create new captain
        const captain = new captainModel({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        await captain.save();

        // Generate token
        const token = await captain.generateAuthToken();
        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            sameSite: 'strict'
        };

        return res
            .cookie('token', token, options)
            .status(201)
            .json({
                message: 'Captain registered successfully',
                captain: {
                    id: captain._id,
                    fullname: captain.fullname,
                    email: captain.email,
                    vehicle: captain.vehicle
                }
            });

    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error', success: false });
    }
};

// CAPTAIN LOGIN
export const captainLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = await captain.generateAuthToken();
        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            sameSite: 'strict'
        };

        return res
            .cookie('token', token, options)
            .status(200)
            .json({
                message: 'Captain logged in successfully',
                captain: {
                    id: captain._id,
                    fullname: captain.fullname,
                    email: captain.email,
                    vehicle: captain.vehicle
                }
            });

    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error', success: false });
    }
};

// GET CAPTAIN PROFILE
export const getCaptainProfile = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Captain profile fetched successfully',
            captain: req.captain
        });

    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error', success: false });
    }
};

// LOGOUT CAPTAIN
export const logoutCaptain = async (req, res) => {
    try {
        const token = req.token || req.cookies.token || req.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'Token not provided' });
        }

        const blacklisted = await BlackListedTokenModel.create({ token });

        if (!blacklisted) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        return res
            .clearCookie('token', {
                httpOnly: true,
                sameSite: 'strict'
            })
            .status(200)
            .json({ message: 'Captain logged out successfully', success: true });

    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error', success: false });
    }
};
