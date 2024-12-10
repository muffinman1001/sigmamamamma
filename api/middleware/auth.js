import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new ApiError(401, 'Authentication required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid or expired token'));
    }
}; 