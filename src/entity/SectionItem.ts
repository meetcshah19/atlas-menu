import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

import { Section } from "./Section";
import { Item } from "./Item";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class SectionItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Section)
  @ManyToOne(() => Section, (section) => section.sectionItems)
  @JoinColumn({ name: "section_id" })
  section: Section;

  @Field((type) => Item)
  @ManyToOne(() => Item, (item) => item.sectionItem)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @Field()
  @Column({ default: 0 })
  display_order: number;
}
