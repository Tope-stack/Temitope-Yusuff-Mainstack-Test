import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

export interface IUser extends Document {
	fullname: string;
	email: string;
	password: string;
}

const userSchema = new Schema<IUser>(
	{
		fullname: {
			type: String,
			required: [true, "Please input your fullname"],
		},
		email: {
			type: String,
			required: [true, "Please input your email address"],
			unique: true,
			validate: [validator.isEmail, "Please input a valid email address"],
		},
		password: {
			type: String,
			required: [true, "Please input your password"],
			minlength: 8,
			maxlength: 16,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
