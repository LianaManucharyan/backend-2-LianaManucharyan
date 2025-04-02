import * as cartService from '../services/cartService.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cartId, userEmail } = req.body;
    const { ticket, failedProducts } = await cartService.purchaseCart(cartId, userEmail);
    
    if (failedProducts.length > 0) {
      return res.status(400).json({
        message: 'Algunos productos no están disponibles.',
        failedProducts
      });
    }

    res.status(200).json({
      message: 'Compra realizada con éxito y ticket generado.',
      ticket
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
