import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		imageUrl: { type: String, required: true },
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
