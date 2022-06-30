import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Quiz } from "./Quiz";
import { User } from "./User";

@ObjectType()
@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column({ default: 1 })
  level!: number;

  @OneToOne(() => User, (user) => user.game)
  @JoinColumn()
  user!: User

  @OneToMany(() => Quiz,(quiz) => quiz.game,{cascade:true})
  quizs: Quiz[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
