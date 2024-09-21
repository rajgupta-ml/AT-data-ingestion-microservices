import express from "express";
import { injectedDataIngestionController } from "../di/DataIngestion.di";

const v1Router = express.Router();

v1Router.post("/dataIngestion", injectedDataIngestionController.startDataIngestion.bind(injectedDataIngestionController));

export default v1Router;
