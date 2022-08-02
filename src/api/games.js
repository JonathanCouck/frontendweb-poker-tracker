import { axios } from '.';

export const getGames = async (id, limit=12, offset=0) => {
  const { data } = await axios({
    method: 'get',
    url: `games/user/${id}`,
    params: {
      limit,
      offset,
    }
  }
  );
  return data;
}

export const saveGames = async ({
  id,
  userId,
  placeId,
  smallBlind,
  bigBlind,
  inFor,
  outFor,
  date,
}) => {
  const { data } = await axios ({
    method: id? 'put': 'post',
    url: `games/${id ?? ''}`,
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

export const deleteGames = async (id) => {
  if (confirm("Do you want to delete this Game?")) {
    await axios.delete(`games/${id}`);
  }
}