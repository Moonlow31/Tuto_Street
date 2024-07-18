import { createContext, useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setIsAuthenticated(true);
        setIsAdmin(decodedToken.admin);
      }
    }
  }, []);

  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.admin);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      isAdmin,
      login,
      logout,
    }),
    [isAuthenticated, isAdmin]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
