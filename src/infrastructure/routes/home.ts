import { Hono } from "hono"
import { GetHomeHandler } from "@infrastructure/handlers/home/GetHomeHandler"
import { GetHealthHandler } from "@infrastructure/handlers/home/GetHealthHandler"

const homeRouter = new Hono()

const getHomeHandler = new GetHomeHandler()
const getHealthHandler = new GetHealthHandler()

homeRouter.get("/", (c) => getHomeHandler.handle(c))
homeRouter.get("/health", (c) => getHealthHandler.handle(c))

export { homeRouter }