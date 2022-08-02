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
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [initialLoad, setInitialLoad] = useState(false);

  const refreshPlaces = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await placesApi.getAllPlaces();
      setPlaces(data.data);
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

  const createOrUpdatePlace = useCallback(async ({
    id, name, country, website
  }) => {
    try {
      setError();
      setLoading(true);
      const changedPlace = await placesApi.savePlace({
        id, name, country, website
      });
      await refreshPlaces();
      return changedPlace;
    } catch(error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshPlaces])

  const setPlaceToUpdate = useCallback( async (id) => {
    await setCurrentPlace(id === null ? {} : places.find(p => p.id === id));
  }, [places]);

  const deletePlace = useCallback(async (id) => {
    setLoading(true);
    setError();
    try {
      await placesApi.deletePlace(id);
      refreshPlaces();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  },[refreshPlaces])
  
  const value = useMemo(() => ({
    currentPlace,
    places,
    error,
    loading,
    setPlaceToUpdate,
    createOrUpdatePlace,
    deletePlace,
  }), [currentPlace, places, error, loading, setPlaceToUpdate, deletePlace, createOrUpdatePlace]);

  return (
    <PlacesContext.Provider value={value} >
      {children}
    </PlacesContext.Provider>
  )
};