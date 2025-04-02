import { mailService } from '../services/mailService.js';
import { ticketService } from '../services/ticketService.js';

export const confirmPurchase = async (req, res) => {
  const { userEmail, cartItems } = req.body; 

  try {
    const { ticket, failedProducts } = await ticketService.createTicket(cartItems, userEmail);
    
    if (failedProducts.length > 0) {
      return res.status(400).json({
        message: 'Algunos productos no están disponibles.',
        failedProducts: failedProducts
      });
    }

    const subject = 'Confirmación de compra';
    await mailService.sendMail({
      to: userEmail,
      subject,
      type: 'PURCHASE_CONFIRMATION', 
    });

    res.status(200).json({
      message: 'Compra confirmada y correo enviado',
      ticket
    });
  } catch (error) {
    console.error('Error confirmando compra:', error);
    res.status(500).json({ message: 'Error confirmando la compra' });
  }
};