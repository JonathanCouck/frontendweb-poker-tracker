import { axios } from '.';

export const getTournaments = async () => {
  const id = "38fb2aac-544f-47a5-8658-6273936a9a2b";
  const { data } = await axios({
    method: 'get',
    url: `tournaments/user/${id}`,
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
  if (confirm("Do you want to delete this Tournament?")) {
    await axios.delete(`tournaments/${id}`);
  }
}