import { InputType, Field } from "type-graphql";
import { Menu } from "../entity/Menu";

@InputType()
export class UpdateMenuInput implements Partial<Menu>{
  @Field()
  id: number;

  @Field({ nullable: true })
  label: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  start_date: Date;

  @Field({ nullable: true })
  end_date: Date;
}