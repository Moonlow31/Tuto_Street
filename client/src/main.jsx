import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexte/AuthContext";

// Import du Composant App
import App from "./App";

// Import des pages
import Accueil from "./pages/Accueil";
import Combat from "./pages/Combat";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";

// définition "en dur" de l'utilisateur
/* const user = {
  id: 1,
  email: "test@gmail.com",
  name: "test",
  password: "test",
  money: 0,
}; */

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/fight",
        element: <Combat /* user={user} */ />,
        loader: async () => {
          const charactersResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/characters`
          );
          return charactersResponse.data;
        },
      },
    ],
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
]);

// Rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
