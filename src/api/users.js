import { axios } from 'axios';

export const login = async (username, password) => {
  const {
		data
	} = await axios.post(`users/login/`, {
		username,
		password
	}); 
	return data;
}

export const register = async ( {
  username, 
  password, 
  birthdate,
  firstName,
  lastName,
}) => {
  const { 
    data 
  } = await axios.post(`users/register`, {
    username, 
    password, 
    birthdate,
    firstName,
    lastName,
  });
  return data;
}

export const getUserById = async (id) => {
  const {
    data
  } = await axios.get(`users/${id}`);
  return data;
}