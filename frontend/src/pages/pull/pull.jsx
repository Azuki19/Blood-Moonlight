import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../../socket/socket";
import Card from "../../components/card/card";
import Menu from "../../components/menu/menu";
import SectionHeader from "../../components/sectionHeader/sectionHeader";
import toast, { Toaster } from "react-hot-toast";
import "./pull.css";

const PullPage = () => {
  const [players, setPlayers] = useState([]);
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [round, setRound] = useState(1);
  const [votingResult, setVotingResult] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const playerData = JSON.parse(localStorage.getItem("playerData") || "{}");
  const playerId = playerData?.playerId;
  const roomId = playerData?.roomId;

  useEffect(() => {
    if (location.state?.round) {
      setRound(location.state.round);
    }
  }, [location.state]);

  useEffect(() => {
    if (!roomId || !playerId) return;

    socket.emit("getRoomState", { roomId }, (room) => {
      if (!room) return;

      const alivePlayers = room.players.filter(
        (p) => p.alive && p.id !== playerId
      );
      setPlayers(alivePlayers);

      setRound(room.round ?? round);
    });

    const handleRoomUpdate = (updatedPlayers) => {
      const alivePlayers = updatedPlayers.filter(
        (p) => p.alive && p.id !== playerId
      );
      setPlayers(alivePlayers);
    };

    const handleVotingRound = ({ players = [], round }) => {
      setRound(round);
      const alivePlayers = players.filter((p) => p.alive && p.id !== playerId);
      setPlayers(alivePlayers);
      setHasVoted(false);
      setVotedPlayer(null);
      setVotingResult(null);
    };

    const handleVotingEnded = ({
      eliminated,
      wasInfected,
      updatedPlayers = [],
      nextRound,
    }) => {
      const alivePlayers = updatedPlayers.filter(
        (p) => p.alive && p.id !== playerId
      );
      setPlayers(alivePlayers);

      navigate("/resultado-votacion", {
        state: { stakedPlayer: eliminated, wasInfected, nextRound },
      });
    };

    socket.on("roomUpdate", handleRoomUpdate);
    socket.on("votingRound", handleVotingRound);
    socket.on("votingEnded", handleVotingEnded);

    return () => {
      socket.off("roomUpdate", handleRoomUpdate);
      socket.off("votingRound", handleVotingRound);
      socket.off("votingEnded", handleVotingEnded);
    };
  }, [playerId, roomId, navigate, round]);

  const handleVote = (targetId) => setVotedPlayer(targetId);

  const submitVote = () => {
    if (!votedPlayer) return;

    socket.emit("submitVote", {
      roomId,
      voterId: playerId,
      votedPlayerId: votedPlayer,
    });
    setHasVoted(true);
  };

  const votingRounds = [4, 8, 12, 16];
  const isVotingRound = votingRounds.includes(round);

  return (
    <div className="page">
      <Toaster />
      {!isVotingRound ? (
        <div className="waiting-container">
          <h2 className="waiting-title">VOTACIÓN BLOQUEADA</h2>
          <p className="waiting-description">
            Espera a que sea la ronda de votación. Si tienes sospechas de
            alguien, habla con tus compañeros vampíricos y diríjanse al centro
            del tablero.
          </p>
          <img
            src="/images/murcielago.png"
            alt="Vampiro"
            className="waiting-image"
          />
        </div>
      ) : (
        <>
          <SectionHeader
            title="VOTACIÓN"
            description="Confirma tus sospechas, ¡estaca al vampiro sombrío!"
          />
          <div className="vote-grid">
            {players.map((player) => (
              <Card
                key={player.id}
                imageSrc={player.image || "/images/default-avatar.png"}
                text={player.name}
                onClick={() => handleVote(player.id)}
                selected={votedPlayer === player.id}
              />
            ))}
          </div>
          <button
            className="pull-btn"
            onClick={submitVote}
            disabled={!votedPlayer || hasVoted}
          >
            {hasVoted ? "Esperando a los demás..." : "Estacar"}
          </button>
        </>
      )}
      <Menu />
    </div>
  );
};

export default PullPage;
