import { Hono } from "hono"
import { GetTeamsHandler } from "@infrastructure/handlers/teams/GetTeamsHandler"
import { GetTeamByFifaCodeHandler } from "@infrastructure/handlers/teams/GetTeamByFifaCodeHandler"
import { GetTeamMatchsByFifaCodeHandler } from "@infrastructure/handlers/teams/GetTeamMatchsByFifaCodeHandler"
import { GetTeamMatchsByStageHandler } from "@infrastructure/handlers/teams/GetTeamMatchsByStageHandler"

const teamsRouter = new Hono()

const getTeamsHandler = new GetTeamsHandler()
const getTeamByFifaCodeHandler = new GetTeamByFifaCodeHandler()
const getTeamMatchsByFifaCodeHandler = new GetTeamMatchsByFifaCodeHandler()
const getTeamMatchsByStageHandler = new GetTeamMatchsByStageHandler()

teamsRouter.get("/", (c) => getTeamsHandler.handle(c))
teamsRouter.get("/:fifaCode/matchs", (c) => getTeamMatchsByFifaCodeHandler.handle(c))
teamsRouter.get("/:fifaCode/matchs/:stage", (c) => getTeamMatchsByStageHandler.handle(c))
teamsRouter.get("/:fifaCode", (c) => getTeamByFifaCodeHandler.handle(c))

export { teamsRouter }