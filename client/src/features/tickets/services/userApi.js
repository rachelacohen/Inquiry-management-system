import axios from 'axios';

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  const response = await userApi.get('/api/users');
  console.log("getUsers response", response.data?.data);
  return response.data?.data;
}

export const getUser = async (id) => {
  const response = await userApi.get(`/api/users/${id}`);
  return response.data;
}

export const createUser = async (user) => {
  const response = await userApi.post('/api/users', user);
  return response.data;
}

export const updateUser = async (id, user) => {
  const response = await userApi.put(`/api/users/${id}`, user);
  return response.data;
}

export const deleteUser = async (id) => {
  const response = await userApi.delete(`/api/users/${id}`);
  return response.data;
}