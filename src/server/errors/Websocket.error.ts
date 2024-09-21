import { IError } from "../../sdk/Upstox/interface/IError.interface";

export class WebsocketError extends Error implements IError {
	public statusCode: number;
	public details?: string;
	public name: string;
	public level: string;
	constructor(statusCode: number, name: string, message: string, level: string, details?: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = name;
		this.level = level;
		this.details = details;
	}

}
