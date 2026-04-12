import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name: string

  @Column({ unique: true })
  fifaCode: string

  constructor(name: string, fifaCode: string) {
    this.name = name
    this.fifaCode = fifaCode
  }
}