import { Hono } from "hono"
import { GetStadiumsHandler } from "@infrastructure/handlers/stadiums/GetStadiumsHandler"

const stadiumsRouter = new Hono()
const getStadiumsHandler = new GetStadiumsHandler()

stadiumsRouter.get("/", (c) => getStadiumsHandler.handle(c))

export { stadiumsRouter }