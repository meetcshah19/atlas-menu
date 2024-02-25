import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { MenuSection } from "./MenuSection";

@Entity()
@ObjectType()
export class Menu extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  label: string;

  @Field(() => String)
  @Column()
  state: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field((type) => [MenuSection])
  @OneToMany(() => MenuSection, (menuSection) => menuSection.menu)
  menuSections: MenuSection[];
}
