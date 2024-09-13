const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const rooms = {}; // Objeto para armazenar as salas e seus detalhes

app.use(express.static('public')); // Servir arquivos estáticos da pasta "public"

// Enviar a página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// WebSockets
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Criar sala
  socket.on('createRoom', (data) => {
    const roomName = data.room;

    // Verificar se a sala já existe
    if (rooms[roomName]) {
      socket.emit('roomCreationError', 'A sala já existe.');
    } else {
      rooms[roomName] = {
        creator: data.creator,
        isPublic: data.isPublic,
        maxPlayers: data.maxPlayers,
        players: [data.creator],
      };

      socket.join(roomName);
      socket.emit('roomCreated', roomName);
      console.log(`Sala ${roomName} criada por ${data.creator}`);
    }
  });

  // Entrar em uma sala existente
  socket.on('joinRoom', (roomName, playerName) => {
    const room = rooms[roomName];
    if (room) {
      if (room.players.length < room.maxPlayers) {
        room.players.push(playerName);
        socket.join(roomName);
        socket.emit('joinedRoom', roomName);
        console.log(`${playerName} entrou na sala ${roomName}`);
      } else {
        socket.emit('roomJoinError', 'A sala está cheia.');
      }
    } else {
      socket.emit('roomJoinError', 'Sala não encontrada.');
    }
  });

  // Lidar com a desconexão
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
    // Aqui você pode adicionar lógica para remover o jogador da sala, se necessário
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
