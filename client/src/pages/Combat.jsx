import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

function Combat({ user }) {
  const personnages = useLoaderData();
  const [selectedPersonnage, setSelectedPersonnage] = useState(null);
  const [result, setResult] = useState("");
  const [fightMoney, setFightMoney] = useState(user.money);
  const [hasWon, setHasWon] = useState(false);

  const determineResultat = (playerChoice, IAChoice) => {
    if (playerChoice === IAChoice) return "égalité";
    if (
      (playerChoice === "garde" && IAChoice === "coups") ||
      (playerChoice === "coups" && IAChoice === "chope") ||
      (playerChoice === "chope" && IAChoice === "garde")
    )
      return "gagné";
    return "perdu";
  };

  const playSelectionSound = () => {
    const audio = new Audio("/character_selected.mp3");
    audio.play();
  };

  const handlePersonnageClick = (personnage) => {
    setSelectedPersonnage(personnage);
    playSelectionSound();
  };

  const handleKeyDown = (event, personnage) => {
    if (event.key === "Enter" || event.key === " ") {
      handlePersonnageClick(personnage);
    }
  };

  const updateFightMoneyInDatabase = async (money) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${user.id}/money`,
        {
          money,
        }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la FightMoney", error);
    }
  };

  const handleChoiceClick = async (choice) => {
    const choices = ["garde", "coups", "chope"];
    const IAChoice = choices[Math.floor(Math.random() * choices.length)];
    const resultat = determineResultat(choice, IAChoice);

    if (resultat === "gagné") {
      const updatedFightMoney = fightMoney + 10;
      setFightMoney(updatedFightMoney);
      await updateFightMoneyInDatabase(updatedFightMoney);
      setResult(`Vous avez gagné ! L'adversaire a choisi ${IAChoice}.`);
      setHasWon(true);
    } else if (resultat === "perdu") {
      setResult(`Vous avez perdu. L'adversaire a choisi ${IAChoice}.`);
      setHasWon(false);
    } else {
      setResult(`Égalité. L'adversaire a choisi ${IAChoice}.`);
      setHasWon(false);
    }
  };

  return (
    <div className="Combat">
      <div className="Combat-description">
        <h1 className="Combat-description-titre">Chope ou pas chope</h1>
        <p className="Combat-description-texte">
          Ici nous allons voir la notion de "chope ou pas chope".
          <br />
          <br />
          C'est la situation dans laquelle tu te trouves quand tu es au corps à
          corps de ton adversaire (collé à lui). <br />
          Dans cette situation, tu vas devoir faire un choix ! <br />
          En effet, dans les jeux de combat il existe une triangulaire bien
          connue :<br />
          <br />
          - La chope gagne contre la garde <br />
          - La garde gagne contre les coups <br />
          - Les coups gagnent contre la chope <br />
          <br />
          Mais que se passe t'il en cas d'égalité ? <br />
          <br />
          - chope VS chope = le défenseur effectue une déchope <br />
          - garde VS garde = il ne se passe rien <br />
          - coups VS coups = celui qui a tapé le premier gagne (en général
          l'attaquant)
          <br />
          <br />
          Le mini-jeux que tu trouveras plus bas reprend ce concept, il devrait
          t'aider à mémoriser cette notion.
        </p>
      </div>
      <div className="Combat-regles">
        <h2 className="Combat-regles-titre">Règles</h2>
        <p className="Combat-regles-texte">
          - On considère que les deux personnages sont aux portes du KO (1
          round)
          <br />
          - En cas d'égalité personne ne gagne <br />
          - En cas de victoire tu gagnes de la FightMoney <br />- La FightMoney
          te servira à acheter de nouveaux personnages
        </p>
      </div>
      <div className="Combat-jeux">
        <h2 className="Combat-jeux-titre">Choisissez votre personnage</h2>
        <div className="Combat-jeux-liste">
          {personnages.map((personnage) => (
            <div
              className="Combat-jeux-personnage"
              key={personnage.id}
              role="button"
              tabIndex={0}
              onClick={() => handlePersonnageClick(personnage)}
              onKeyDown={(event) => handleKeyDown(event, personnage)}
            >
              <p className="Combat-jeux-personnage-name">{personnage.name}</p>
              <img
                className={`Combat-jeux-personnage-image ${
                  selectedPersonnage?.id === personnage.id ? "selected" : ""
                }`}
                src={personnage.image}
                alt={personnage.name}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedPersonnage && (
        <div className="Combat-choice">
          <h2 className="Combat-choice-titre">Choisissez votre action</h2>
          <div className="Combat-choice-buttons">
            <button type="button" onClick={() => handleChoiceClick("garde")}>
              Garde
            </button>
            <button type="button" onClick={() => handleChoiceClick("coups")}>
              Coups
            </button>
            <button type="button" onClick={() => handleChoiceClick("chope")}>
              Chope
            </button>
          </div>
        </div>
      )}
      <div className="Combat-resultas">
        {result && <p className="Combat-resultas-texte">{result}</p>}
        {!hasWon && result && (
          <div className="Combat-perdu">
            <p>Vous ne gagnez pas de FightMoney.</p>
          </div>
        )}
        {hasWon && (
          <div className="Combat-gagne">
            <p>Vous gagnez 10 FightMoney !</p>
          </div>
        )}
        {result && (
          <p className="Combat-money">Votre FightMoney : {fightMoney}</p>
        )}
      </div>
    </div>
  );
}

Combat.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
  }).isRequired,
};

export default Combat;
