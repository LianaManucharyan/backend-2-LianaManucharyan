import Ticket from '../models/ticketModel.js';

export const createTicket = async (data) => {
  const ticket = new Ticket(data);
  return await ticket.save();
};

export const getTicketById = async (ticketId) => {
  return await Ticket.findById(ticketId);
};