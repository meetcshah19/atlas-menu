import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  BaseEntity,
} from "typeorm";

import { Menu } from "./Menu";
import { Section } from "./Section";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class MenuSection extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Menu)
  @ManyToOne(() => Menu, (menu) => menu.menuSections)
  @JoinColumn({ name: "menu_id" })
  menu: Menu;

  @Field()
  @Column({ default: 0 })
  display_order: number;

  @Field((type) => Section)
  @OneToOne(() => Section, (section) => section.menuSection)
  @JoinColumn({ name: "section_id" })
  section: Section;
}
