import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../../socket/socket";
import "./board.css";

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [players, setPlayers] = useState([]);

  const nextRound = location.state?.nextRound;
  const continueGame = location.state?.continueGame;

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem("playerData") || "{}");
    if (!playerData?.roomId) return navigate("/", { replace: true });

    socket.emit("getRoomState", { roomId: playerData.roomId }, (room) => {
      if (room?.players) {
        const sorted = [...room.players].sort((a, b) => b.points - a.points);
        setPlayers(sorted);
      }
    });

    const timer = setTimeout(() => {
      if (continueGame) {
        navigate("/ronda", { state: { round: nextRound } });
      } else {
        navigate("/fin", { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, nextRound, continueGame]);

  return (
    <div className="page board-page">
      <div className="board-content">
        <h1 className="board-title">Tablero de puntos</h1>

        <ul className="board-list">
          {players.map((p, index) => (
            <li key={p.id} className="board-item">
              {index + 1}. {p.name} : {p.points} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BoardPage;
