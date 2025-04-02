import express from 'express';
import passport from '../config/passport.js';
import { isUser } from '../middlewares/permissionMiddleware.js';
import * as cartService from '../services/cartService.js';
import * as productService from '../services/productService.js';
import { ticketService } from '../services/ticketService.js'; 
import { mailService } from '../services/mailService.js';
import { EMAIL_TYPES } from '../common/constants/email-types.js';

const router = express.Router();

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), isUser, async (req, res) => {
  const cartId = req.params.cid;  
  const userId = req.user._id; 

  try {
    console.log("Iniciando la compra...");

    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      console.log("Carrito no encontrado");
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const { ticket, failedProducts } = await cartService.purchaseCart(cartId, req.user.email);

    if (failedProducts.length > 0) {
      return res.status(400).json({
        message: 'Algunos productos no están disponibles',
        failedProducts,
      });
    }

    res.status(200).json({
      message: 'Compra realizada con éxito y ticket generado.',
      ticket,
    });

  } catch (error) {
    console.error("Error durante el proceso de compra:", error);  
    res.status(500).json({ message: 'Error en el proceso de compra', error: error.message });  
  }
});

router.delete('/:cid', passport.authenticate('jwt', { session: false }), isUser, async (req, res) => {
  const cartId = req.params.cid;

  try {
    const result = await cartService.emptyCart(cartId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/products', passport.authenticate('jwt', { session: false }), isUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; 

  try {
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/products', passport.authenticate('jwt', { session: false }), isUser, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const detailedItems = await Promise.all(cart.items.map(async (item) => {
      const product = await productService.getProductById(item.productId);
      return {
        productId: item.productId,
        requestedQuantity: item.quantity,
        availableStock: product ? product.stock : 0,
      };
    }));

    res.status(200).json(detailedItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;