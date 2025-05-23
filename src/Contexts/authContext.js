import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken') || '');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // eslint-disable-next-line no-unused-vars
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    setToken(savedToken ?? ''); // fallback chuỗi rỗng nếu null

    const savedUser = localStorage.getItem('authUser');
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, []);

  const login = ({ token, data }) => {
    const safeToken = token || '';
    setToken(safeToken);
    setUser(data);

    localStorage.setItem('authToken', safeToken);
    localStorage.setItem('authUser', JSON.stringify(data));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.setItem('authToken', ''); // overwrite thành chuỗi rỗng
    localStorage.removeItem('authUser');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isLoadingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    // fallback khi context lỗi
    return {
      token: '',
      user: null,
      isAuthenticated: false,
      isLoadingUser: false,
      login: () => {},
      logout: () => {},
    };
  }

  const finalToken = context.token ?? '';
  return { ...context, token: finalToken };
};
