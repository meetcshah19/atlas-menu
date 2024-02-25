import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";

import { Item } from "../entity/Item";
import { CreateItemInput } from "../inputs/CreateItemInput";
import { UpdateItemInput } from "../inputs/UpdateItemInput";
import { ModifierGroup } from "../entity/ModifierGroup";
import { ItemModifierGroup } from "../entity/ItemModifierGroup";

@Resolver((of) => Item)
export class ItemResolver {
  @Query(() => Item)
  async getItem(@Arg("id") id: number): Promise<Item> {
    const item = await Item.findOneBy({ id : id });
    return item;
  }

  @Mutation(() => Item)
  async createItem(@Arg("data") data: CreateItemInput): Promise<Item> {
    const item = Item.create({ ...data });
    await item.save();
    return item;
  }

  @Mutation(() => Item)
  async updateItem(@Arg("data") data: UpdateItemInput): Promise<Item> {
    const item = await Item.update(data.id, { ...data });
    return Item.findOneBy({ id: data.id });
  }

  @FieldResolver(() => [ModifierGroup])
  async modifierGroups(@Root() item: Item): Promise<ModifierGroup[]> {
    const modifierGroupRepository = ModifierGroup.getRepository();
    const modifierGroups = await modifierGroupRepository
      .createQueryBuilder("modifierGroup")
      .leftJoinAndSelect("modifierGroup.itemModifierGroup", "itemModifierGroup")
      .where("itemModifierGroup.item_id = :id", { id: item.id })
      .getMany();
    return modifierGroups;
  }

  @Mutation(()=> ItemModifierGroup)
  async addModifierGroupToItem(
    @Arg("itemId") itemId: number,
    @Arg("modifierGroupId") modifierGroupId: number
  ): Promise<ItemModifierGroup> {
    const item = await Item.findOneBy({ id: itemId });
    if (!item) throw new Error("Item not found!");
    const modifierGroup = await ModifierGroup.findOneBy({ id: modifierGroupId });
    if (!modifierGroup) throw new Error("ModifierGroup not found!");
    const itemModifierGroup = ItemModifierGroup.create({ item, modifierGroup });
    await itemModifierGroup.save();
    return itemModifierGroup;
  }
}