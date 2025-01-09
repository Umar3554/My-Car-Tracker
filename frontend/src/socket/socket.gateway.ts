import { io, Socket } from "socket.io-client";
// In SocketGateway.ts
const SOCKET_URL = "http://192.168.1.94:13000"; // Replace with your local machine's IP address

class SocketGateway {
  private socket: Socket;
  constructor() {
    this.socket = io(SOCKET_URL); // Replace with your backend URL
  }
  // Function to listen to events
  listenForLocationAlert(callback: (data: any) => void) {
    this.socket.on("LOCATION_ALERT", (data) => {
      console.log("Location Alert:", data);
      callback(data); // Call the callback with the received data
    });
  }

  // Disconnect the socket
  disconnect() {
    this.socket.disconnect();
  }
}

const socketGateway = new SocketGateway();
export default socketGateway;
