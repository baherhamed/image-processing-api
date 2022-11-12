"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).send('Server Working!!');
});
app.use('/api', index_1.default);
const server = app.listen(port, () => {
    console.log(`
 -------------------------------
 | server listen to Port  ${port} |
 -------------------------------
  `);
});
exports.default = server;
