import { IError } from "../interface/IError.interface";

export class UpstoxUnknownError extends Error implements IError {

	public statusCode: number;
	public name: string;
	public details?: string;
	public level: string
	constructor(description: string, name: string, level: string, details?: string) {
		super(description);
		this.statusCode = 500;
		this.name = name
		this.name = "UnknownError";
		this.details = details;
		this.level = level
	}
}

