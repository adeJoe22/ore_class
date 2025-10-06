export interface IProducts {
  name: string;
  price: number;
  manufacture_date: Date;
  stock: number;
}

// function

type CreateProduct = (input: IProducts) => Promise<IProducts>;
type GetProduct = (productId: string) => Promise<IProducts | null>;
type GetAllProducts = () => Promise<IProducts[]>;

export type ProductRepositoryType = {
  createProduct: CreateProduct;
  getProduct: GetProduct;
  getAllProducts: GetAllProducts;
};
