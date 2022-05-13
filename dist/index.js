"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const adminroutes_1 = __importDefault(require("./src/routes/adminroutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const server = http_1.default.createServer(app);
const mongooseOptions = {
    useUnifiedTopology: true,
};
// @ts-ignore
mongoose_1.default.connect(process.env.MONGO_URI, mongooseOptions)
    .then(() => console.log('Mongoose connected'))
    // @ts-ignore 
    .catch(err => console.log(err.message));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', [adminroutes_1.default]);
app.get('/', (req, res) => res.status(200).send('Server is running'));
server.listen(port, () => console.log('server runing on Port ' + port));
