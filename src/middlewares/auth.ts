import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./error";

const authenticate = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let token = req.headers["x-auth-token"]?.toString();

			if (!token) {
				throw new AuthenticationError("Token not found");
			}

			const jwtSecret = process.env.JWT_SECRET || "123456";
			const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

			if (!decoded || !decoded.userId) {
				throw new AuthenticationError("UserId not found");
			}

			const user = await User.findById(decoded.userId, "_id name email");

			if (!user) {
				throw new AuthenticationError("User not found");
			}

			//req.user = user;
			next();
		} catch (e) {
			throw new AuthenticationError("Invalid token");
		}
	}
);

export { authenticate };
