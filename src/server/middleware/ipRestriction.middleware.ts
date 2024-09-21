import express from "express";

export class IpRestriction {
	private static allowedIp = new Set(["192.168.29.164", "127.0.0.1", "::1"]);

	static restrict = (request: express.Request, response: express.Response, next: express.NextFunction) => {
		// Get the client's IP address
		const clientIp = (request.headers['x-forwarded-for'] || request.ip) as string;

		if (!this.allowedIp.has(clientIp)) {
			// Send a 403 Forbidden response instead of throwing an error
			return response.status(403).json({ message: "Access denied: Your IP is not authorized." });
		}
		next();
	}
}
