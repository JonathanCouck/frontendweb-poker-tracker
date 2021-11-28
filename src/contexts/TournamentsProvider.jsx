import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import * as tournamentsApi from '../api/tournaments';
import { useSession } from './AuthProvider';

export const TournamentsContext = createContext();
export const useTournaments = () => useContext(TournamentsContext);

export const TournamentsProvider = ({
  children
}) => {
  const { ready: authReady, user } = useSession();
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentTournament, setCurrentTournament] = useState({});

  const refreshTournaments = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await tournamentsApi.getUserTournaments(user.id);
      setTournaments(data.data)
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshTournaments();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshTournaments]);

  const createOrUpdateTournament = useCallback(async ({
    id,
    placeId,
    entrants,
    finished,
    buyin,
    cashed,
    date,
    playerId,
  }) => {
    try {
      setError();
      setLoading(true);
      const changedTournament = await tournamentsApi.saveTournament({
        id,
        placeId,
        entrants,
        finished,
        buyin,
        cashed,
        date,
        playerId,
      });
      await refreshTournaments();
      return changedTournament;
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshTournaments]);

  const deleteTournament = useCallback(async(id) => {
    try {
      setError();
      setLoading(true);
      await tournamentsApi.deleteTournament(id);
      refreshTournaments();
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshTournaments]);

  const setTournamentToUpdate = useCallback((id) => {
    setCurrentTournament(id === null ? {}: tournaments.find((tour) => tour.id === id));
  }, [tournaments]);

  const value = useMemo(() => ({
    tournaments,
    error,
    loading,
    currentTournament,
    createOrUpdateTournament,
    deleteTournament,
    setTournamentToUpdate,
  }), [
    tournaments, error, loading, currentTournament, 
    createOrUpdateTournament, deleteTournament, setTournamentToUpdate
  ]);

  return (
    <TournamentsContext.Provider value={value} >
      {children}
    </TournamentsContext.Provider>
  )
}