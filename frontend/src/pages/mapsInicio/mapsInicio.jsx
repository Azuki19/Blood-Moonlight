import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../components/sectionHeader/sectionHeader";
import Card from "../../components/card/card";
import Menu from "../../components/menu/menu";
import { mapsData } from "../../data/data";
import "./mapsInicio.css";
import socket from "../../socket/socket";

const MapsInicioPage = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [alive, setAlive] = useState(true);
  const [winner, setWinner] = useState(false);
  const [winnerId, setWinnerId] = useState(null);
  const [winnerName, setWinnerName] = useState("");

  const playerData = JSON.parse(localStorage.getItem("playerData") || "{}");

  useEffect(() => {
    if (!playerData?.playerId || !playerData?.roomId) {
      return navigate("/", { replace: true });
    }

    socket.emit("getRoomState", { roomId: playerData.roomId }, (room) => {
      if (!room) return;
      setPlayers(room.players);
      setCurrentTurn(room.currentTurn || 1);

      const me = room.players.find((p) => p.id === playerData.playerId);
      if (me) {
        setAlive(me.alive);
        setIsMyTurn(me.turnOrder === room.currentTurn && me.alive);
      }
    });

    const handleTurnUpdate = ({ currentTurn, players: updatedPlayers }) => {
      setPlayers(updatedPlayers);
      const me = updatedPlayers.find((p) => p.id === playerData.playerId);
      if (me) {
        setAlive(me.alive);
        setIsMyTurn(me.turnOrder === currentTurn && me.alive && !winner);
      }
    };

    const handleRoomUpdate = (updatedPlayers) => {
      setPlayers(updatedPlayers);
      const me = updatedPlayers.find((p) => p.id === playerData.playerId);
      if (me) setAlive(me.alive);
    };

    const handlePlayerWinner = ({ winnerId: id, winnerName: name }) => {
      setWinner(true);
      setWinnerId(id);
      setWinnerName(name);
      if (id === playerData.playerId) setIsMyTurn(false);
    };

    const handlePlayerGameOver = () => {
      setAlive(false);
      setIsMyTurn(false);
    };

    const handleRoundStarted = ({ round }) => {
      const me = players.find((p) => p.id === playerData.playerId);
      if (me?.alive) {
        navigate("/ronda", { replace: true, state: { round } });
      } else {
        console.log("Jugador muerto, no navega a /ronda");
      }
    };

    const handleGameEnded = ({ winnerId, winnerName }) => {
      localStorage.setItem(
        "gameWinner",
        JSON.stringify({ winnerId, winnerName })
      );
      navigate("/tablero", { replace: true });
    };

    socket.on("turnUpdated", handleTurnUpdate);
    socket.on("roomUpdate", handleRoomUpdate);
    socket.on("roundStarted", handleRoundStarted);
    socket.on("playerWinner", handlePlayerWinner);
    socket.on("playerGameOver", handlePlayerGameOver);
    socket.on("gameEnded", handleGameEnded);

    return () => {
      socket.off("turnUpdated", handleTurnUpdate);
      socket.off("roomUpdate", handleRoomUpdate);
      socket.off("roundStarted", handleRoundStarted);
      socket.off("playerWinner", handlePlayerWinner);
      socket.off("playerGameOver", handlePlayerGameOver);
      socket.off("gameEnded", handleGameEnded);
    };
  }, [playerData, navigate, winner]);

  const handleSelect = () => {
    if (!isMyTurn || selectedCard === null) return;

    socket.emit("mapSelected", {
      roomId: playerData.roomId,
      playerId: playerData.playerId,
      mapId: mapsData[selectedCard].id,
    });

    navigate("/cartas");
  };

  return (
    <div className="page maps-page">
      <SectionHeader
        title="¿En qué localidad caíste?"
        description="Lanza los dados, mueve tu ficha y selecciona la locación en que caíste."
      />

      {!alive && !winner && (
        <div className="overlay-block game-over">💀 GAME OVER</div>
      )}

      {winner && (
        <div className="overlay-block winner">
          🏆{" "}
          {winnerId === playerData.playerId ? "GANASTE" : `${winnerName} GANÓ`}
        </div>
      )}

      {alive && !isMyTurn && !winner && (
        <div className="overlay-block">Esperando tu turno...</div>
      )}

      <div className="cards-grid">
        {mapsData.map((map, index) => (
          <Card
            key={map.id}
            imageSrc={map.image}
            text={map.name}
            selected={selectedCard === index}
            onClick={() =>
              isMyTurn && alive && !winner && setSelectedCard(index)
            }
            disabled={!isMyTurn || !alive || winner}
          />
        ))}
      </div>

      {isMyTurn && alive && !winner && (
        <button
          className="maps-btn"
          onClick={handleSelect}
          disabled={selectedCard === null}
        >
          Seleccionar
        </button>
      )}

      <Menu />
    </div>
  );
};

export default MapsInicioPage;
