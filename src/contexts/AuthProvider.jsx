import { 
  createContext, 
  useMemo, 
  useState, 
  useCallback, 
  useEffect, 
  useContext 
} from 'react';
import { useTranslation } from 'react-i18next';
import * as usersApi from '../api/users';
import * as api from '../api';
import config from '../config.json';

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

function parseJwt(token) {
  if(!token) return {};
  const base64Url = token.split('.')[1];
  const payload = Buffer.from(base64Url, 'base64');
  const jsonPayload = payload.toString('ascii');
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if(!exp) return null;
  if(typeof exp !== 'number') exp = Number(exp);
  if(isNaN(exp)) return null;

  return new Date(exp*1000);
}

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { token, user, ready, loading, error } = useAuth();
  return {
    token,
    user,
    ready,
    error,
    loading,
    isAuthed: Boolean(token),
  };
}

export const useLogin = () => {
  const { login } = useAuth();
  return login;
}

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
}

export const useRegister = () => {
  const { register } = useAuth();
  return register;
}

export const AuthProvider = ({
  children,
}) => {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState({});

  const setSession = useCallback( async (token, user) => {
    const { exp, userId } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }
    
    api.setAuthToken(token);
    setToken(token);
    setReady(token && stillValid);

    if (!user && stillValid) {
      user = await usersApi.getUserById(userId);
    }
    setUser(user);
  }, []);

  useEffect(() => {
    setSession(token);
  }, [token, setSession]);

  const login = useCallback(async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      const {token, user} = await usersApi.login(username, password);
      await setSession(token, user);
      return true;
    } catch(err) {
      console.error(err);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const logout = useCallback(() => {
    setSession(null)
  }, [setSession]);

  const register = useCallback( async( username, password ) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await usersApi.register({username, password});
      setUser(user);
      setSession(token);
      return true;
    } catch (err) {
      console.error(err);
      setError('Register failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession])

  const value = useMemo(() => ({
    token,
    user,
    ready,
    loading,
    error,
    login,
    logout,
    register,
  }), [token, user, ready, loading, error, login, logout, register]);

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  )
}