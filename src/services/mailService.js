import nodemailer from 'nodemailer';
import { EMAIL_TYPES } from '../common/constants/email-types.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.NODEMAILER_USER, 
    pass: process.env.NODEMAILER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false,  
  },
});

export const mailService = {
  sendMail: async ({ to, subject, type, failedProducts = [] }) => {
    let text = '';

    if (type === EMAIL_TYPES.PURCHASE_CONFIRMATION) {
      text = 'Gracias por tu compra. Aquí están los detalles de los productos comprados:';

      if (failedProducts.length > 0) {
        text += '\n\nLos siguientes productos no están disponibles:\n';
        failedProducts.forEach(product => {
          text += `- Producto ID: ${product.productId}, Solicitud: ${product.requestedQuantity}, Stock disponible: ${product.availableStock}\n`;
        });
      } else {
        text += '\n\nTodos los productos fueron comprados con éxito.';
      }
    }

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado a:', to);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      if (error.response) {
        console.error('Error detallado:', error.response);
      }
      throw new Error('No se pudo enviar el correo');
    }
  }
};