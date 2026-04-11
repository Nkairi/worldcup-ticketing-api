import { Hono } from "hono"
import { GetCountriesHandler } from "@infrastructure/handlers/countries/GetCountriesHandler"
import { GetCountryCitiesHandler } from "@infrastructure/handlers/countries/GetCountryCitiesHandler"
import { GetCountryByCodeHandler } from "@infrastructure/handlers/countries/GetCountryByCodeHandler"

const countriesRouter = new Hono()

const getCountriesHandler = new GetCountriesHandler()
const getCountryCitiesHandler = new GetCountryCitiesHandler()
const getCountryByCodeHandler = new GetCountryByCodeHandler()

countriesRouter.get("/:code/cities", (c) => getCountryCitiesHandler.handle(c))
countriesRouter.get("/:code", (c) => getCountryByCodeHandler.handle(c))
countriesRouter.get("/", (c) => getCountriesHandler.handle(c))

export { countriesRouter }