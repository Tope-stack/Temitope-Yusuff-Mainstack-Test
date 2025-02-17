import jwt from "jsonwebtoken";
import { Response } from "express";
import bcrypt from "bcryptjs";

const generateToken = (res: Response, userId: any): string => {
	const jwtSecret = process.env.JWT_SECRET || "123456";
	return jwt.sign({ userId }, jwtSecret, {
		expiresIn: "15m",
	});
};

const comparePassword = async (
	enteredPassword: string,
	userPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(enteredPassword, userPassword);
};

export { generateToken, comparePassword };
