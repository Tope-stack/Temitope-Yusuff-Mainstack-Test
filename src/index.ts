import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter";
import { errorHandler } from "./middlewares/error";
import productRouter from "./routes/productRouter";
import { authenticate } from "./middlewares/auth";

dotenv.config();

interface UserBasicInfo {
	_id: string;
	fullname: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: UserBasicInfo | null;
		}
	}
}

const app = express();

app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use(authRouter);
app.use(authenticate, productRouter);
app.use(errorHandler);

const MONGO_URL =
	"mongodb+srv://mediat:k7LsKeanBpUfKtgp@cluster0.sxiwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
	.connect(MONGO_URL)
	.then(() => console.log("DB connected successfully"))
	.catch((err) => console.log("DB connection failed!..", err));
