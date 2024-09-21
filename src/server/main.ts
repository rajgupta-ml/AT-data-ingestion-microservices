import express from "express";
import dotenv from "dotenv";
import { IpRestriction } from "./middleware/ipRestriction.middleware";
import v1Router from "./Routers/v1Router";
import { errorHanler } from "./middleware/ErrorHandler.middleware";
dotenv.config();
const app = express();
app.enable("trust proxy")
app.use(express.json());
app.use(IpRestriction.restrict);
app.use("/api/v1", v1Router);

app.get("/ping", (request: express.Request, resposne: express.Response) => {
	resposne.send("The server is working")
})

app.use(errorHanler);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log("The Data Ingestion server is running on PORT: ", PORT);
})
