import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  status: {
    type: String,
    enum: ['pending', 'purchased', 'empty'],
    default: 'pending',  
  },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;