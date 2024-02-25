import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";

import { ModifierGroup } from "../entity/ModifierGroup";
import { CreateModifierGroupInput } from "../inputs/CreateModifierGroupInput";
import { UpdateModifierGroupInput } from "../inputs/UpdateModifierGroupInput";

import { Modifier } from "../entity/Modifier";

@Resolver((of) => ModifierGroup)
export class ModifierGroupResolver {
  @Query(() => ModifierGroup)
  async getModifierGroup(@Arg("id") id: number): Promise<ModifierGroup> {
    const modifierGroup = await ModifierGroup.findOneBy({ id: id });
    return modifierGroup;
  }

  @Mutation(() => ModifierGroup)
  async createModifierGroup(
    @Arg("data") data: CreateModifierGroupInput
  ): Promise<ModifierGroup> {
    const modifierGroup = ModifierGroup.create({ ...data });
    await modifierGroup.save();
    return modifierGroup;
  }

  @Mutation(() => ModifierGroup)
  async updateModifierGroup(
    @Arg("data") data: UpdateModifierGroupInput
  ): Promise<ModifierGroup> {
    const modifierGroup = await ModifierGroup.update(data.id, { ...data });
    return ModifierGroup.findOneBy({ id: data.id });
  }

  @FieldResolver(() => [Modifier])
  async modifiers(@Root() modifierGroup: ModifierGroup): Promise<Modifier[]> {
    const modifierRepository = Modifier.getRepository();
    const modifiers = await modifierRepository
      .createQueryBuilder("modifier")
      .leftJoinAndSelect("modifier.modifierGroup", "modifierGroup")
      .where("modifierGroup.id = :id", { id: modifierGroup.id })
      .orderBy("display_order")
      .getMany();
    return modifiers;
  }

  @Mutation(() => Modifier)
  async addModifierToModifierGroup(
    @Arg("modifierGroupId") modifierGroupId: number,
    @Arg("modifierId") modifierId: number
  ): Promise<Modifier> {
    const modifierGroup = await ModifierGroup.getRepository().findOne({
      where: { id: modifierGroupId },
      relations: ["modifiers"],
    });
    if (!modifierGroup) throw new Error("ModifierGroup not found!");
    const modifier = await Modifier.findOneBy({ id: modifierId });
    if (!modifier) throw new Error("Modifier not found!");
    if(modifierGroup.modifiers){
      modifierGroup.modifiers.push(modifier);
    } else {
      modifierGroup.modifiers = [modifier];
    }
    await modifierGroup.save();
    return modifier;
  }
}
