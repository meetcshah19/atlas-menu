import { InputType, Field } from "type-graphql";
import { Item } from "../entity/Item";

@InputType()
export class CreateItemInput implements Partial<Item>{
  @Field(() => String)
  type: string;

  @Field(() => String)
  label: string;

  @Field(() => String)
  description: string;

  @Field()
  price: number;
}