import * as ticketRepository from '../repositories/ticketRepository.js';

export const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketRepository.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
