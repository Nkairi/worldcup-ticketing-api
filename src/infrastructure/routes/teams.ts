import { Hono } from "hono"
import { GetTeamsHandler } from "@infrastructure/handlers/teams/GetTeamsHandler"
import { GetTeamByFifaCodeHandler } from "@infrastructure/handlers/teams/GetTeamByFifaCodeHandler"

const teamsRouter = new Hono()

const getTeamsHandler = new GetTeamsHandler()
const getTeamByFifaCodeHandler = new GetTeamByFifaCodeHandler()

teamsRouter.get("/", (c) => getTeamsHandler.handle(c))
teamsRouter.get("/:fifaCode", (c) => getTeamByFifaCodeHandler.handle(c))

export { teamsRouter }