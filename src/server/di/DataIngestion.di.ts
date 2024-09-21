import { DataIngestionController } from "../controller/DataIngestion.controller";
import { UpstoxServices } from "../../sdk/Upstox/core/UpstoxService.core";
import { WebSocketService } from "../services/WebSocket.service";

const UpstoxWebSockeInstance = new UpstoxServices();
const UpstoxWebSocketServiceInstance = new WebSocketService(UpstoxWebSockeInstance);
export const injectedDataIngestionController = new DataIngestionController(UpstoxWebSocketServiceInstance) 
