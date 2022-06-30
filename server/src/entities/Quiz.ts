import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Game } from "./Game";

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Column()
  movie!: string;

  @Field(() => String)
  @Column()
  actor!: string;

  @Field(() => String)
  @Column()
  poster!: string;

  @Field(() => String)
  @Column()
  actor_image!: string;

  @Column()
  response!: boolean; 

  @ManyToOne(() => Game, (game) => game.quizs,{onDelete:"CASCADE"})
  game!: Game;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
