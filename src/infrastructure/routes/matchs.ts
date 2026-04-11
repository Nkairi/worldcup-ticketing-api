import { Hono } from "hono"
import { GetMatchsHandler } from "@infrastructure/handlers/matchs/GetMatchsHandler"
import { GetMatchByIdHandler } from "@infrastructure/handlers/matchs/GetMatchByIdHandler"

const matchsRouter = new Hono()

const getMatchsHandler = new GetMatchsHandler()
const getMatchByIdHandler = new GetMatchByIdHandler()

matchsRouter.get("/", (c) => getMatchsHandler.handle(c))
matchsRouter.get("/:id", (c) => getMatchByIdHandler.handle(c))

export { matchsRouter }