import Product from '../models/productModel.js';

export const createProduct = async (data) => {
  try {
    const product = new Product(data);
    return await product.save(); 
  } catch (error) {
    throw new Error('Error al crear el producto: ' + error.message); 
  }
};

export const updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      throw new Error('Producto no encontrado para actualizar');
    }
    return product; 
  } catch (error) {
    throw new Error('Error al actualizar el producto: ' + error.message); 
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id); 
    if (!product) {
      throw new Error('Producto no encontrado para eliminar');
    }
    return product; 
  } catch (error) {
    throw new Error('Error al eliminar el producto: ' + error.message);
  }
};

export const getAllProducts = async () => {
  try {
    return await Product.find();  
  } catch (error) {
    throw new Error('Error al obtener productos: ' + error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product; 
  } catch (error) {
    throw new Error('Error al obtener el producto: ' + error.message); 
  }
};