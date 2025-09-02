import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../../components/menu/menu";
import "./votingResultPage.css";

const VotingResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { stakedPlayer, wasInfected, nextRound } = state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/ronda", { state: { round: nextRound } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, nextRound]);

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
