import express from "express"
import { WebSocket } from "ws";
import { IUpstoxServicesServer } from "../interface/UpstoxService.interface";



//TODO :  ResponseHandler should be created

export class DataIngestionController {
	private ws: WebSocket | null = null;
	private websocketService: IUpstoxServicesServer;
	constructor(websocketService: IUpstoxServicesServer) {
		this.websocketService = websocketService
	}
	async startDataIngestion(request: express.Request, response: express.Response, next: express.NextFunction) {

		try {
			const { access_token } = request.body;
			if (!access_token) throw new Error("Invalid Access Token");
			// Start the dataIngestion websocket service
			await this.websocketService.StartDataIngestion(access_token)
			// Distribute the data using kafkawebservice
			await this.websocketService.produceData()

			response.status(200).json({ success: true, message: "Data ingestion service has started" })

		} catch (error) {
			next(error)

		}

	}

} 
