import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import * as gamesApi from '../api/games';
import { useSession } from './AuthProvider';

export const GamesContext = createContext();
export const useGames = () => useContext(GamesContext);

export const GamesProvider = ({
  children
}) => {
  const { ready: authReady, user } = useSession();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentGame, setCurrentGame] = useState({});

  const refreshGames = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await gamesApi.getGames(user.id, 12, page*12);
      setGames(data.data);
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshGames();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshGames]);

  const createOrUpdateGame = useCallback(async ({
    id,
    placeId,
    smallBlind,
    bigBlind,
    inFor,
    outFor,
    date,
  }) => {
    try {
      setError();
      setLoading(true);
      const changedGame = await gamesApi.saveGames({
        id,
        userId: user.id,
        placeId,
        smallBlind,
        bigBlind,
        inFor,
        outFor,
        date,
      });
      await refreshGames();
      return changedGame;
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshGames, user]);

  const deleteGame = useCallback(async(id) => {
    try {
      setError();
      setLoading(true);
      await gamesApi.deleteGames(id);
      refreshGames();
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshGames]);

  const setGameToUpdate = useCallback((id) => {
    setCurrentGame(id === null ? {}: games.find((game) => game.id === id));
  }, [games])

  const value = useMemo(() => ({
    games: games,
    page,
    error,
    loading,
    currentGame: currentGame,
    initialLoad,
    setPage,
    createOrUpdateGame,
    deleteGame,
    setGameToUpdate,
  }), [
    games, error, loading, currentGame, initialLoad,
    createOrUpdateGame, deleteGame, setGameToUpdate,
  ]);

  return (
    <GamesContext.Provider value={value} >
      {children}
    </GamesContext.Provider>
  )
}