import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToOne,
  BaseEntity,
} from "typeorm";

import { ModifierGroup } from "./ModifierGroup";
import { Item } from "./Item";

import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Modifier extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => [ModifierGroup])
  @ManyToOne(() => ModifierGroup, (modifierGroup) => modifierGroup.modifiers)
  @JoinTable()
  modifierGroup: ModifierGroup;

  @Field()
  @Column({ default: 0 })
  display_order: number;

  @Field()
  @Column({ default: 0 })
  default_quantity: number;

  @Field()
  @Column("float", { nullable: true })
  price_override: number;

  @Field((type) => Item)
  @OneToOne(() => Item)
  @JoinColumn({ name: "item_id" })
  item: Item;
}
