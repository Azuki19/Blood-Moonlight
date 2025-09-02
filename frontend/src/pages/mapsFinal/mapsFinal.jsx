import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../components/sectionHeader/sectionHeader";
import Card from "../../components/card/card";
import Menu from "../../components/menu/menu";
import { mapsData } from "../../data/data";
import socket from "../../socket/socket";
import toast, { Toaster } from "react-hot-toast";
import "./mapsFinal.css";

const MapsFinalPage = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [players, setPlayers] = useState([]);
  const playerData = JSON.parse(localStorage.getItem("playerData") || "{}");

  useEffect(() => {
    if (!playerData?.playerId || !playerData?.roomId) {
      navigate("/", { replace: true });
      return;
    }

    socket.emit("getRoomState", { roomId: playerData.roomId }, (room) => {
      if (!room) return;
      setPlayers(room.players);
    });

    const handleRoomUpdate = (updatedPlayers) => setPlayers(updatedPlayers);

    const handleGameEnded = ({ winnerId, winnerName }) => {
      localStorage.setItem(
        "gameWinner",
        JSON.stringify({ winnerId, winnerName })
      );

      navigate("/tablero", { replace: true });
    };

    socket.on("roomUpdate", handleRoomUpdate);
    socket.on("gameEnded", handleGameEnded);

    return () => {
      socket.off("roomUpdate", handleRoomUpdate);
      socket.off("gameEnded", handleGameEnded);
    };
  }, [playerData, navigate]);

  const handleSelect = () => {
    if (selectedCard === null) return;

    const mapId = mapsData[selectedCard].id;
    const updatedPlayerData = { ...playerData, finalMap: mapId };
    localStorage.setItem("playerData", JSON.stringify(updatedPlayerData));

    socket.emit("mapSelected", {
      roomId: playerData.roomId,
      playerId: playerData.playerId,
      mapId,
    });

    toast.success("Turno finalizado. Esperando tu turno...", {
      duration: 5000,
      position: "top-right",
      style: { minWidth: "250px" },
    });

    navigate("/perfil");
  };

  return (
    <div className="page maps-page">
      <Toaster />
      <SectionHeader title="¿En qué localidad terminaste?" description="" />

      <div className="cards-grid">
        {mapsData.map((map, index) => (
          <Card
            key={map.id}
            imageSrc={map.image}
            text={map.name}
            selected={selectedCard === index}
            onClick={() => setSelectedCard(index)}
          />
        ))}
      </div>

      <button
        className="maps-btn"
        onClick={handleSelect}
        disabled={selectedCard === null}
      >
        Seleccionar
      </button>

      <Menu />
    </div>
  );
};

export default MapsFinalPage;
