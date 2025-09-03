import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../../components/menu/menu";
import "./votingResultPage.css";

const VotingResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { stakedPlayer, wasInfected, nextRound, gameEnded } = state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      // 👇 Si el juego terminó, vamos directo a /fin
      if (gameEnded) {
        navigate("/fin", { replace: true });
      } else {
        // 👇 Si no, vamos a tablero con la banderita
        navigate("/tablero", { state: { nextRound, continueGame: true } });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, nextRound, gameEnded]);

  if (!stakedPlayer) return <p>Error: no data</p>;

  return (
    <div className="page-voting-result result-page">
      <h2>
        Han estacado a <strong>{stakedPlayer.name}</strong> a los ojos de la
        luna carmesí.
      </h2>
      {wasInfected ? (
        <p>
          {stakedPlayer.name.toUpperCase()} ERA EL INFECTADO 🩸 <br /> +20 pts
        </p>
      ) : (
        <p>
          {stakedPlayer.name.toUpperCase()} NO ERA EL INFECTADO 💀 <br /> -20
          pts
        </p>
      )}
      <Menu />
    </div>
  );
};

export default VotingResultPage;
