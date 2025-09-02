const express = require("express");
const missions = require("./missions");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let rooms = {};

const getRoom = (roomId) => rooms[roomId];
const getPlayer = (room, id) => room?.players.find((p) => p.id === id);
const getAlivePlayers = (room) => room.players.filter((p) => p.alive);

const emitRoomUpdate = (roomId) => {
  const room = getRoom(roomId);
  if (room) io.to(roomId).emit("roomUpdate", room.players);
};

const createPlayer = ({ id, name = "Jugador", isHost = false }) => ({
  id,
  name: isHost ? "Jugador Admin" : name,
  points: 20,
  role: "vampiro común",
  ronda: 1,
  image: "/images/userImage.png",
  alive: true,
  infectionRounds: 0,
  lastSeenRound: 0,
  missionsCompleted: [],
});

const markPlayerDead = (player, roomId) => {
  player.points = 0;
  player.alive = false;
  io.to(player.id).emit("playerGameOver");
  emitRoomUpdate(roomId);
};

const assignNewInfectedIfNeeded = (room) => {
  if (!room.players.find((p) => p.role === "Vampiro infectado")) {
    const alive = getAlivePlayers(room);
    if (alive.length > 0) {
      const newInfected = alive[Math.floor(Math.random() * alive.length)];
      newInfected.role = "Vampiro infectado";
      newInfected.infectionRounds = 0;
      io.to(room.roomId).emit("infectionChanged", {
        newInfectedId: newInfected.id,
        newInfectedName: newInfected.name,
      });
    }
  }
};

const checkWinner = (room) => {
  const alive = getAlivePlayers(room);
  if (alive.length === 1) {
    const winner = alive[0];
    io.to(room.roomId).emit("playerWinner", {
      winnerId: winner.id,
      winnerName: winner.name,
    });
    console.log(`🏆 ${winner.name} ha ganado la partida.`);

    io.to(room.roomId).emit("gameEnded", {
      winnerId: winner.id,
      winnerName: winner.name,
    });

    return true;
  }
  return false;
};

