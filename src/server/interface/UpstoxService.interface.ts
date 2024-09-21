import { WebSocket } from "ws";

export interface IUpstoxServicesServer {
	StartDataIngestion(access_token: string): Promise<WebSocket>
	getWs(ws: WebSocket): WebSocket
	produceData(): Promise<void>
}
