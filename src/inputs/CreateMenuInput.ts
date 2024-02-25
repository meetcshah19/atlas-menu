import { InputType, Field } from "type-graphql";
import { Menu } from "../entity/Menu";

@InputType()
export class CreateMenuInput implements Partial<Menu>{
  @Field()
  label: string;

  @Field()
  state: string;

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;
}