import { InputType, Field } from "type-graphql";
import { Item } from "../entity/Item";

@InputType()
export class UpdateItemInput implements Partial<Item> {
  @Field()
  id: number;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => String, { nullable: true })
  label: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field({ nullable: true })
  price: number;
}
