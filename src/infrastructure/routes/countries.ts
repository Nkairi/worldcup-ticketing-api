import { Hono } from "hono"
import { GetCountriesHandler } from "@infrastructure/handlers/countries/GetCountriesHandler"

const countriesRouter = new Hono()
const getCountriesHandler = new GetCountriesHandler()

countriesRouter.get("/", (c) => getCountriesHandler.handle(c))

export { countriesRouter }