import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import config from '../config.json';

export const UsersContext = createContext();
export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentUsers, setCurrentUsers] = useState({});

  const refreshUsers = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {data} = await axios.get(`${config.base_url}users`);
      setUsers(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (users?.length === 0) {
      refreshUsers();
    }
  }, [users, refreshUsers]);

  const createOrUpdateUsers = useCallback( async ({id, favorite_place_id, first_name, last_name, password, birth_date, username}) => {
    setError();
    setLoading(true);

    let data = { id, favorite_place_id, first_name, last_name, password, birth_date, username }
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}users/${id ?? ''}`;

    try {
      const { changedUsers } = await axios({ method, url, data });
      await refreshUsers();
      return changedUsers;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);      
    }
  }, [refreshUsers]);

  const deleteUsers = useCallback( async (id) => {
    try {
      setError();
      setLoading(true);
      const { data } = await axios({ method: 'delete', url: `${config.base_url}users/${id}` });
      refreshUsers();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshUsers]);

  const setUsersToUpdate = useCallback((id) => {
    setCurrentUsers(id === null ? {} : users.find((t) => t.id === id));
  }, [users]);

  const value = useMemo(() => ({
     users, error, loading, currentUsers,
     createOrUpdateUsers, deleteUsers, setUsersToUpdate,
  }), [ users, error, loading, currentUsers, createOrUpdateUsers, deleteUsers, setUsersToUpdate ]);

  return(
    <UsersContext.Provider value = {value} >
      {children}
    </UsersContext.Provider>
  )
}