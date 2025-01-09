import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for now
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map to store userId and corresponding socketId
  private activeUsers: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.activeUsers.entries()].find(
      ([_, socketId]) => socketId === client.id,
    )?.[0];

    if (userId) {
      this.activeUsers.delete(userId);
      console.log(`Client disconnected: ${client.id}, User ID: ${userId}`);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string) {
    this.activeUsers.set(userId, client.id);
    console.log(`User joined: ${userId}, Socket ID: ${client.id}`);
  }

  sendAlert(userId: string, message: string) {
    const socketId = this.activeUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('alert', message);
    } else {
      console.warn(`User with ID ${userId} is not connected.`);
    }
  }
  emitLocationAlert(userId: string) {
    this.server.emit('LOCATION_ALERT', {
      userId,
      message: `Your location is outside the allowed radius!`,
    });
  }
}
