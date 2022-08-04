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
  //const [user] = useState({id:'d5a111a3-36ca-44d4-99ac-da70afad3a9b'})
  const [games, setGames] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentGame, setCurrentGame] = useState({});

  const refreshGames = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await gamesApi.getGames(user.id);
      setGames(data.data);
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshGames();
      setInitialLoad(true);
    }
    
    if(!authReady) {
      setInitialLoad(false)
    }
  },[user]);

  const createOrUpdateGame = useCallback(async ({
    id,
    place,
    type,
    inFor,
    outFor,
    par1,
    par2,
    date,
  }) => {
    try {
      setError();
      setLoading(true);
      const changedGame = await gamesApi.saveGames({
        id,
        place,
        type,
        inFor,
        outFor,
        par1,
        par2,
        date,
      });
      await refreshGames();
      return changedGame;
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshGames]);

  const deleteGame = useCallback(async(id) => {
    try {
      setError();
      setLoading(true);
      await gamesApi.deleteGame(id);
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
    games,
    error,
    loading,
    currentGame,
    initialLoad,
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