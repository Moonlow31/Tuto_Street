import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexte/AuthContext";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleValidation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auths`,
        { email, password }
      );

      const userData = response.data;
      // Utilisation de la fonction login du contexte
      login(userData.token);

      // Stockage des données utilisateur dans le local storage
      localStorage.setItem("user", JSON.stringify(userData.user));

      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <>
      <div className="connexion-polygon"> </div>
      <div className="connexion">
        <form className="connexion-formulaire">
          <p className="connexion-accueil">
            Retour à
            <Link to="/" className="connexion-accueil-lien">
              {" "}
              l'accueil
            </Link>
          </p>
          <div className="connexion-formulaire-champ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="votre_email@mail.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="connexion-formulaire-champ">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            className="connexion-boutton"
            type="submit"
            onClick={handleValidation}
          >
            Connexion
          </button>
          <p className="connexion-inscription">
            Pas de compte ?
            <Link to="/inscription" className="connexion-inscription-lien">
              {" "}
              Inscrivez-vous
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Connexion;
