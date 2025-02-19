"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// setting up app
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000"
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(router);
app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
