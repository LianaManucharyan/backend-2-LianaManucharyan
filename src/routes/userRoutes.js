import express from 'express';
import { isAdmin, isUser, isAuthenticated } from '../middlewares/authMiddleware.js';
import { userDTO } from '../dtos/userDTO.js';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/current', isAuthenticated, async (req, res) => {
    try {
      const user = req.user;  
  
      if (!user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      const userResponse = userDTO(user);

      return res.json(userResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.delete('/delete/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const userToDelete = await User.findByIdAndDelete(id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;