import axios from "axios";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import du Composant App
import App from "./App";

// Import des pages
import Accueil from "./pages/Accueil";
import Combat from "./pages/Combat";
import Inscription from "./pages/Inscription";
import Connection from "./pages/Connection";

// définition "en dur" de l'utilisateur
const user = {
  id: 1,
  email: "test@gmail.com",
  name: "test",
  password: "test",
  money: 0,
};

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
        element: <Combat user={user} />,
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
    path: "/connection",
    element: <Connection />,
  },
]);

// rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
