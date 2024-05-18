import jwt from "jsonwebtoken"
import User from "../models/user"

import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}

const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error("Token not provided");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "") as { userId: string };

        const user = await User.findById(decodedToken.userId);

        if (!user) {
            throw new Error("Invalid token");
        }

        req.user = { userId: user._id };

        next();
    } catch (error: any) {
        res.status(401).send({ message: error.message });
    }
};

export { protect };