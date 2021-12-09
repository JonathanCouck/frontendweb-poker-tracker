import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import * as placesApi from '../api/places';
import { useSession } from './AuthProvider';

export const PlacesContext = createContext();
export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvider = ({
  children
}) => {
  const { ready: authReady } = useSession();
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  const refreshPlaces = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {
        data
      } = await await placesApi.getAllPlaces();
      setPlaces(data);
      return data.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  }, []);
  
  useEffect(()=> {
    if (authReady && !initialLoad) {
      refreshPlaces();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshPlaces]);
  
  const value = useMemo(() => ({
    places,
    error,
    loading,
  }), [places, error, loading]);

  return (
    <PlacesContext.Provider value={value} >
      {children}
    </PlacesContext.Provider>
  )
};