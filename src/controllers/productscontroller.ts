import { Request, Response } from "express";
import AppError from "../utils/appError";
import Product from "../models/product";

const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.create(req.body);

		res.status(201).json({
			status: "success",
			message: "product created successfully",
			product,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

const getAllProducts = async (req: Request, res: Response) => {
	try {
		const filter = { status: "active" };
		const products = await Product.find(filter);

		if (products == null) throw new AppError("Products Not Found", 404);

		res.status(200).json({
			status: "success",
			message: "products retrieved successfully",
			products,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) throw new AppError("Product Id Not Found", 400);

		res.status(200).json({
			status: "success",
			message: "product found successfully",
			product,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		console.log(req.params.id, "params");
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!product) throw new AppError("Product Id Not Found", 404);

		res.status(200).json({
			status: "success",
			message: "product updated successfully",
			product,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) throw new AppError("Product Id Not Found", 404);

		// set product status as inactive instead of deleting
		product.status = "inactive";

		await product.save();

		res.status(200).json({
			status: "success",
			message: "product deleted successfully",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message:
				err instanceof AppError ? err.message : "An unexpected error occurred",
		});
	}
};

export {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
