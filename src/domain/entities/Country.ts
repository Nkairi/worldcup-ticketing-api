export class Country {
  constructor(
    public name: string
  ) {
    if (!name) {
      throw new Error("Country name is required")
    }
  }
}