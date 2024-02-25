import { InputType, Field } from "type-graphql";
import { Modifier } from "../entity/Modifier";

@InputType()
export class UpdateModifierInput implements Partial<Modifier> {
  @Field()
  id: number;

  @Field({ nullable: true })
  price_override: number;

  @Field({ nullable: true })
  display_order?: number;

  @Field({ nullable: true })
  default_quantity?: number;
}