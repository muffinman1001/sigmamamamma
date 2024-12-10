import { User } from '../models/User.js';
import { generateTokens, verifyRefreshToken } from '../utils/auth.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        const user = new User({
            email,
            password: await bcrypt.hash(password, 12),
            name
        });
        
        await user.save();
        
        const { accessToken, refreshToken } = generateTokens(user);
        
        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                },
                tokens: { accessToken, refreshToken }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const { accessToken, refreshToken } = generateTokens(user);
        
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                },
                tokens: { accessToken, refreshToken }
            }
        });
    } catch (error) {
        next(error);
    }
}; 