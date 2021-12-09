import { axios } from '.';

export const getTournaments = async () => {
  const { data } = await axios.get(
    'tournaments',
    {
      params: {
        limit: 25,
        offset: 0,
      }
    }
  );
  return data;
}

export const saveTournament = async ({
  id, 
  finished, 
  entrants, 
  buyin, 
  cashed, 
  date, 
  place_id,
}) => {
  const { data } = await axios({
    method: id? 'put': 'post',
    url: `tournaments/${id ?? ''}`,
    data: {
      finished, 
      entrants, 
      buyin, 
      cashed, 
      date, 
      place_id,
    }
  });

  return data;
}

export const deleteTournament = async (id) => {
  await axios.delete(`tournaments/${id}`);
}