import { Stadium } from "@domain/entities/Stadium"
import { Team } from "@domain/entities/Team"
import { MatchStage } from "@domain/enums/MatchStage"
import { MatchStatus } from "@domain/enums/MatchStatus"

export class Match {
  constructor(
    public id: number,
    public stadium: Stadium,
    public homeTeam: Team,
    public awayTeam: Team,
    public stage: MatchStage,
    public status: MatchStatus,
    public date: Date,
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