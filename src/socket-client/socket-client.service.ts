import { Injectable, OnModuleInit } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class SocketClientService implements OnModuleInit {
    public socketClient: Socket;

    constructor() {
        this.socketClient = io('http://localhost:3000', {
            query: {
                userId: '65cf4f89f7d5bae6cdf81bfb'
            }
        });
    }
    onModuleInit() {
        this.registerConsumerEvents();
    }

    private registerConsumerEvents() {
        // let counter = 0;
        // let chat = {
        //     "message": "HI",
        //     "receiverId": "65e3283ff67a498fa97bdd1d",
        //     "senderId": "65cf4f89f7d5bae6cdf81bfb"
        // };

        this.socketClient.on('connect', () => {
            console.log("Connected to Gateway")
        })
        this.socketClient.on('getOnlineUsers', (onlineUsers: any) => {
            console.log("Online Users ONNNNN-------------")
            console.log("OnlineUsers", onlineUsers)
        })
        // this.socketClient.emit('message', chat);
        this.socketClient.on('message', (message) => {
            console.log('Received message:', message);
          });
    }

}
