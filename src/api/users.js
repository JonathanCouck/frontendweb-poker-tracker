import axios from 'axios';

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
  birthdate,
}) => {
  const { 
    data 
  } = await axios.post(`users/register`, {
    username, 
    password, 
    birthdate,
  });
  return data;
}

export const getUserById = async (id) => {
  const {
    data
  } = await axios.get(`users/${id}`);
  return data;
}