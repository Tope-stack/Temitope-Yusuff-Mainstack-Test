import { Request, Response } from "express";
import User from "../models/user";
import { generateToken, comparePassword } from "../utils/auth";
import AppError from "../utils/appError";

const register = async (req: Request, res: Response) => {
	try {
		const { fullname, email, password } = req.body;
		const userExists = await User.findOne({ email });

		if (userExists) throw new AppError("User already exist, Please Login", 400);

		const user = await User.create({
			fullname,
			email,
			password,
		});

		if (user) {
			const token = generateToken(res, user._id);
			res.status(201).json({
				status: "success",
				message: "Registration Successful, Proceed To Login",
				id: user._id,
				fullname: user.fullname,
				email: user.email,
			});
		} else {
			throw new AppError("An error occurred while creating the user", 400);
		}
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) throw new AppError("User Not Found", 400);

		if (!(await comparePassword(password, user.password)))
			throw new AppError("Incorrect email or password", 401);

		const token = generateToken(res, user._id);

		res.status(200).json({
			status: "success",
			message: "Login successful",
			token: token,
			id: user._id,
			fullname: user.fullname,
			email: user.email,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

export { register, login };
