import { io } from "socket.io-client";
import { getStoredToken } from "../../../services/authService";

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(window.location.origin, {
      autoConnect: false,
      auth: { token: getStoredToken() },
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  s.auth = { token: getStoredToken() };
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}

export function joinRoom(roomCode) {
  const s = connectSocket();
  s.emit("room:join", { roomCode });
  return s;
}

export function startSession(roomCode) {
  connectSocket().emit("session:start", { roomCode });
}

export function submitAnswer(roomCode, questionId, answer) {
  connectSocket().emit("answer:submit", { roomCode, questionId, answer });
}

export function nextQuestion(roomCode) {
  connectSocket().emit("question:next", { roomCode });
}
