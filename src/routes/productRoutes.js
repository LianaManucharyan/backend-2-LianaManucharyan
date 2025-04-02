import express from 'express';
import passport from 'passport';
import { isAdmin } from '../middlewares/permissionMiddleware.js';  
import { createProduct, deleteProduct, getAllProducts } from '../repositories/productRepository.js';  

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: 'Faltan datos en el cuerpo de la solicitud' });
  }

  try {
    const product = await createProduct({ name, price, stock });
    res.status(201).json({ message: 'Producto creado con éxito', product });
  } catch (error) {
    console.error('Error creando el producto:', error);
    res.status(500).json({ message: 'Error creando el producto', error: error.message });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);  
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado con éxito', product });
  } catch (error) {
    console.error('Error eliminando el producto:', error);
    res.status(500).json({ message: 'Error eliminando el producto', error: error.message });
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const products = await getAllProducts();  
    res.status(200).json({ message: 'Productos obtenidos con éxito', products });
  } catch (error) {
    console.error('Error obteniendo los productos:', error);
    res.status(500).json({ message: 'Error obteniendo los productos', error: error.message });
  }
});

export default router;