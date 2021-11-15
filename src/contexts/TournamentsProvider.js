import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import config from '../config.json';

export const TournamentsContext = createContext();
export const useTournaments = () => useContext(TournamentsContext);

export const TournamentsProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentTournament, setCurrentTournament] = useState({});

  const refreshTournaments = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {data} = await axios.get(`${config.base_url}tournaments?limit=25&offset=0`);
      setTournaments(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tournaments?.length === 0) {
      refreshTournaments();
    }
  }, [tournaments, refreshTournaments]);

  const createOrUpdateTournament = useCallback( async ({id, place_id, player_id, buyin, cashed, entrants, finished, date}) => {
    setError();
    setLoading(true);

    let data = { place_id, player_id, buyin, cashed, entrants, finished, date }
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}tournaments/${id ?? ''}`;

    try {
      const { changedTournament } = await axios({ method, url, data });
      await refreshTournaments();
      return changedTournament;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);      
    }
  }, [refreshTournaments]);

  const deleteTournament = useCallback( async (id) => {
    try {
      setError();
      setLoading(true);
      const { data } = await axios({ method: 'delete', url: `${config.base_url}tournaments/${id}` });
      refreshTournaments();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshTournaments]);

  const setTournamentToUpdate = useCallback((id) => {
    setCurrentTournament(id === null ? {} : tournaments.find((t) => t.id === id));
  }, [tournaments]);

  const value = useMemo(() => ({
    tournaments, error, loading, currentTournament,
    createOrUpdateTournament, deleteTournament, setTournamentToUpdate,
  }), [ tournaments, error, loading, currentTournament, createOrUpdateTournament, deleteTournament, setTournamentToUpdate ]);

  return(
    <TournamentsContext.Provider value = {value} >
      {children}
    </TournamentsContext.Provider>
  )
}