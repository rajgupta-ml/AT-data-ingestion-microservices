import { WebSocket, WebSocketServer } from "ws";
import { IUpstoxServicesServer } from "../interface/UpstoxService.interface";
import { IUpstoxServices } from "../../sdk/Upstox/interface/IUpstox";
import { WebsocketError } from "../errors/Websocket.error";



//TODO : use kafka to distribute the data don't decode the data 

export class WebSocketService implements IUpstoxServicesServer {
	private socket: IUpstoxServices;
	private ws?: WebSocket;

	constructor(socket: IUpstoxServices) {
		this.socket = socket;
	}

	async StartDataIngestion(access_token: string): Promise<WebSocket> {

		try {
			if (!access_token) throw new WebsocketError(403, "WebsockerService", "Access token is not valid", "medium");
			const wsInstance = await this.socket.getMarketData(access_token);
			this.ws = wsInstance;
			return wsInstance;
		} catch (error) {
			throw new WebsocketError(400, "WebsocketService", "Couldn't start the data digestion process", "medium", JSON.stringify(error as Error));
		}

	}


	getWs(): WebSocket {
		// change all the errors
		if (!this.ws) throw new Error("Websocket is not defined")
		return this.ws;
	}


	async produceData() {
		const ws = this.getWs();
		ws.on("message", (data) => {
			console.log(data);
		})
	}

}
