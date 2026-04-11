import process from "node:process"
import { Hono } from "hono"
import { matchs } from "./mock/matchs"

export const app = new Hono()

// Route principale
app.get("/", (c) => {
  return c.json({
    success: true,
    message: process.env.API_NAME ?? "World Cup Ticketing API"
  })
})

// Route health
app.get("/health", (c) => {
  return c.json({
    success: true,
    message: process.env.API_NAME ?? "World Cup Ticketing API",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "dev"
  })
})

// tous les matchs
app.get("/matchs", (c) => {
  return c.json({
    success: true,
    data: matchs
  })
})

// match par id
app.get("/matchs/:id", (c) => {
  const id = Number(c.req.param("id"))

  const match = matchs.find((m) => m.id === id)

  if (!match) {
    return c.json(
      {
        success: false,
        message: "Match not found"
      },
      404
    )
  }

  return c.json({
    success: true,
    data: match
  })
})