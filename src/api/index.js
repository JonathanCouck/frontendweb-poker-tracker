import axiosRoot from 'axios';
import config from '../config.json';

export const axios = axiosRoot.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(config.token_key)}`,
  }
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
   delete axios.defaults.headers['Authorization'];
  }
}