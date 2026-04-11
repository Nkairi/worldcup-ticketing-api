import { Hono } from "hono"
import { GetStadiumsHandler } from "@infrastructure/handlers/stadiums/GetStadiumsHandler"
import { GetStadiumMatchsHandler } from "@infrastructure/handlers/stadiums/GetStadiumMatchsHandler"
import { GetStadiumByNameHandler } from "@infrastructure/handlers/stadiums/GetStadiumByNameHandler"

const stadiumsRouter = new Hono()

const getStadiumsHandler = new GetStadiumsHandler()
const getStadiumMatchsHandler = new GetStadiumMatchsHandler()
const getStadiumByNameHandler = new GetStadiumByNameHandler()

stadiumsRouter.get("/:name/matchs", (c) => getStadiumMatchsHandler.handle(c))
stadiumsRouter.get("/:name", (c) => getStadiumByNameHandler.handle(c))
stadiumsRouter.get("/", (c) => getStadiumsHandler.handle(c))

export { stadiumsRouter }