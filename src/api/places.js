import { axios } from './index';

export const getAllPlaces = async () => {
  const {
    data
  } = await axios.get('places');

  return data;
};

export const savePlace = async ({
  id,
  name, 
  country, 
  city, 
  postal_code, 
  street, 
  house_number
}) => {
  const {
    data
  } = await axios({
    method: id ? 'put' : 'post',
    url: `places/${id ?? ''}`,
    data: {
      name, 
      country, 
      city, 
      postal_code, 
      street, 
      house_number
    },
  });
    return data;
}

export const deletePlace = async (id) => {
  await axios.delete(`places/${id}`);
};