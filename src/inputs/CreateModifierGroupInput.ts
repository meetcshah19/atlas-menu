import { InputType, Field } from "type-graphql";
import { ModifierGroup } from "../entity/ModifierGroup";

@InputType()
export class CreateModifierGroupInput implements Partial<ModifierGroup> {
  @Field()
  label: string;

  @Field()
  selection_required_min: number;

  @Field()
  selection_required_max: number;

  

}