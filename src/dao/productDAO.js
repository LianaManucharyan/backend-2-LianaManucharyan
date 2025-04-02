import Product from '../models/productModel.js';

export const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export const findProductById = async (id) => {
  return await Product.findById(id);
};

export const findAllProducts = async () => {
  return await Product.find();
};