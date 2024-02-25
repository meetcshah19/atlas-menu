import { InputType, Field } from "type-graphql";
import { Section } from "../entity/Section";

@InputType()
export class UpdateSectionInput implements Partial<Section>{

  @Field()
  id: number;

  @Field({ nullable: true})
  label: string;

  @Field({ nullable: true})
  description: string;
}