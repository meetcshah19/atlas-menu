import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { Menu } from "../entity/Menu";
import { CreateMenuInput } from "../inputs/CreateMenuInput";
import { Section } from "../entity/Section";
import { MenuSection } from "../entity/MenuSection";
import { UpdateMenuInput } from "../inputs/UpdateMenuInput";

@Resolver((of) => Menu)
export class MenuResolver {
  @Query(() => [Menu])
  getMenus() {
    return Menu.find();
  }

  @Query(() => Menu)
  getMenu(@Arg("id") id: number): Promise<Menu> {
    return Menu.findOneBy({ id: id });
  }

  @FieldResolver(() => [Section])
  async sections(@Root() menu: Menu): Promise<Section[]> {
    const sectionRepository = Section.getRepository();
    const sections = sectionRepository
      .createQueryBuilder("section")
      .leftJoinAndSelect("section.menuSection", "menuSection")
      .where("menuSection.menu_id = :id", { id: menu.id })
      .orderBy("display_order")
      .getMany();
    return sections;
  }

  @Mutation((returns) => Menu)
  async createMenu(@Arg("data") data: CreateMenuInput): Promise<Menu> {
    const menu = Menu.create({ ...data });
    await menu.save();
    return menu;
  }

  @Mutation((returns) => Menu)
  async updateMenu(@Arg("data") data: UpdateMenuInput): Promise<Menu> {
    const menu = await Menu.update(data.id, { ...data });
    return Menu.findOneBy({ id: data.id });
  }

  @Mutation((returns) => MenuSection)
  async addSectionToMenu(
    @Arg("menuId") menuId: number,
    @Arg("sectionId") sectionId: number,
    @Arg("displayOrder", { nullable: true }) display_order: number
  ): Promise<MenuSection> {
    const menu = await Menu.findOneBy({ id: menuId });
    if (!menu) throw new Error("Menu not found!");
    const section = await Section.findOneBy({ id: sectionId });
    if (!section) throw new Error("Section not found!");
    const menuSection = MenuSection.create({ menu, section, display_order });
    await menuSection.save();
    return menuSection;
  }
}
