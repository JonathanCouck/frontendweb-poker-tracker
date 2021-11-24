import axios from 'axios';

export const login = async (username, password) => {
  const {
		data
	} = await axios.post(`http://localhost:9000/api/users/login`, {
		username,
		password
	});
	return data;
}

export const editUser = async ({
  id,
  username,
  password,
  first_name,
  last_name,
  birth_date,
  favorite_place_id
}) => {

}

export const deleteUser = async (id) => {
  
}