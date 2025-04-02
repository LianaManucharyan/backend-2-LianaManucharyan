import Ticket from '../models/ticketModel.js';
import * as productDAO from '../dao/productDAO.js';

const ticketService = {
  createTicket: async (cartItems, userEmail) => {
    let totalAmount = 0;
    const failedProducts = [];

    for (const item of cartItems) {
      const product = await productDAO.findProductById(item.productId);
      if (product && product.stock >= item.quantity) {
        totalAmount += product.price * item.quantity;
        product.stock -= item.quantity;
        await product.save();
      } else {
        failedProducts.push({
          productId: item.productId,
          requestedQuantity: item.quantity,
          availableStock: product ? product.stock : 0
        });
      }
    }

    if (failedProducts.length === 0) {
      const ticket = new Ticket({
        code: `TICKET-${Date.now()}`,
        amount: totalAmount,
        purchaser: userEmail,
      });

      await ticket.save();
      return { ticket, failedProducts };
    } else {
      return { ticket: null, failedProducts };
    }
  }
};

export { ticketService };