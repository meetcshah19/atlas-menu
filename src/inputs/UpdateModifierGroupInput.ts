import { InputType, Field } from "type-graphql";
import { ModifierGroup } from "../entity/ModifierGroup";

@InputType()
export class UpdateModifierGroupInput implements Partial<ModifierGroup> {
  @Field()
  id: number;

  @Field({ nullable: true })
  label: string;

  @Field({ nullable: true })
  selection_required_min: number;

  @Field({ nullable: true })
  selection_required_max: number;
}