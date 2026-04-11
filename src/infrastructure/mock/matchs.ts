import { Match } from "@domain/entities/Match"
import { MatchStage } from "@domain/enums/MatchStage"
import { MatchStatus } from "@domain/enums/MatchStatus"
import { stadiums } from "./stadiums"
import { teams } from "./teams"

export const matchs = [
  new Match(
    1,
    stadiums[0],
    teams[0],
    teams[1],
    MatchStage.GROUP,
    MatchStatus.SCHEDULED,
    new Date("2026-06-15"),
    0,
    0
  ),
  new Match(
    2,
    stadiums[1],
    teams[2],
    teams[3],
    MatchStage.GROUP,
    MatchStatus.LIVE,
    new Date("2026-06-16"),
    1,
    0
  ),
  new Match(
    3,
    stadiums[2],
    teams[4],
    teams[5],
    MatchStage.GROUP,
    MatchStatus.FINISHED,
    new Date("2026-06-17"),
    2,
    2
  )
]