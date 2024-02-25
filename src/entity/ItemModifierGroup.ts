import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  OneToOne,
  BaseEntity,
} from "typeorm";

import { Item } from "./Item";
import { ModifierGroup } from "./ModifierGroup";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class ItemModifierGroup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Item)
  @ManyToOne(() => Item, (item) => item.itemModifierGroups)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @Field((type) => ModifierGroup)
  @OneToOne(
    () => ModifierGroup,
    (modifierGroup) => modifierGroup.itemModifierGroup
  )
  @JoinColumn({ name: "modifier_group_id" })
  modifierGroup: ModifierGroup;
}
