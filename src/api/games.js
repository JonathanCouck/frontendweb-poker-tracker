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
  place,
  type,
  inFor,
  outFor,
  par1,
  par2,
  date,
}) => {
  const { data } = await axios ({
    method: id? 'put': 'post',
    url: `games/${id ?? ''}`,
    data: {
      place,
      type,
      inFor,
      outFor,
      par1,
      par2,
      date,
    }
  });
  return data;
}

export const deleteGame = async (id) => {
  await axios.delete(`games/${id}`);
}