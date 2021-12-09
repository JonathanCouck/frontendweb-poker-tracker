import { axios } from '.';


export const getCashgames = async () => {
  const { data } = await axios.get(
    `cashgames/`,
    {
      params: {
        limit: 25,
        offset: 0,
      }
    }
  );
  return data;
}

export const saveCashgames = async ({
  id,
  bigBlind, 
  smallBlind, 
  inFor, 
  outFor, 
  date, 
  placeId,
  userId,
}) => {
  const { data } = await axios ({
    method: id? 'put': 'post',
    url: `cashgames/${id ?? ''}`,
    data: {
      bigBlind, 
      smallBlind, 
      inFor, 
      outFor, 
      date, 
      placeId,
      userId,
    }
  });

  return data;
}

export const deleteCashgames = async (id) => {
  await axios.delete(`cashgames/${id}`);
}