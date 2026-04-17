import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // Щоб фронтенд міг підключитися
})
export class AdminGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('🚀 WebSocket Gateway for Admin Dashboard initialized');
  }

  // Метод для розсилки нових об'єктів усім адмінам
  sendNewObjectUpdate(payload: any) {
    this.server.emit('admin_dashboard_update', payload);
  }
}
