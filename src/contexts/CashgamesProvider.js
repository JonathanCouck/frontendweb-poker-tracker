import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import config from '../config.json';

export const CashgamesContext = createContext();
export const useCashgames = () => useContext(CashgamesContext);

export const CashgamesProvider = ({ children }) => {
  const [cashgames, setCashgames] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentCashgame, setCurrentCashgame] = useState({});

  const refreshCashgames = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {data} = await axios.get(`${config.base_url}cashgames?limit=25&offset=0`);
      setCashgames(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cashgames?.length === 0) {
      refreshCashgames();
    }
  }, [cashgames, refreshCashgames]);

  const createOrUpdateCashgame = useCallback( async ({ id, place_id, player_id, big_blind, small_blind, in_for, out_for, date }) => {
    setError();
    setLoading(true);

    let data = { id, place_id, player_id, big_blind, small_blind, in_for, out_for, date }
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}cashgames/${id ?? ''}`;

    try {
      const { changedCashgame } = await axios({ method, url, data });
      await refreshCashgames();
      return changedCashgame;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);      
    }
  }, [refreshCashgames]);

  const deleteCashgame = useCallback( async (id) => {
    try {
      setError();
      setLoading(true);
      const { data } = await axios({ method: 'delete', url: `${config.base_url}cashgames/${id}` });
      refreshCashgames();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshCashgames]);

  const setCashgameToUpdate = useCallback((id) => {
    setCurrentCashgame(id === null ? {} : cashgames.find((t) => t.id === id));
  }, [cashgames]);

  const value = useMemo(() => ({
    cashgames, error, loading, currentCashgame,
    createOrUpdateCashgame, deleteCashgame, setCashgameToUpdate,
  }), [ cashgames, error, loading, currentCashgame, createOrUpdateCashgame, deleteCashgame, setCashgameToUpdate ]);

  <CashgamesContext.Provider value = {value} >
    {children}
  </CashgamesContext.Provider>
}