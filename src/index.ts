import { app } from "./infrastructure/app";

export default {
  port: Number(process.env.PORT ?? 3000),
  fetch: app.fetch,
};