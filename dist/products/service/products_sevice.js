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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsService = exports.getProductService = exports.createProductService = void 0;
const createProductService = (input, repository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield repository.createProduct(input);
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.createProductService = createProductService;
const getProductService = (productId, repository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield repository.getProduct(productId);
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getProductService = getProductService;
const getAllProductsService = (repository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield repository.getAllProducts();
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getAllProductsService = getAllProductsService;
