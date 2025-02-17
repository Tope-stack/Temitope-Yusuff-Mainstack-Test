"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../utils/auth");
const appError_1 = __importDefault(require("../utils/appError"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password } = req.body;
        const userExists = yield user_1.default.findOne({ email });
        if (userExists)
            throw new appError_1.default("User already exist, Please Login", 400);
        const user = yield user_1.default.create({
            fullname,
            email,
            password,
        });
        if (user) {
            const token = (0, auth_1.generateToken)(res, user._id);
            res.status(201).json({
                status: "success",
                message: "Registration Successful, Proceed To Login",
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            });
        }
        else {
            throw new appError_1.default("An error occurred while creating the user", 400);
        }
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err instanceof appError_1.default ? err.message : "An unexpected error occurred",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user)
            throw new appError_1.default("User Not Found", 400);
        if (!(0, auth_1.comparePassword)(password, user.password))
            throw new appError_1.default("Incorrect email or password", 401);
        const token = (0, auth_1.generateToken)(res, user._id);
        res.status(200).json({
            status: "success",
            message: "Login successful",
            token: token,
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err instanceof appError_1.default ? err.message : "An unexpected error occurred",
        });
    }
});
exports.login = login;
