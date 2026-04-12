import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { City } from "./City"

@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name: string

  @ManyToOne(() => City, { eager: true })
  city: City

  @Column()
  capacity: number

  constructor(name: string, city: City, capacity: number) {
    this.name = name
    this.city = city
    this.capacity = capacity

    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0")
    }
  }
}