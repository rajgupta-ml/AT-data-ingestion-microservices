import WebSocket from "ws";
import { getMarketFeedUrl } from "../urls";
import { IGetMarketUriResponse, IUpstoxWebsocket } from "../interface/IUpstox";
import { UpstoxUnknownError } from "../errors/UnknowUpstox.error";
import { IHttpClient } from "../interface/IHttpClient.interface";

export class UpstoxWebsocket implements IUpstoxWebsocket {
	private client: IHttpClient;
	constructor(client: IHttpClient) {
		this.client = client
	}
	async getMarketFeedURI(access_token: string): Promise<IGetMarketUriResponse> {

		return new Promise(async (resolve, reject) => {
			const config = {
				headers: {
					'accept': 'application/json',
					"Authorization": `Bearer ${access_token}`
				}
			}


			const response: IGetMarketUriResponse = await this.client.get(getMarketFeedUrl, config);
			if (response.status) resolve(response);
			reject(new UpstoxUnknownError("Internal Server Error", "getMarketFeedUri Error", "low"))
		})


	}


	async connectToUpstoxWithWs(wsURL: string, access_token: string): Promise<WebSocket> {
		return new Promise((resolve, reject) => {
			const config = {
				headers: {
					"Api-Version": "v2",
					Authorization: "Bearer " + access_token,
				},
				followRedirects: true,
			};


			const data = {
				guid: "someguid",
				method: "sub",
				data: {
					mode: "full",
					instrumentKeys: ["NSE_INDEX|Nifty Bank", "NSE_INDEX|Nifty 50"],
				},
			}

			const ws = new WebSocket(wsURL, config);
			ws.on("open", () => {
				console.log("Websocket is connected to the UpstoxServer");
				setTimeout(() => {
					ws.send(Buffer.from(JSON.stringify(data)));
				})

				resolve(ws);
			})


			ws.on("error", (error) => {
				reject(new UpstoxUnknownError("Websocket connection error", "ConnectToUpstoxWithWs Error", error.toString() as string));
			})
		})
	}
}

