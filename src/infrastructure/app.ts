import { Hono } from "hono"
import { homeRouter } from "@infrastructure/routes/home"
import { matchsRouter } from "@infrastructure/routes/matchs"
import { teamsRouter } from "@infrastructure/routes/teams"
import { citiesRouter } from "@infrastructure/routes/cities"
import { countriesRouter } from "@infrastructure/routes/countries"
import { stadiumsRouter } from "@infrastructure/routes/stadiums"

export const app = new Hono()

app.route("/", homeRouter)
app.route("/matchs", matchsRouter)
app.route("/teams", teamsRouter)
app.route("/cities", citiesRouter)
app.route("/countries", countriesRouter)
app.route("/stadiums", stadiumsRouter)