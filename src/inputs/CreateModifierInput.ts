import { InputType, Field } from "type-graphql";
import { Modifier } from "../entity/Modifier";

@InputType()
export class CreateModifierInput implements Partial<Modifier> {
  @Field()
  price_override: number;

  @Field({ nullable: true })
  display_order?: number;

  @Field({ nullable: true })
  default_quantity?: number;
}