io.on("connection", (socket) => {
  socket.on("createRoom", (callback) => {
    const roomId = Math.random().toString(36).substring(2, 8);
    const hostPlayer = createPlayer({ id: socket.id, isHost: true });

    rooms[roomId] = { players: [hostPlayer], currentTurn: 1, round: 1, roomId };
    socket.join(roomId);
    socket.roomId = roomId;

    callback?.({ roomId, player: hostPlayer });
    emitRoomUpdate(roomId);
  });

  socket.on("joinRoom", ({ roomId, name }, callback) => {
    const room = getRoom(roomId);
    if (!room) return;

    const player = createPlayer({ id: socket.id, name });
    room.players.push(player);

    socket.join(roomId);
    socket.roomId = roomId;

    emitRoomUpdate(roomId);
    callback?.(player);
  });

  socket.on("startGame", (roomId) => {
    const room = getRoom(roomId);
    if (!room) return;

    const players = room.players.sort(() => Math.random() - 0.5);
    const infectedIndex = Math.floor(Math.random() * players.length);

    players.forEach((p, i) => {
      p.turnOrder = i + 1;
      p.role = i === infectedIndex ? "Vampiro infectado" : "Vampiro común";
      p.infectionRounds = 0;
    });

    room.players = players;
    room.currentTurn = 1;
    room.round = 1;

    console.log(
      `El infectado inicial en room ${roomId} es:`,
      players[infectedIndex]
    );

    io.to(roomId).emit("gameStarted", { players, currentTurn: 1 });
    emitRoomUpdate(roomId);
  });

  socket.on("getPlayerInfo", ({ roomId, playerId }, callback) => {
    const room = getRoom(roomId);
    if (!room) return callback({ error: "Room not found" });

    const player = getPlayer(room, playerId);
    if (!player) return callback({ error: "Player not found" });

    callback({ player });
  });

  socket.on("getRoomState", ({ roomId }, callback) => {
    const room = getRoom(roomId);
    if (!room) return callback(null);

    const player = getPlayer(room, socket.id);
    if (player && player.lastSeenRound < room.round) {
      io.to(player.id).emit("showRoundPage", { round: room.round });
      player.lastSeenRound = room.round;
    }

    callback(room);
  });

  socket.on("roundUpdated", ({ round }) => {
    const room = getRoom(socket.roomId);
    if (!room) return;

    room.players.forEach((p) => {
      if (!p.lastSeenRound || p.lastSeenRound < round) {
        io.to(p.id).emit("showRoundPage", { round });
        p.lastSeenRound = round;
      }
    });
  });

  socket.on("mapSelected", ({ roomId, playerId, mapId }) => {
    const room = getRoom(roomId);
    if (!room) return;

    const player = getPlayer(room, playerId);
    if (!player) return;

    player.selectedMap = mapId;

    if (!player.visitedMaps) player.visitedMaps = [];
    if (!player.visitedMaps.includes(mapId)) {
      player.visitedMaps.push(mapId);
    }

    console.log(`Jugador ${player.name} seleccionó el mapa ${mapId}`);

    missions.forEach((mission) => {
      const notCompleted = !player.missionsCompleted.includes(mission.text);
      const hasAllMaps = mission.mapIds.every((id) =>
        player.visitedMaps.includes(id)
      );

      if (notCompleted && hasAllMaps) {
        player.missionsCompleted.push(mission.text);
        const oldPoints = player.points;
        player.points += mission.points;

        io.to(player.id).emit("missionCompleted", mission);

        console.log(
          `Misión completada: "${mission.text}" | Jugador: ${player.name} | +${mission.points} pts | Total: ${oldPoints} → ${player.points}`
        );
      }
    });

    io.to(player.id).emit("mapConfirmed", mapId);
    emitRoomUpdate(roomId);
  });

  socket.on("updatePoints", ({ roomId, playerId, points }, callback) => {
    const room = getRoom(roomId);
    if (!room) return;

    const player = getPlayer(room, playerId);
    if (!player) return;

    player.points += points;

    if (player.points <= 0) {
      markPlayerDead(player, roomId);

      if (player.role === "Vampiro infectado") {
        assignNewInfectedIfNeeded(room);
      }

      if (checkWinner(room)) return;
    }

    emitRoomUpdate(roomId);
    console.log(
      `Puntos actualizados: ${player.name} ahora tiene ${player.points}`
    );
    callback?.({ player });
  });

  socket.on("infectPlayer", ({ roomId, sourceId, targetId, points }) => {
    const room = getRoom(roomId);
    if (!room) return;

    const source = getPlayer(room, sourceId);
    const target = getPlayer(room, targetId);
    if (!source || !target) return;

    target.points -= points;
    if (target.points <= 0) markPlayerDead(target, roomId);

    source.role = "Vampiro común";
    target.role = "Vampiro infectado";
    target.infectionRounds = 0;

    io.to(roomId).emit("playerInfected", {
      sourceId,
      targetId,
      points,
      updatedPlayers: room.players,
    });
    io.to(sourceId).emit("infectionUsed", { used: true });
  });

  socket.on("getRoomInfo", ({ roomId }, callback) => {
    const room = getRoom(roomId);
    if (!room) return callback({ error: "Sala no encontrada" });

    callback({ round: room.round, players: room.players });
  });

  socket.on("startVotingRound", (roomId) => {
    const room = getRoom(roomId);
    if (!room) return;

    room.players.forEach((p) => (p.voting = true));
    io.to(roomId).emit("votingRound", {
      players: room.players,
      round: room.round,
    });
  });

  socket.on("submitVote", ({ roomId, voterId, votedPlayerId }) => {
    const room = rooms[roomId];
    if (!room) return;

    if (!room.votes) room.votes = [];
    room.votes.push({ voterId, targetId: votedPlayerId });

    const alivePlayers = room.players.filter((p) => p.alive);
    if (room.votes.length === alivePlayers.length) {
      const tally = {};
      room.votes.forEach(
        (v) => (tally[v.targetId] = (tally[v.targetId] || 0) + 1)
      );

      const mostVotedId = Object.keys(tally).reduce((a, b) =>
        tally[a] > tally[b] ? a : b
      );
      const stakedPlayer = room.players.find((p) => p.id === mostVotedId);

      stakedPlayer.alive = false;
      stakedPlayer.points = 0;

      const wasInfected = stakedPlayer.role === "Vampiro infectado";

      room.players.forEach((p) => {
        if (p.alive) {
          p.points += wasInfected ? 20 : -20;
        }
      });

      room.votes = [];

      room.round = (room.round || 1) + 1;

      if (wasInfected) {
        const alive = room.players.filter((p) => p.alive);
        if (alive.length > 0) {
          const newInfected = alive[Math.floor(Math.random() * alive.length)];
          newInfected.role = "Vampiro infectado";
        }
      }

      io.to(roomId).emit("votingEnded", {
        eliminated: stakedPlayer,
        wasInfected,
        updatedPlayers: room.players,
        nextRound: room.round,
      });
    }
  });

  socket.on("endTurn", (roomId, callback) => {
    const room = getRoom(roomId);
    if (!room) return;

    const currentPlayer = getPlayer(room, socket.id);
    if (!currentPlayer) return;
    currentPlayer.endedTurn = true;

    const alive = getAlivePlayers(room);
    if (alive.length === 0) {
      io.to(roomId).emit("gameOver");
      if (callback) callback({ isLastPlayer: true });
      return;
    }

    const unfinished = alive.filter((p) => !p.endedTurn);
    const isLastPlayer = unfinished.length === 0;

    if (isLastPlayer) {
      alive.forEach((p) => {
        p.endedTurn = false;

        if (p.role === "Vampiro infectado") {
          p.infectionRounds = (p.infectionRounds || 0) + 1;
          const penalties = [0, -5, -8, -10];
          const pts = penalties[p.infectionRounds] || -10;
          p.points += pts;

          console.log(
            `Ronda ${room.round}: ${p.name} infectado, penalidad ${pts} (total: ${p.points})`
          );

          if (p.infectionRounds >= 3 || p.points <= 0) {
            markPlayerDead(p, roomId);
            console.log(`💀 ${p.name} ha muerto por no propagar la infección.`);
          }
        }
      });

      if (checkWinner(room)) {
        if (callback) callback({ isLastPlayer });
        return;
      }
      assignNewInfectedIfNeeded(room);

      room.round = (room.round || 1) + 1;
      console.log(`Avanza a ronda ${room.round}`);

      io.to(roomId).emit("roundStarted", { round: room.round });

      room.players.forEach((p) => {
        p.lastSeenRound = 0;
      });
    }

    const aliveAfter = getAlivePlayers(room);
    if (aliveAfter.length > 0) {
      const nextPlayer = aliveAfter.find((p) => !p.endedTurn) || aliveAfter[0];
      room.currentTurn = nextPlayer.turnOrder;

      io.to(roomId).emit("turnUpdated", {
        currentTurn: room.currentTurn,
        players: room.players,
      });
      emitRoomUpdate(roomId);
    }

    if (callback) callback({ isLastPlayer });
  });

  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    const room = getRoom(roomId);
    if (!room) return;

    room.players = room.players.filter((p) => p.id !== socket.id);
    emitRoomUpdate(roomId);

    if (room.players.length === 0) delete rooms[roomId];
  });
});

server.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
