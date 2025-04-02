import { mailService } from '../services/mailService.js'; 

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {   
    const subject = 'Bienvenido a nuestra app!';
    await mailService.sendMail({
      to: email,
      subject,
      type: EMAIL_TYPES.WELCOME, 
    });

    res.status(201).json({ message: 'Usuario registrado y correo enviado' });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
};
