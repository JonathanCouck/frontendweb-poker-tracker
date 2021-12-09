import { axios } from '.';
import config from '../config.json';

export const login = async (username, password) => {
  const {
		data
	} = await axios.post(`users/login`, {
		username,
		password
	}); 
	return data;
}

export const register = async ( {
  username, 
  password, 
  birthDate,
  firstName,
  lastName,
}) => {
  const { 
    data 
  } = await axios.post(`users/register`, {
    username, 
    password, 
    birthDate,
    firstName,
    lastName,
  });
  
  return data;
}

export const getUserById = async (id) => {
  const {
    data
  } = await axios.get(`${config.base_url}users/${id}`);
  return data;
}