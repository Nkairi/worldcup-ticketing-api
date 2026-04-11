export class Team {
  constructor(
    public name: string,
    public fifaCode: string
  ) {
    if (!name) {
      throw new Error("Team name is required")
    }

    // ex : FRA, BRA, USA
    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new Error("fifaCode must be 3 uppercase letters (ex: FRA)")
    }
  }
}