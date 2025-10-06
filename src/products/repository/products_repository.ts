import ProductModel from "../model/Products";
import { IProducts, ProductRepositoryType } from "../product_type";

export const ProductRepository: ProductRepositoryType = {
  createProduct: async function (
    input: IProducts,
  ): Promise<IProducts> {
    try {
      const newProduct = await ProductModel.create({
        ...input,
        manufacture_date: new Date(),
      });
      return newProduct;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getProduct: async function (
    productId: string,
  ): Promise<IProducts | null> {
    try {
      const product = await ProductModel.findById({
        _id: productId,
      });
      return product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getAllProducts: async function (): Promise<IProducts[]> {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
