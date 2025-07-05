import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export const app: Application = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello from worker ${process.pid}`);
});
