import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { Section } from "../entity/Section";
import { CreateSectionInput } from "../inputs/CreateSectionInput";
import { UpdateSectionInput } from "../inputs/UpdateSectionInput";
import { Item } from "../entity/Item";
import { SectionItem } from "../entity/SectionItem";

@Resolver((of) => Section)
export class SectionResolver {
  @Query(() => Section)
  async getSection(@Arg("id") id: number): Promise<Section> {
    const section = await Section.findOneBy({ id: id });
    return section;
  }

  @Mutation(() => Section)
  async createSection(@Arg("data") data: CreateSectionInput): Promise<Section> {
    const section = Section.create({ ...data });
    await section.save();
    return section;
  }

  @Mutation(() => Section)
  async updateSection(@Arg("data") data: UpdateSectionInput): Promise<Section> {
    const section = await Section.update(data.id, { ...data });
    return Section.findOneBy({ id: data.id });
  }

  @Mutation(() => SectionItem)
  async addItemToSection(
    @Arg("sectionId") sectionId: number,
    @Arg("itemId") itemId: number,
    @Arg("displayOrder", { nullable: true }) display_order: number
  ): Promise<SectionItem> {
    const section = await Section.findOneBy({ id: sectionId });
    if (!section) throw new Error("Section not found!");
    const item = await Item.findOneBy({ id: itemId });
    if (!item) throw new Error("Item not found!");
    const sectionItem = SectionItem.create({ section, item, display_order });
    await sectionItem.save();
    return sectionItem;
  }

  @FieldResolver(() => [Item])
  async items(@Root() section: Section): Promise<Item[]> {
    const itemRepository = Item.getRepository();
    const items = await itemRepository
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.sectionItem", "sectionItem")
      .where("sectionItem.section_id = :id", { id: section.id })
      .orderBy("display_order")
      .getMany();
    return items;
  }
}
