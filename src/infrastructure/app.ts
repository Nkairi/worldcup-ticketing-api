import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { homeRouter } from "@infrastructure/routes/home"
import { matchsRouter } from "@infrastructure/routes/matchs"
import { teamsRouter } from "@infrastructure/routes/teams"
import { citiesRouter } from "@infrastructure/routes/cities"
import { countriesRouter } from "@infrastructure/routes/countries"
import { stadiumsRouter } from "@infrastructure/routes/stadiums"
import { ticketsRouter } from "@infrastructure/routes/tickets"

export const app = new Hono()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: err.message
      },
      err.status
    )
  }

  return c.json(
    {
      success: false,
      error: "Internal server error"
    },
    500
  )
})

app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: "Not Found"
    },
    404
  )
})

app.route("/", homeRouter)
app.route("/matchs", matchsRouter)
app.route("/teams", teamsRouter)
app.route("/cities", citiesRouter)
app.route("/countries", countriesRouter)
app.route("/stadiums", stadiumsRouter)
app.route("/tickets", ticketsRouter)