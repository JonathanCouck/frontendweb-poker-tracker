import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import * as cashgamesApi from '../api/cashgames';
import { useSession } from './AuthProvider';

export const CashgamesContext = createContext();
export const useCashgames = () => useContext(CashgamesContext);

export const CashgamesProvider = ({
  children
}) => {
  const { ready: authReady, user } = useSession();
  const [cashgames, setCashgames] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentCashgame, setCurrentCashgame] = useState({});

  const refreshCashgames = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await cashgamesApi.getCashgames(12, page*12);
      setCashgames(data.data);
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshCashgames();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshCashgames]);

  const createOrUpdateCashgame = useCallback(async ({
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
      const changedCashgame = await cashgamesApi.saveCashgames({
        id,
        userId: user.id,
        placeId,
        smallBlind,
        bigBlind,
        inFor,
        outFor,
        date,
      });
      await refreshCashgames();
      return changedCashgame;
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshCashgames, user]);

  const deleteCashgame = useCallback(async(id) => {
    try {
      setError();
      setLoading(true);
      await cashgamesApi.deleteCashgames(id);
      refreshCashgames();
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshCashgames]);

  const setCashgameToUpdate = useCallback((id) => {
    setCurrentCashgame(id === null ? {}: cashgames.find((cash) => cash.id === id));
  }, [cashgames])

  const value = useMemo(() => ({
    cashgames,
    page,
    error,
    loading,
    currentCashgame,
    setPage,
    createOrUpdateCashgame,
    deleteCashgame,
    setCashgameToUpdate,
  }), [
    cashgames, error, loading, currentCashgame,
    createOrUpdateCashgame, deleteCashgame, setCashgameToUpdate,
  ]);

  return (
    <CashgamesContext.Provider value={value} >
      {children}
    </CashgamesContext.Provider>
  )
}