import axios from 'axios';

export const login = (email: string, password: string) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
};

export const register = (email: string, password: string) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { email, password });
};