import Ticket from '../models/ticketModel.js';

export const createTicket = async (data) => {
  try {
    const ticket = new Ticket(data);
    return await ticket.save();
  } catch (error) {
    throw new Error('Error creating ticket: ' + error.message);
  }
};

export const getTicketById = async (ticketId) => {
  try {
    return await Ticket.findById(ticketId);
  } catch (error) {
    throw new Error('Error fetching ticket: ' + error.message);
  }
};

export const getAllTickets = async () => {
  try {
    return await Ticket.find();
  } catch (error) {
    throw new Error('Error fetching tickets: ' + error.message);
  }
}; 