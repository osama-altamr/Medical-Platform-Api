import {  OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatMessageService } from "../chat-message.service";
import { CreateChatMessageDto } from "../dtos/create-chat-message.dto";
import { Socket } from "socket.io";
import { ConversationService } from "src/conversation/conversation.service";


@WebSocketGateway({
    origin: "*"
})
export class ChatMessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userSocketMap = new Map<string, string>();// {userId:clientId}
    constructor(
        private chatMessageService: ChatMessageService,
        private conversationService: ConversationService,
    ) { }

    @WebSocketServer() server: Server;
    handleDisconnect(client: any) {
        const userId = client.handshake.query.userId;
        this.userSocketMap.delete(userId);
        const keysIterator = this.userSocketMap.keys();
        this.server.emit("getOnlineUsers", Array.from(keysIterator));
        return;
    }
    handleConnection(client: any, ...args: any[]) {
        const userId = client.handshake.query.userId;
        if (userId !== "undefined") this.userSocketMap.set(userId, client.id);
        const keysIterator = this.userSocketMap.keys();
        this.server.emit("getOnlineUsers", Array.from(keysIterator));
        return
    }

    @SubscribeMessage("message")
    async handleMessage(client: Socket, createChatMessageDto: CreateChatMessageDto) {

        const { senderId, receiverId } = createChatMessageDto;
        let conversation = await this.conversationService.findByParticipants(senderId, receiverId);
        if (!conversation) {
            conversation = await this.conversationService.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = await this.chatMessageService.createChatMessage(createChatMessageDto);
        if (newMessage) {
            await this.conversationService.pushMessage(conversation._id.toString(), newMessage);
        }
        const receiverSocketId = this.getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // used to send events to specific client
            this.server.to(receiverSocketId).emit("message", newMessage);
        }
    }



    getReceiverSocketId = (receiverId) => {
        return this.userSocketMap.get(receiverId);
    };
}