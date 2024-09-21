import express from "express";
import { IError } from "../../sdk/Upstox/interface/IError.interface";



export const errorHanler = (
	error: Error,
	request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {

	if (isAppInstance(error)) {
		return responseHandlerForError(response, error)
	} else {
		return response.status(500).json({
			success: false,
			name: error,
			description: "An unexpected error occurred.",
			details: undefined,
			data: {},
		})
	}
}


const responseHandlerForError = (response: express.Response, error: IError) => {
	const errorStructure = {
		statusCode: error.statusCode,
		errorBody: {
			success: false,
			name: error.name,
			description: error.message,
			details: error.details,
			data: {},
		}
	}
	response.status(error.statusCode).json(errorStructure);
}




const isAppInstance = (error: Error): error is IError => {
	return (error as IError).statusCode !== undefined;
}

