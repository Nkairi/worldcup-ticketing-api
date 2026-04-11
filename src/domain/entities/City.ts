import { Country } from "./Country"

export class City {
  constructor(
    public name: string,
    public country: Country
  ) {
    if (!name) {
      throw new Error("City name is required")
    }
  }
}