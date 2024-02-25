import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from "type-graphql";

import { Modifier } from "../entity/Modifier";

import { CreateModifierInput } from "../inputs/CreateModifierInput";
import { UpdateModifierInput } from "../inputs/UpdateModifierInput";

@Resolver((of) => Modifier)
export class ModifierResolver {
  @Query(() => Modifier)
  async getModifier(@Arg("id") id: number): Promise<Modifier> {
    const modifier = await Modifier.findOneBy({ id: id });
    return modifier;
  }

  @Mutation(() => Modifier)
  async createModifier(
    @Arg("data") data: CreateModifierInput
  ): Promise<Modifier> {
    const modifier = Modifier.create({ ...data });
    await modifier.save();
    return modifier;
  }

  @Mutation(() => Modifier)
  async updateModifier(
    @Arg("data") data: UpdateModifierInput
  ): Promise<Modifier> {
    const modifier = await Modifier.update(data.id, { ...data });
    return Modifier.findOneBy({ id: data.id });
  }
}
