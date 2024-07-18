import { createContext, useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        setIsAuthenticated(true);
        setIsAdmin(decodedToken.admin);

        // Récupération des détails de l'utilisateur depuis l'API si l'ID est présent
        if (decodedToken.id) {
          const fetchUser = async () => {
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/${decodedToken.id}`
              );
              setUser(response.data);
            } catch (error) {
              console.error(
                "Erreur lors de la récupération des informations de l'utilisateur",
                error
              );
            }
          };
          fetchUser();
        }
      }
    }
  }, []);

  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.admin);

      if (decodedToken.id) {
        const fetchUser = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/users/${decodedToken.id}`
            );
            setUser(response.data);
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des informations de l'utilisateur",
              error
            );
          }
        };
        fetchUser();
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
