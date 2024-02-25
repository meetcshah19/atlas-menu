import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  BaseEntity,
} from "typeorm";

import { MenuSection } from "./MenuSection";
import { SectionItem } from "./SectionItem";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Section extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  label: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field((type) => MenuSection)
  @OneToOne(() => MenuSection, (menuSection) => menuSection.section)
  menuSection: MenuSection;

  @Field((type) => [SectionItem])
  @OneToMany(() => SectionItem, (sectionItem) => sectionItem.section)
  sectionItems: SectionItem[];
}
