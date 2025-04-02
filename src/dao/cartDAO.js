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
    throw new Error('Error finding or creating cart: ' + error.message);
  }
};

export const getCartById = async (cartId) => {
  try {
    return await Cart.findById(cartId);
  } catch (error) {
    throw new Error('Error fetching cart: ' + error.message);
  }
};

export const clearCart = async (cartId) => {
  try {
    await Cart.findByIdAndDelete(cartId);
  } catch (error) {
    throw new Error('Error clearing cart: ' + error.message);
  }
};

export const updateCartItems = async (cartId, items) => {
  try {
    const cart = await Cart.findById(cartId);
    cart.items = items;
    return await cart.save();
  } catch (error) {
    throw new Error('Error updating cart items: ' + error.message);
  }
};