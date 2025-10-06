import { model, Schema } from "mongoose";
import { IProducts } from "../product_type";

const schema = new Schema<IProducts>(
  {
    name: { type: String },
    manufacture_date: { type: Date },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

const ProductModel = model<IProducts>("Products", schema, "Products");
export default ProductModel;
