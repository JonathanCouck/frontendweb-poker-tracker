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
  big_blind, 
  small_blind, 
  in_for, 
  out_for, 
  date, 
  place_id,
}) => {
  const { data } = await axios ({
    method: id? 'put': 'post',
    url: `cashgames/${id ?? ''}`,
    data: {
      big_blind, 
      small_blind, 
      in_for, 
      out_for, 
      date, 
      place_id,
    }
  });

  return data;
}

export const deleteCashgames = async (id) => {
  await axios.delete(`cashgames/${id}`);
}