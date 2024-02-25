import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  OneToOne,
} from "typeorm";

import { SectionItem } from "./SectionItem";
import { ItemModifierGroup } from "./ItemModifierGroup";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  type: string;

  @Field(() => String)
  @Column()
  label: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field()
  @Column("float")
  price: number;

  @Field(() => SectionItem)
  @OneToOne(() => SectionItem, (sectionItem) => sectionItem.item)
  sectionItem: SectionItem;

  @Field(() => [ItemModifierGroup])
  @OneToMany(
    () => ItemModifierGroup,
    (itemModifierGroup) => itemModifierGroup.item
  )
  itemModifierGroups: ItemModifierGroup[];
}
