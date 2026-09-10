import express, { type Request, type Response } from "express";
import os from "node:os";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  // Used by Docker HEALTHCHECK and Kubernetes probes later
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  // hostname shows which pod answered; APP_VERSION will be the git SHA from CI
  app.get("/api/time", (_req: Request, res: Response) => {
    res.json({
      time: new Date().toISOString(),
      hostname: os.hostname(),
      version: process.env.APP_VERSION ?? "dev",
    });
  });

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}
