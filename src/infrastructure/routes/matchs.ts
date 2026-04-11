import { Hono } from "hono"
import { GetMatchsHandler } from "@infrastructure/handlers/matchs/GetMatchsHandler"
import { GetMatchByIdHandler } from "@infrastructure/handlers/matchs/GetMatchByIdHandler"
import { GetMatchsByStageHandler } from "@infrastructure/handlers/matchs/GetMatchsByStageHandler"
import { GetMatchsByStatusHandler } from "@infrastructure/handlers/matchs/GetMatchsByStatusHandler"

const matchsRouter = new Hono()

const getMatchsHandler = new GetMatchsHandler()
const getMatchByIdHandler = new GetMatchByIdHandler()
const getMatchsByStageHandler = new GetMatchsByStageHandler()
const getMatchsByStatusHandler = new GetMatchsByStatusHandler()

matchsRouter.get("/", (c) => getMatchsHandler.handle(c))
matchsRouter.get("/stages/:stage", (c) => getMatchsByStageHandler.handle(c))
matchsRouter.get("/status/:status", (c) => getMatchsByStatusHandler.handle(c))
matchsRouter.get("/:id", (c) => getMatchByIdHandler.handle(c))

export { matchsRouter }