import { createContext, useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();
const savedToken = localStorage.getItem("token");

const decodeToken = (token) => JSON.parse(atob(token.split(".")[1]));

const fetchUser = async (decodedToken) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/${decodedToken.userId}`, {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      }
    );
    const {data} = response;  // Correction ici
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur",
      error
    );
    return null; // Ajout d'un retour explicite en cas d'erreur
  }
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      if (savedToken) {
        const decodedToken = decodeToken(savedToken);
        if (decodedToken) {
          setIsAuthenticated(true);
          setIsAdmin(decodedToken.isAdmin);

          if (decodedToken.userId) {
            const fetchedUser = await fetchUser(decodedToken);
            setUser(fetchedUser);
          }
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (newToken) => { // Renommage de 'token' en 'newToken'
    const decodedToken = decodeToken(newToken);

    if (decodedToken) {
      localStorage.setItem("token", newToken);
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.isAdmin);

      if (decodedToken.userId) {
        const fetchedUser = await fetchUser(decodedToken);
        setUser(fetchedUser);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  };

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      isAdmin,
      user,
      login,
      logout,
      fetchUser
    }),
    [isAuthenticated, isAdmin, user]
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
