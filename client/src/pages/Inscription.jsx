import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Inscription() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const emailRef = useRef();

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }
    const NewUser = {
      email,
      name,
      password,
    };
    const User = e.target;
    const UserData = new FormData(User);
    const Userjson = Object.fromEntries(UserData.entries());
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, Userjson);
      setUser(NewUser);
    } catch (error) {
      console.error("Erreur lors de la création du compte : ", error);
    }
  };

  return (
    <>
      <div className="inscription-polygon"> </div>
      <div className="inscription">
        <p className="inscription-accueil">
          Retour à
          <Link to="/" className="inscription-accueil-lien">
            {" "}
            l'accueil
          </Link>
        </p>
        <form className="inscription-formulaire" onSubmit={handleAddUser}>
          <div className="inscription-formulaire-champ">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre_email@mail.com"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inscription-formulaire-champ">
            <label htmlFor="name">Nom d'utilisateur ou Pseudo</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inscription-formulaire-champ">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inscription-formulaire-champ">
            <label htmlFor="confirmpassword">
              Confirmer votre mot de passe
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Confirmer votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="bouton-enregistrement" type="submit">
            S'enregistrer
          </button>
        </form>
        {user && ( // Utilisation de l'état user pour afficher un message de confirmation
          <div className="inscription-confirmation-message">
            <p className="inscription-confirmation-message-titre">
              Bienvenue, <span className="user-name">{user.name}</span> !
            </p>
            <p className="inscription-confirmation-message-texte">
              Votre compte a été créé avec succès.
            </p>
            <Link to="/connection">
              <button className="bouton-connection" type="button">
                Se connecter
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Inscription;
