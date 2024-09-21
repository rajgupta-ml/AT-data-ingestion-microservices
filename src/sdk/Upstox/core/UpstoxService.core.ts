import { WebSocket } from "ws";
import { UpstoxWebsocket } from "../api/UpstoxWebsocket.api"
import { IHttpClient } from "../interface/IHttpClient.interface"
import { UpstoxUnknownError } from "../errors/UnknowUpstox.error";
import { HttpClient } from "./HttpClient.core";
import { IUpstoxServices } from "../interface/IUpstox";

export class UpstoxServices implements IUpstoxServices {
	private httpClient: IHttpClient;
	private UpstoxWebsocket: UpstoxWebsocket
	constructor() {
		this.httpClient = new HttpClient()
		this.UpstoxWebsocket = new UpstoxWebsocket(this.httpClient);
	}

	async getMarketData(access_token: string): Promise<WebSocket> {
		try {
			const response = await this.UpstoxWebsocket.getMarketFeedURI(access_token);
			const ws = await this.UpstoxWebsocket.connectToUpstoxWithWs(response.data.authorized_redirect_uri, access_token);
			return ws;
		} catch (error) {
			if (error instanceof UpstoxUnknownError) throw error;
			throw new UpstoxUnknownError("Internal server error", "getMarketData Error", JSON.stringify(error) as string);
		}
	}
}

