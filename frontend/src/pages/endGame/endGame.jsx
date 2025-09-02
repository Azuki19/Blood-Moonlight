import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./endGame.css";

const EndGamePage = () => {
  const navigate = useNavigate();
  const [winnerName, setWinnerName] = useState("Alguien");

  useEffect(() => {
    const winnerData = JSON.parse(localStorage.getItem("gameWinner") || "{}");
    if (winnerData?.winnerName) {
      setWinnerName(winnerData.winnerName);
    }
  }, []);

  const handleExit = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="page end-game-page">
      <div className="end-game-content">
        <h3 className="end-game-title">
          {winnerName} ahora es el vampiro heredero del Trono de La Noche
        </h3>
        <h2 className="text-style">¡FELICIDADES!</h2>
        <img src="/images/murcielago.png" alt="pull" className="pull-image" />
        <h2 className="text-style">FIN</h2>

        <button onClick={handleExit} className="end-game-btn">
          SALIR AL MENÚ PRINCIPAL
        </button>
      </div>
    </div>
  );
};

export default EndGamePage;
