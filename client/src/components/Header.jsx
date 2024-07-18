import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <p className="header-title">Tuto Street</p>
      <div>
        <ul className="header-nav">
          <li className="header-li">
            <Link to="/">Accueil</Link>
          </li>
          <li className="header-li">
            <Link to="/fight">Fight</Link>
          </li>
          <li className="header-li">
            <Link to="/boutique">Boutique</Link>
          </li>
          <li className="header-li">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="header-li">
            <Link to="/connexion">Se connecter</Link>
          </li>
          <li className="header-li">
            <Link to="/inscription">S'inscrire</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
