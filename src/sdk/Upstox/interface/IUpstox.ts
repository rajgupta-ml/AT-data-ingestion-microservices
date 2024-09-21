import { WebSocket } from "ws";




export interface IGetMarketUriResponse {
	status?: string;
	data: {
		authorized_redirect_uri: string,
		authorizedRedirectUri: string
	}
}

export interface IUpstoxWebsocket {
	getMarketFeedURI(access_token: string): Promise<IGetMarketUriResponse>
	connectToUpstoxWithWs(wsURI: string, access_token: string): Promise<WebSocket>
}


export interface IUpstoxServices {
	getMarketData(access_token: string): Promise<WebSocket>

}







