import { useState } from "react";
import { useLoaderData } from "react-router-dom";

function Combat() {
  const personnages = useLoaderData();
  const [selectedPersonnage, setSelectedPersonnage] = useState(null);
  const [result, setResult] = useState("");
  const [fightMoney, setFightMoney] = useState(0);

  const determineResultat = (playerChoice, IAChoice) => {
    if (playerChoice === IAChoice) return "égualité";
    if (
      (playerChoice === "garde" && IAChoice === "coups") ||
      (playerChoice === "coups" && IAChoice === "chope") ||
      (playerChoice === "chope" && IAChoice === "garde")
    )
      return "gagné";
    return "perdu";
  };

  const handlePersonnageClick = (personnage) => {
    setSelectedPersonnage(personnage);
  };

  const handleKeyDown = (event, personnage) => {
    if (event.key === "Enter" || event.key === " ") {
      handlePersonnageClick(personnage);
    }
  };

  const handleChoiceClick = async (choice) => {
    const choices = ["garde", "coups", "chope"];
    const IAChoice = choices[Math.floor(Math.random() * choices.length)];
    const resultat = determineResultat(choice, IAChoice);

    const updateFightMoneyInDatabase = async (money) => {
      await fetch("/api/users/:id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ money }),
      });
    };

    if (resultat === "gagné") {
      setFightMoney(fightMoney + 10);
      await updateFightMoneyInDatabase(10);
      setResult(`Vous avez gagné ! L'IA a choisi ${IAChoice}.`);
    } else if (resultat === "perdu") {
      setResult(`Vous avez perdu. L'IA a choisi ${IAChoice}.`);
    } else {
      setResult(`Égalité. L'IA a choisi ${IAChoice}.`);
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
          C'est la situation dans laquelle tu te trouve quand tu es au corps à
          corps de ton adversaire (collé à lui). <br />
          Dans cette situation, tu va devoir faire un choix ! <br />
          En effet, dans les jeux de combat il existe une triangulaire bien
          connue :<br />
          <br />
          - La chope gagné contre la garde <br />
          - La garde gagné contre les coups <br />
          - Les coups gagnént contre la chope <br />
          <br />
          Mais que se passe t'il en cas d'égalité ? <br />
          <br />
          - chope VS chope = le défenseur effectue une déchope <br />
          - garde VS garde = il ne se passe rien <br />
          - coups VS coups = celui qui a tapé le premier gagné (en général
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
          - En cas d'égalité personne ne gagné <br />
          - En cas de victoire tu gagnés de la FightMoney <br />- La FightMoney
          te servira à acheter de nouveaux personnages
        </p>
      </div>
      {!selectedPersonnage ? (
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
                  className="Combat-jeux-personnage-image"
                  src={personnage.image}
                  alt={personnage.name}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
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
          {result && <p className="Combat-result">{result}</p>}
        </div>
      )}
    </div>
  );
}

export default Combat;
