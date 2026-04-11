import { City } from "./City"

export class Stadium {
  constructor(
    public name: string,
    public city: City,
    public capacity: number
  ) {
    if (!name) {
      throw new Error("Stadium name is required")
    }

    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0")
    }
  }
}