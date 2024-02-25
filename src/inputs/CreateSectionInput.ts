import { InputType, Field } from "type-graphql";
import { Section } from "../entity/Section";

@InputType()
export class CreateSectionInput implements Partial<Section>{
  @Field()
  label: string;

  @Field()
  description: string;

  @Field({ nullable: true})
  menuId: number;
}