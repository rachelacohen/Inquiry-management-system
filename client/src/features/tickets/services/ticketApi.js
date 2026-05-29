import axios from 'axios';

export const ticketApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTickets = async (filters = [], sorts = []) => {
  console.log("getTickets filters", filters);
  console.log("getTickets sorts", sorts);
  const response = await ticketApi.get('/api/tickets', { params: { filters, sorts } });
  console.log("getTickets response", response.data?.data);
  return response.data?.data;
}

export const getTicket = async (id) => {
  const response = await ticketApi.get(`/api/tickets/${id}`);
  return response.data;
}

export const createTicket = async (ticket) => {
  const response = await ticketApi.post('/api/tickets', ticket);
  return response.data;
}

export const updateTicket = async (id, ticket) => {
  const response = await ticketApi.put(`/api/tickets/${id}`, ticket);
  return response.data;
}

export const deleteTicket = async (id) => {
  const response = await ticketApi.delete(`/api/tickets/${id}`);
  return response.data;
}

export const updateTicketStatus = async (id, status) => {
  const response = await ticketApi.put(`/api/tickets/${id}/update-status`, { status });
  return response.data;
}

export const updateTicketAssignedUser = async (id, assignedUserId) => {
  const response = await ticketApi.put(`/api/tickets/${id}/update-assigned-user`, { assignedUserId });
  return response.data;
}