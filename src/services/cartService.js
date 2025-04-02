import * as cartRepository from '../repositories/cartRepository.js';
import * as productRepository from '../repositories/productRepository.js';
import Cart from '../models/cartModel.js';
import Ticket from '../models/ticketModel.js';
import { mailService } from './mailService.js';
import { EMAIL_TYPES } from '../common/constants/email-types.js';

export const addToCart = async (userId, productId, quantity) => {
  const product = await productRepository.getProductById(productId);
  if (!product) throw new Error('Producto no encontrado');

  const cart = await cartRepository.findOrCreateCartByUser(userId);

  const cartItem = cart.items.find(item => item.productId.toString() === productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  return cart;
};

export const getCartByUserId = async (userId) => {
  const cart = await cartRepository.findOrCreateCartByUser(userId);
  return cart;
};

export const purchaseCart = async (cartId, userEmail) => {
  const cart = await cartRepository.getCartById(cartId);
  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  let totalAmount = 0;
  const failedProducts = [];  

  for (const item of cart.items) {
    const product = await productRepository.getProductById(item.productId);

    if (!product) {
      failedProducts.push({
        productId: item.productId,
        requestedQuantity: item.quantity,
        availableStock: 0,
      });
    } else if (product.stock < item.quantity) {
      failedProducts.push({
        productId: item.productId,
        requestedQuantity: item.quantity,
        availableStock: product.stock,
      });
    } else {
      totalAmount += product.price * item.quantity;
      product.stock -= item.quantity;  
      await product.save();  
    }
  }

  let ticket = null;
  if (failedProducts.length === 0) {
    ticket = new Ticket({
      code: `TICKET-${Date.now()}`,
      amount: totalAmount,
      purchaser: userEmail,
    });
    await ticket.save();  
  }

  cart.items = cart.items.filter(item =>
    failedProducts.some(failed => failed.productId.toString() === item.productId.toString())
  );

  cart.status = 'purchased';
  await cart.save();  

  await mailService.sendMail({
    to: userEmail,
    subject: 'Confirmación de compra',
    type: EMAIL_TYPES.PURCHASE_CONFIRMATION,
    failedProducts,  
  });

  return {
    message: failedProducts.length > 0 ? 'Algunos productos no están disponibles' : 'Compra realizada con éxito y ticket generado.',
    ticket,  
    failedProducts, 
  };
};

export const emptyCart = async (cartId) => {
  const cart = await cartRepository.getCartById(cartId);
  
  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  cart.items = [];
  cart.status = 'empty';  
  await cart.save(); 

  return { message: 'El carrito ha sido vaciado' };
};