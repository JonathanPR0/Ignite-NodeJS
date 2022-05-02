import { Category } from "../model/Category";

interface ICreatCategoryDTO{
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string):Category;
  list():Category[];
  create({name,description}: ICreatCategoryDTO):void
}

export {ICategoriesRepository, ICreatCategoryDTO}