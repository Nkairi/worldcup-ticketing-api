import { Hono } from "hono";

export const app = new Hono();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: process.env.API_NAME ?? "World Cup Ticketing API",
  });
});

app.get("/health", (c) => {
  return c.json({
    success: true,
    message: process.env.API_NAME ?? "World Cup Ticketing API",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "dev",
  });
});