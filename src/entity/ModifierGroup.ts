import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";

import { ItemModifierGroup } from "./ItemModifierGroup";
import { Modifier } from "./Modifier";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class ModifierGroup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field()
  @Column()
  selection_required_min: number;

  @Field()
  @Column()
  selection_required_max: number;

  @Field(type => [Modifier])
  @OneToMany(() => Modifier, (modifier) => modifier.modifierGroup)
  @JoinColumn()
  modifiers: Modifier[];

  @Field(type => ItemModifierGroup)
  @OneToOne(
    () => ItemModifierGroup,
    (itemModifierGroup) => itemModifierGroup.modifierGroup
  )
  itemModifierGroup: ItemModifierGroup;
}
