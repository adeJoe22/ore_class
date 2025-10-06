"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String },
    manufacture_date: { type: Date },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });
const ProductModel = (0, mongoose_1.model)("Products", schema, "Products");
exports.default = ProductModel;
