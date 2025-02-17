"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(authRouter_1.default);
app.use(globalErrorHandler_1.default);
const MONGO_URL = "mongodb+srv://mediat:k7LsKeanBpUfKtgp@cluster0.sxiwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB connection failed!..", err));
