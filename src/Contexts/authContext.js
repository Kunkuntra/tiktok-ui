import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, [token]);

  const login = ({ token, data }) => {
    console.log('new token: ', token);
    console.log('data: ', data);

    setToken(token);
    setUser(data); // data = { id, name }

    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(data));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isLoadingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
