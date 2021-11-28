import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import axios from 'axios';
import config from '../config.json';

export const PlacesContext = createContext();
export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvider = ({
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(false)
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  const refreshPlaces = useCallback(async () => {try {
    setError();
    setLoading(true);
    const {
      data
    } = await axios.get(`${config.base_url}places`);
    setPlaces(data.data);
    return data.data;
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false)
  }
  }, []);
  
  useEffect(()=> {
    if (!initialLoad) {
      refreshPlaces();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshPlaces]);
  
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