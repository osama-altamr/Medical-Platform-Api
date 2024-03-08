import { ArgumentsHost, WsExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";


export class WebSocketExceptionFilter implements WsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        const socket = host.switchToWs().getClient();
        console.log(exception)
        socket.emit("exception", {
            status: 'error',
            message: "Ws message is invalid"
        })
    }
}