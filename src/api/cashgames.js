import { axios } from '.';


export const getCashgames = async (limit=12, offset=0) => {
  const id = "38fb2aac-544f-47a5-8658-6273936a9a2b";
  const { data } = await axios({
    method: 'get',
    url: `cashgames/user/${id}`,
    params: {
      limit,
      offset,
    }
  }
  );
  return data;
}

export const saveCashgames = async ({
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
  if (confirm("Do you want to delete this Cashgame?")) {
    await axios.delete(`cashgames/${id}`);
  }
}