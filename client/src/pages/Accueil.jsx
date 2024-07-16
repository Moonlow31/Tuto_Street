import { Link } from "react-router-dom";

function Accueil() {
  return (
    <>
      <div className="Accueil-polygon"> </div>
      <div className="Accueil">
        <div className="Accueil-intro">
          <h1 className="Accueil-intro-title">Bienvenue combattant</h1>
          <h1 className="Accueil-intro-title2">
            Si tu est ici, cela signifie que tu souhaite te battre !
          </h1>
        </div>
        <div className="Accueil-description">
          <h2 className="Accueil-description-title">
            Tuto Street qu'est ce que c'est ?
          </h2>
          <p className="Accueil-description-text">
            Tuto Street est un site pour aider les joueurs débutants à apprendre
            les bases du versus fighting, et tout particulièrement du jeux
            iconique "Street Fighter"
          </p>
        </div>
        <div className="Accueil-fight">
          <Link to="/fight">
            <button className="Accueil-button" type="button">
              Fight
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Accueil;
