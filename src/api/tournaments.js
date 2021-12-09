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
  userId,
  placeId,
  entrants,
  finished,
  buyin,
  cashed,
  date,
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
      placeId,
      userId,
    }
  });

  return data;
}

export const deleteTournament = async (id) => {
  await axios.delete(`tournaments/${id}`);
}