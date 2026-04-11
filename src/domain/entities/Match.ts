import { Stadium } from "./Stadium"
import { Team } from "./Team"
import { MatchStage } from "../enums/MatchStage"
import { MatchStatus } from "../enums/MatchStatus"

export class Match {
  constructor(
    public id: number,
    public stadium: Stadium,
    public homeTeam: Team,
    public awayTeam: Team,
    public stage: MatchStage,
    public status: MatchStatus,
    public homeScore: number = 0,
    public awayScore: number = 0
  ) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Match id must be a positive integer")
    }

    if (homeTeam.fifaCode === awayTeam.fifaCode) {
      throw new Error("Teams must be different")
    }

    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Scores must be >= 0")
    }
  }
}