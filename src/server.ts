import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const server = createApp().listen(port, () => {
  console.log(`devops-api listening on :${port}`);
});

// Kubernetes sends SIGTERM before killing a pod: finish in-flight requests, then exit
function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
