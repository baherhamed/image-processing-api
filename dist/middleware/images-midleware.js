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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const queryParm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const mainDir = './src/assets';
    const imagePath = mainDir + '/images/';
    const outputPath = mainDir + '/thumb/';
    yield fs_1.promises.mkdir(outputPath, { recursive: true });
    const name = req.query.filename;
    let width = Number(req.query.width);
    let height = Number(req.query.height);
    const imageDir = yield fs_1.promises.readdir(imagePath);
    let imageName;
    let imageExtention;
    try {
        for (var imageDir_1 = __asyncValues(imageDir), imageDir_1_1; imageDir_1_1 = yield imageDir_1.next(), !imageDir_1_1.done;) {
            const pic = imageDir_1_1.value;
            if (pic && pic.split('.')[0] === name) {
                imageName = pic.split('.')[0];
                imageExtention = pic.split('.')[1];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (imageDir_1_1 && !imageDir_1_1.done && (_a = imageDir_1.return)) yield _a.call(imageDir_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (!imageName) {
        imageName = 'default';
        imageExtention = 'png';
        width = 700;
        height = 700;
    }
    const fullImageName = imageName + '.' + imageExtention;
    const readImage = yield fs_1.promises.readFile(imagePath + fullImageName);
    const newSize = (0, sharp_1.default)(readImage);
    newSize.resize(width, height);
    yield newSize.toFile(outputPath + imageName + '_thumb' + '.' + imageExtention);
    const readNewImage = yield fs_1.promises.readFile(outputPath + imageName + '_thumb' + '.' + imageExtention);
    res.contentType(`image/${imageExtention}`);
    res.send(readNewImage);
    next();
});
exports.default = queryParm;
