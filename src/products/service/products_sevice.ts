import { IProducts, ProductRepositoryType } from "../product_type";

export const createProductService = async (
  input: IProducts,
  repository: ProductRepositoryType,
) => {
  try {
    const data = await repository.createProduct(input);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getProductService = async (
  productId: string,
  repository: ProductRepositoryType,
) => {
  try {
    const data = await repository.getProduct(productId);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getAllProductsService = async (
  repository: ProductRepositoryType,
) => {
  try {
    const data = await repository.getAllProducts();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
