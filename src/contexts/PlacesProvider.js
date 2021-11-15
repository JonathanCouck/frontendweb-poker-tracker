import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import config from '../config.json';

export const PlacesContext = createContext();
export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPlace, setCurrentPlace] = useState({});

  const refreshPlaces = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {data} = await axios.get(`${config.base_url}places?limit=16&offset=0`);
      setPlaces(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (places?.length === 0) {
      refreshPlaces();
    }
  }, [places, refreshPlaces]);

  const createOrUpdatePlace = useCallback( async ({ id, name, country, city, postal_code, street, house_number }) => {
    setError();
    setLoading(true);

    let data = { id, name, country, city, postal_code, street, house_number }
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}places/${id ?? ''}`;

    try {
      const { changedPlace } = await axios({ method, url, data });
      await refreshPlaces();
      return changedPlace;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);      
    }
  }, [refreshPlaces]);

  const deletePlace = useCallback( async (id) => {
    try {
      setError();
      setLoading(true);
      const { data } = await axios({ method: 'delete', url: `${config.base_url}places/${id}` });
      refreshPlaces();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshPlaces]);

  const setPlaceToUpdate = useCallback((id) => {
    setCurrentPlace(id === null ? {} : places.find((t) => t.id === id));
  }, [places]);

  const value = useMemo(() => ({
    places, error, loading, currentPlace,
    createOrUpdatePlace, deletePlace, setPlaceToUpdate,
  }), [ places, error, loading, currentPlace, createOrUpdatePlace, deletePlace, setPlaceToUpdate ]);

  return(
    <PlacesContext.Provider value = {value} >
      {children}
    </PlacesContext.Provider>
  )
}