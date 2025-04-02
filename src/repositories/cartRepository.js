import Cart from '../models/cartModel.js';

export const findOrCreateCartByUser = async (userId) => {
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    return cart;
  } catch (error) {
    throw new Error('Error buscando o creando el carrito: ' + error.message);
  }
};

export const getCartById = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId);
    return cart;
  } catch (error) {
    throw new Error('Error obteniendo el carrito por ID: ' + error.message);
  }
};

export const clearCart = async (cartId) => {
  try {
    await Cart.findByIdAndDelete(cartId);
  } catch (error) {
    throw new Error('Error eliminando el carrito: ' + error.message);
  }
};