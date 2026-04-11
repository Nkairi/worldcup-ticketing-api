import { Hono } from "hono"
import { GetCitiesHandler } from "@infrastructure/handlers/cities/GetCitiesHandler"

const citiesRouter = new Hono()
const getCitiesHandler = new GetCitiesHandler()

citiesRouter.get("/", (c) => getCitiesHandler.handle(c))

export { citiesRouter }