import * as productRepository from '../repositories/productRepository.js';

export const createProduct = async (data) => {
  return await productRepository.createProduct(data);
};

export const updateProduct = async (id, data) => {
  return await productRepository.updateProduct(id, data);
};

export const deleteProduct = async (id) => {
  return await productRepository.deleteProduct(id);
};

export const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

export const getProductById = async (id) => {
  return await productRepository.getProductById(id);
};
