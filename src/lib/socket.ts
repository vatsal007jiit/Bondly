import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER|| "http://localhost:8080", {
  autoConnect: false, // Prevent automatic connection
  withCredentials: true, // Ensure cookies are sent with WebSocket requests
});

// Initialize socket
export const initializeSocket = () => {
  if (!socket.connected) {
    socket.connect();
    // console.log("Socket connection initiated");
  }
};

// Handle connection errors
socket.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error.message);
});

// Disconnect socket (optional, for cleanup on logout)
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    // console.log("Socket disconnected");
  }
};

// Automatically initialize socket on module load (for page refreshes)
initializeSocket();

// Export socket for use in components
export { socket };