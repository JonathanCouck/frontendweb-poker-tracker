import { axios } from '.';

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
  website,
}) => {
  const {
    data
  } = await axios({
    method: id ? 'put' : 'post',
    url: `places/${id ?? ''}`,
    data: {
      name, 
      country, 
      website,
    },
  });
    return data;
}

export const deletePlace = async (id) => {
  await axios.delete(`places/${id}`);
};